---
layout: default
title: Início
nav_order: 1
---

# Análise de Linguagem no Reddit
{: .fs-9 }

Como comunidades online codificam discurso de ódio em palavras que parecem inofensivas — e como detectar isso com Processamento de Linguagem Natural.
{: .fs-6 .fw-300 }

[Metodologia](./methodology){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Detalhes Técnicos](./technical_details){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Ver no GitHub](https://github.com/Lucasdoreac/reddit-language-analysis){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## O problema

Comunidades online desenvolvem **apitos para cães** (*dog whistles*): termos aparentemente inócuos que
carregam significado oculto para um grupo específico. Para quem está de fora, a frase soa banal ou sem
sentido. Para quem está dentro, ela diz exatamente o que não poderia ser dito em voz alta.

É assim que discurso racista, antissemita e misógino atravessa moderação automática: ele não usa as
palavras que os filtros procuram. Ele inventa outras.

O Reddit, por abrigar milhares de comunidades relativamente isoladas, é um ambiente onde esse
vocabulário paralelo se forma e se propaga com rapidez — e onde ele pode ser estudado.

## O que este projeto faz

Desenvolve ferramentas e metodologia para **identificar, medir e acompanhar** esses padrões:

- **Coleta** — captura automatizada de posts e comentários via API oficial (PRAW), com filtragem por
  termos e respeito às políticas de uso e privacidade da plataforma
- **Pré-processamento** — limpeza e normalização preservando o contexto ao redor das palavras-chave
- **Análise de padrões** — frequência, dispersão, evolução temporal e mapeamento das comunidades onde
  cada termo circula
- **Análise contextual** — janelas de contexto, n-gramas, colocações frequentes, redes de co-ocorrência
  e *word embeddings*
- **Classificação** — modelos de classificação de contexto, análise de toxicidade e desambiguação de
  sentido, para separar o uso codificado do uso comum da mesma palavra

## Por que isso importa

Um termo codificado só funciona enquanto ninguém de fora percebe. Documentar o vocabulário, o momento
em que ele aparece e as comunidades por onde passa retira dele exatamente aquilo que o torna eficaz:
a invisibilidade.

Este é um projeto de pesquisa aberto. A metodologia está documentada para ser criticada, reproduzida e
adaptada a outras plataformas e outros idiomas.

## Documentação

| Página | O que contém |
|:---|:---|
| [Metodologia](./methodology) | Contexto, motivação e a abordagem completa de análise |
| [Detalhes Técnicos](./technical_details) | Documentação do código, dependências e execução |

## Estrutura do repositório

```
/scraper        Coleta de dados do Reddit
/data           Armazenamento dos datasets
/analysis       Notebooks de análise e PLN
/visualization  Scripts de visualização
/docs           Documentação e este site
```

---

## Status

O pipeline de coleta e análise está documentado e disponível no repositório. O painel de visualizações
interativas ainda não existe — os resultados são gerados hoje pelos notebooks em `/analysis`.

Distribuído sob licença MIT. Contribuições e críticas metodológicas são bem-vindas via
[issues](https://github.com/Lucasdoreac/reddit-language-analysis/issues).
