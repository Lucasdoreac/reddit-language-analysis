# Reddit Language Analysis Project

Um projeto de pesquisa para analisar padrões de linguagem e termos codificados no Reddit usando técnicas de Processamento de Linguagem Natural (PLN).

## Visão Geral do Projeto

Este projeto visa analisar padrões de linguagem no Reddit através de:
- Coleta automatizada de dados usando a API do Reddit
- Análise de linguagem natural e processamento de texto
- Visualização de dados e análise estatística
- Publicação de resultados via GitHub Pages

## Documentação

- [Metodologia Detalhada](docs/methodology.md) - Explicação completa da abordagem e motivação
- [Detalhes Técnicos](docs/technical_details.md) - Documentação técnica do código
- [Site do Projeto](https://lucasdoreac.github.io/reddit-language-analysis/) - Resultados e visualizações

## Estrutura do Repositório

```
/scraper        - Scripts de coleta de dados do Reddit
/data           - Armazenamento de datasets
/analysis       - Notebooks de análise e PLN
/visualization  - Scripts de visualização de dados
/docs           - Documentação e site do projeto
```

## Configuração e Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Lucasdoreac/reddit-language-analysis.git
cd reddit-language-analysis
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Configure as credenciais do Reddit:
- Copie `config.example.ini` para `config.ini`
- Adicione suas credenciais da API do Reddit

## Uso

1. Coleta de Dados:
```bash
python scraper/collect_data.py
```

2. Análise:
- Navegue até o diretório `analysis`
- Execute os notebooks Jupyter em sequência

3. Visualização:
```bash
python visualization/generate_charts.py
```

## Pipeline de Análise

1. **Coleta de Dados**
   - Uso da API oficial do Reddit via PRAW
   - Coleta de posts e comentários
   - Filtragem por termos específicos

2. **Processamento de Texto**
   - Limpeza e normalização
   - Análise de contexto
   - Identificação de padrões

3. **Análise e Visualização**
   - Análise temporal
   - Redes de co-ocorrência
   - Estatísticas descritivas

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) para detalhes sobre como participar do projeto.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos

- Documentação do PRAW e API do Reddit
- Comunidade de PLN e Ciência de Dados
- Pesquisadores e referências citadas na documentação