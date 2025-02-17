# Metodologia de Análise

## Contexto e Motivação

Comunidades online frequentemente desenvolvem "apitos para cães" (dog whistles) – termos ou frases aparentemente inócuos que carregam significado oculto para um grupo específico. Em contextos políticos e sociais, um apito para cães é uma frase que apenas um grupo específico entende, mas para o público em geral soa sem sentido ou inócua.

No Reddit, que abriga inúmeras comunidades isoladas, termos aparentemente comuns podem ser usados de forma codificada sem levantar suspeitas. Este projeto visa desenvolver ferramentas e metodologias para identificar e analisar esses padrões de linguagem.

## Componentes do Projeto

### 1. Coleta de Dados

O processo de coleta de dados envolve:

- Uso da API oficial do Reddit via PRAW
- Coleta automatizada de posts e comentários
- Filtragem por termos específicos
- Armazenamento estruturado dos dados
- Respeito às políticas de uso e privacidade

### 2. Análise de Linguagem Natural (PLN)

Nossa análise emprega várias técnicas de PLN:

**Pré-processamento**
- Limpeza e normalização de texto
- Remoção de URLs e formatação
- Preservação de contexto das palavras-chave

**Análise de Padrões**
- Frequência e dispersão de termos
- Análise temporal de uso
- Identificação de comunidades relevantes

**Análise Contextual**
- Janelas de contexto (5 palavras antes/depois)
- N-gramas e colocações frequentes
- Redes de co-ocorrência
- Modelos de word embeddings

**Classificação**
- Modelos de classificação de contexto
- Análise de toxicidade
- Desambiguação de sentido

### 3. Visualização

Empregamos diversas técnicas de visualização:

- Gráficos temporais de frequência
- Distribuição por comunidade
- Nuvens de palavras contextuais
- Redes semânticas
- Estatísticas descritivas

## Reprodutibilidade

Todo o código está documentado e disponível neste repositório. Para reproduzir a análise:

1. Configure o ambiente (ver README.md)
2. Execute a coleta de dados
3. Execute os notebooks de análise em sequência
4. Gere as visualizações
5. Analise os resultados

## Considerações Éticas

Este projeto visa identificar padrões de linguagem para fins de pesquisa e moderação. Todo o processo respeita:

- Privacidade dos usuários
- Termos de uso do Reddit
- Uso responsável dos dados
- Transparência metodológica

## Referências

- Ferrer et al. "Discovering and Categorising Language Biases in Reddit." (ICWSM 2021)
- Mendelsohn et al. "From Dogwhistles to Bullhorns: Unveiling Coded Rhetoric with Language Models." (ACL 2023)
- Willaert et al. "A tool for tracking the propagation of words on Reddit." (2021)