// Configuração dos gráficos
const chartConfig = {
    temporalChart: {
        width: '100%',
        height: 400,
        margin: { top: 20, right: 30, bottom: 30, left: 60 }
    },
    networkGraph: {
        width: '100%',
        height: 500,
        charge: -300
    }
};

// Função para carregar dados da API
async function loadData(filters = {}) {
    // TODO: Implementar chamada real à API
    return {
        temporal: generateTemporalData(),
        network: generateNetworkData(),
        stats: generateStats()
    };
}

// Função para gerar dados temporais simulados
function generateTemporalData() {
    const now = new Date();
    const data = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
            date: date,
            uvcamera: Math.random() * 100,
            sunscreen: Math.random() * 150
        });
    }
    return data.reverse();
}

// Função para gerar dados de rede simulados
function generateNetworkData() {
    const nodes = [
        { id: "uvcamera", group: 1 },
        { id: "sunscreen", group: 1 },
        { id: "skin", group: 2 },
        { id: "photo", group: 2 },
        { id: "summer", group: 2 }
    ];
    
    const links = [
        { source: "uvcamera", target: "photo", value: 5 },
        { source: "sunscreen", target: "skin", value: 8 },
        { source: "sunscreen", target: "summer", value: 6 }
    ];
    
    return { nodes, links };
}

// Função para gerar estatísticas simuladas
function generateStats() {
    return {
        totalPosts: Math.floor(Math.random() * 10000),
        uniqueSubreddits: Math.floor(Math.random() * 100),
        uniqueUsers: Math.floor(Math.random() * 5000)
    };
}

// Função para atualizar o gráfico temporal
function updateTemporalChart(data) {
    const margin = chartConfig.temporalChart.margin;
    const width = document.getElementById('temporal-chart').clientWidth - margin.left - margin.right;
    const height = chartConfig.temporalChart.height - margin.top - margin.bottom;

    // Limpa o gráfico anterior
    d3.select("#temporal-chart svg").remove();

    // Cria novo SVG
    const svg = d3.select("#temporal-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas X e Y
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.uvcamera, d.sunscreen))])
        .range([height, 0]);

    // Adiciona eixos
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Linhas para cada termo
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));

    // Adiciona linha para uvcamera
    svg.append("path")
        .datum(data.map(d => ({date: d.date, value: d.uvcamera})))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Adiciona linha para sunscreen
    svg.append("path")
        .datum(data.map(d => ({date: d.date, value: d.sunscreen})))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Adiciona legenda
    const legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(["uvcamera", "sunscreen"])
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 70)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", d => d === "uvcamera" ? "steelblue" : "red");

    legend.append("text")
        .attr("x", width - 45)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);
}

// Função para atualizar o grafo de rede
function updateNetworkGraph(data) {
    const width = document.getElementById('network-graph').clientWidth;
    const height = chartConfig.networkGraph.height;

    // Limpa o grafo anterior
    d3.select("#network-graph svg").remove();

    // Cria novo SVG
    const svg = d3.select("#network-graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Cria simulação de força
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(chartConfig.networkGraph.charge))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Adiciona links
    const link = svg.append("g")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", d => Math.sqrt(d.value));

    // Adiciona nós
    const node = svg.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", d => d.group === 1 ? "#ff7f0e" : "#1f77b4")
        .call(drag(simulation));

    // Adiciona labels
    const label = svg.append("g")
        .selectAll("text")
        .data(data.nodes)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("font-size", 10)
        .attr("dx", 12)
        .attr("dy", 4);

    // Função de arrasto para os nós
    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // Atualiza posições na simulação
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
}

// Função para atualizar estatísticas
function updateStats(stats) {
    document.getElementById('total-posts').textContent = stats.totalPosts.toLocaleString();
    document.getElementById('unique-subreddits').textContent = stats.uniqueSubreddits.toLocaleString();
    document.getElementById('unique-users').textContent = stats.uniqueUsers.toLocaleString();
}

// Função principal para atualizar a dashboard
async function updateDashboard(filters = {}) {
    const data = await loadData(filters);
    updateTemporalChart(data.temporal);
    updateNetworkGraph(data.network);
    updateStats(data.stats);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a dashboard
    updateDashboard();

    // Configura o formulário de filtros
    document.getElementById('filter-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const filters = {
            dateRange: document.getElementById('date-range').value,
            terms: Array.from(document.getElementById('terms').selectedOptions).map(opt => opt.value),
            subreddits: Array.from(document.getElementById('subreddits').selectedOptions).map(opt => opt.value)
        };
        updateDashboard(filters);
    });

    // Atualiza a cada 5 minutos
    setInterval(() => updateDashboard(), 300000);
});