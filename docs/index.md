---
layout: default
title: Início
nav_order: 1
---

# Análise de Linguagem no Reddit
{: .fs-9 }

Um projeto de pesquisa para análise de padrões linguísticos e tendências no Reddit usando técnicas avançadas de PLN.
{: .fs-6 .fw-300 }

[Ver no GitHub](https://github.com/Lucasdoreac/reddit-language-analysis){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Ver Documentação](./docs/methodology){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Visualizações Interativas

<div class="container">
  <div class="dashboard">
    <div id="temporal-chart" class="chart-container">
      <h3>Tendências Temporais</h3>
      <p>Carregando gráfico...</p>
    </div>
    
    <div id="network-graph" class="chart-container">
      <h3>Rede de Co-ocorrências</h3>
      <p>Carregando visualização...</p>
    </div>
  </div>
  
  <div class="filters">
    <h3>Filtros</h3>
    <form id="filter-form">
      <div class="form-group">
        <label for="date-range">Período:</label>
        <select id="date-range" class="form-control">
          <option value="1m">Último Mês</option>
          <option value="3m">Últimos 3 Meses</option>
          <option value="6m">Últimos 6 Meses</option>
          <option value="1y">Último Ano</option>
          <option value="all">Todo o Período</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="terms">Termos:</label>
        <select id="terms" class="form-control" multiple>
          <option value="uvcamera">uvcamera</option>
          <option value="sunscreen">sunscreen</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="subreddits">Subreddits:</label>
        <select id="subreddits" class="form-control" multiple>
          <option value="all">Todos</option>
        </select>
      </div>
      
      <button type="submit" class="btn btn-primary">Atualizar</button>
    </form>
  </div>
</div>

## Estatísticas Atuais

<div class="stats-grid">
  <div class="stat-card">
    <h4>Total de Posts Analisados</h4>
    <p class="stat-number" id="total-posts">Carregando...</p>
  </div>
  
  <div class="stat-card">
    <h4>Subreddits Únicos</h4>
    <p class="stat-number" id="unique-subreddits">Carregando...</p>
  </div>
  
  <div class="stat-card">
    <h4>Usuários Únicos</h4>
    <p class="stat-number" id="unique-users">Carregando...</p>
  </div>
</div>

## Achados Recentes

<div class="findings-list" id="recent-findings">
  <p>Carregando descobertas recentes...</p>
</div>

## Sobre o Projeto

Este projeto utiliza técnicas avançadas de Processamento de Linguagem Natural (PLN) para analisar padrões linguísticos no Reddit. Através de coleta automatizada de dados, análise contextual e visualizações interativas, buscamos compreender melhor como certos termos são utilizados na plataforma.

### Principais Características

- Coleta automatizada via API do Reddit
- Análise de contexto usando PLN
- Visualizações interativas em tempo real
- Atualização contínua dos dados
- Documentação detalhada da metodologia

### Como Usar

1. Use os filtros à direita para ajustar a visualização
2. Explore os gráficos interativos
3. Consulte as estatísticas atualizadas
4. Veja os achados recentes da análise

### Contribua

O projeto é open source e aceita contribuições. Visite nosso [repositório no GitHub](https://github.com/Lucasdoreac/reddit-language-analysis) para mais informações.

<style>
.container {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

.dashboard {
  flex: 2;
}

.filters {
  flex: 1;
}

.chart-container {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #0366d6;
}

.findings-list {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .filters {
    order: -1;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Aqui irá o código JavaScript para carregar e atualizar as visualizações
  // Será implementado quando tivermos a API de dados pronta
});
</script>