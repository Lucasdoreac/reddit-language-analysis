# Documentação Técnica

Este documento detalha os aspectos técnicos do projeto de análise de linguagem no Reddit.

## 1. Scraper do Reddit

### Configuração da API

```python
import praw
import configparser

def init_reddit(config):
    return praw.Reddit(
        client_id=config['reddit']['client_id'],
        client_secret=config['reddit']['client_secret'],
        user_agent=config['reddit']['user_agent']
    )
```

### Métodos de Coleta

Três abordagens principais são implementadas:

1. **Busca Direta**
   - Uso da search API do Reddit
   - Filtragem por palavras-chave
   - Limitação de resultados por requisição

2. **Varredura de Subreddits**
   - Coleta de todos os posts em subreddits específicos
   - Filtragem posterior por termos
   - Cache de resultados para eficiência

3. **Monitoramento em Tempo Real**
   - Stream de comentários públicos
   - Filtragem em tempo real
   - Sistema de buffer para processamento em lote

### Estrutura de Dados

Dados são armazenados em formato CSV com os seguintes campos:
- id: Identificador único do post/comentário
- title: Título (apenas para posts)
- text: Conteúdo textual
- subreddit: Comunidade
- author: Autor
- created_utc: Timestamp
- score: Pontuação
- term: Termo encontrado

## 2. Processamento de Linguagem Natural

### Pré-processamento

```python
import spacy
import re
from bs4 import BeautifulSoup

def preprocess_text(text):
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    
    # Remove formatação Reddit
    text = re.sub(r'\[([^\]]+)\]\(http[s]?://[^)]+\)', r'\1', text)
    
    # Preserva palavras-chave
    key_terms = ['uvcamera', 'sunscreen']
    for term in key_terms:
        text = text.replace(term, f' {term} ')
    
    return text.strip()
```

### Análise de Contexto

A análise de contexto é realizada em várias etapas:

1. **Janela de Contexto**
```python
def get_context_window(text, term, window_size=5):
    words = text.split()
    try:
        idx = words.index(term)
        start = max(0, idx - window_size)
        end = min(len(words), idx + window_size + 1)
        return words[start:end]
    except ValueError:
        return []
```

2. **Redes de Co-ocorrência**
```python
import networkx as nx

def build_cooccurrence_network(contexts, min_count=3):
    graph = nx.Graph()
    # Implementação da construção do grafo
    return graph
```

3. **Word Embeddings**
```python
from gensim.models import Word2Vec

def train_embeddings(texts):
    model = Word2Vec(sentences=texts, vector_size=100, window=5, min_count=1)
    return model
```

### Classificação de Contexto

O sistema utiliza múltiplos modelos de classificação:

1. **Modelo Base (Regras)**
```python
def basic_classifier(text, term):
    # Regras básicas de classificação
    suspicious_patterns = [...]
    return any(pattern in text.lower() for pattern in suspicious_patterns)
```

2. **Modelo de Deep Learning**
```python
from transformers import AutoModelForSequenceClassification

def deep_classifier(texts):
    model_name = 'bert-base-uncased'
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    # Implementação da classificação
    return predictions
```

## 3. Visualização

### Gráficos Temporais

```python
import matplotlib.pyplot as plt
import seaborn as sns

def plot_temporal_frequency(df, term):
    plt.figure(figsize=(15, 7))
    # Implementação do gráfico temporal
    plt.savefig(f'docs/images/{term}_frequency.png')
```

### Redes Semânticas

```python
import networkx as nx
import plotly.graph_objects as go

def plot_semantic_network(graph):
    # Implementação da visualização da rede
    # Salva como HTML interativo
    pass
```

## 4. GitHub Pages

### Estrutura do Site

```
docs/
├── index.md              # Página principal
├── methodology.md        # Metodologia detalhada
├── technical_details.md  # Este documento
├── results/             # Resultados e visualizações
└── assets/              # Recursos estáticos
```

### Configuração Jekyll

```yaml
# _config.yml
theme: jekyll-theme-minimal
title: Análise de Linguagem no Reddit
description: Projeto de análise de padrões linguísticos
```

## Notas de Implementação

1. **Rate Limiting**
   - Implementar delays entre requisições
   - Usar exponential backoff em caso de erros
   - Monitorar limites da API

2. **Otimização de Performance**
   - Cache de resultados intermediários
   - Processamento em lote quando possível
   - Paralelização de tarefas independentes

3. **Manutenção de Dados**
   - Backup regular dos dados coletados
   - Versionamento de datasets
   - Documentação de mudanças

4. **Segurança**
   - Sanitização de inputs
   - Proteção de credenciais
   - Anonimização de dados sensíveis

## Referências de Implementação

- Documentação PRAW: https://praw.readthedocs.io/
- Spacy: https://spacy.io/usage/linguistic-features
- Scikit-learn: https://scikit-learn.org/stable/
- NetworkX: https://networkx.org/documentation/
- GitHub Pages: https://pages.github.com/