---
layout: default
title: Vetores de ofuscação
nav_order: 3
---

# Vetores de ofuscação

Como discurso codificado escapa da moderação automática — e o que a pesquisa já sabe sobre detectá-lo.
{: .fs-6 .fw-300 }

---

## Sobre o escopo desta página

Este documento descreve **mecanismos e métodos de detecção**. Ele não é, e não deve virar:

- um glossário de termos codificados pronto para uso;
- uma lista de comunidades ou servidores;
- um passo a passo de como escapar de moderação.

A escolha é deliberada. Um catálogo de termos envelhece em semanas — os termos são
[substituídos assim que queimam](#por-que-lista-de-palavras-nao-funciona) — e, pior, funciona tão bem
como manual quanto como defesa. O que envelhece devagar é o **padrão estrutural**, e é dele que esta
página trata.

---

## 1. O problema de fundo: negação plausível

Um *dog whistle* é comunicação codificada que carrega um segundo sentido para um público específico,
mantendo aparência inócua para todos os demais. A literatura registra sua origem na política dos EUA
e sua migração para redes sociais justamente como **meio de evadir sistemas de detecção de discurso
de ódio preservando negação plausível**.

A dificuldade técnica é precisa: **muitos desses termos têm significado corrente legítimo**. O
problema não é encontrar a palavra — é decidir, no contexto, qual dos dois sentidos está em uso.
Isso torna a tarefa um problema de **desambiguação de sentido**, não de filtro por lista.

### Por que lista de palavras não funciona

Três razões, todas documentadas:

1. **O termo queima e é trocado.** Assim que uma expressão entra em lista pública de moderação, a
   comunidade adota outra. A lista está sempre atrasada.
2. **Falso positivo pesa.** Bloquear o sentido legítimo de uma palavra comum atinge quem não tem nada
   a ver, e o custo social recai desproporcionalmente sobre os próprios grupos que a moderação
   deveria proteger.
3. **A ambiguidade é o produto, não o efeito colateral.** A negação plausível é o objetivo. Quem usa
   quer poder dizer "você que interpretou mal" — e o desenho da linguagem garante isso.

---

## 2. Ofuscação em nível de caractere e de codificação

Aqui a alteração não é de sentido, é de **forma**: o texto é embaralhado o suficiente para não bater
com o padrão procurado, mas continua legível para quem sabe ler.

### Substituição de caractere (*leetspeak* e derivados)

Trocar letras por números e símbolos visualmente próximos — `3` por E, `1` por l, `$` por s. A
prática vem dos BBS dos anos 1980, e as mesmas soluções continuam em uso hoje em plataformas
modernas. Variantes incluem inserção de pontuação, espaços, diacríticos e caracteres de outros
alfabetos com forma semelhante (homóglifos).

### *Algospeak*

Vocabulário inventado ou deformado para antecipar o que o classificador vai ler. Estudo com criadores
de conteúdo do TikTok descreveu o processo: eles **modelam mentalmente o algoritmo** e escrevem para
ele, mantendo o texto compreensível para o público-alvo.

> **Nuance importante — e ela é política.** *Algospeak* não é, por si, prática de extremistas. A
> pesquisa citada documenta o oposto: pessoas LGBTQIA+, profissionais do sexo, pessoas falando de
> suicídio, aborto ou violência policial usam esses recursos para **escapar de moderação injusta**
> que apaga discussão legítima. O mesmo mecanismo serve à evasão de moderação abusiva e à evasão de
> moderação necessária. Tratar toda ofuscação como sinal de má-fé produz um sistema que pune quem já
> é silenciado. **Ofuscação é sinal de que há algo a esconder de um sistema automático — não prova de
> qual é o conteúdo.**

### Base64 e outras codificações

Texto convertido em base64 (ou base32, hexadecimal, ROT13) não bate com nenhum filtro de palavra e é
trivialmente reversível por quem recebe. É a forma mais bruta de ofuscação e, por isso, a mais fácil
de detectar — quando se procura por ela.

Onde a literatura é mais robusta é no contexto de segurança e de modelos de linguagem: conteúdo
codificado em base64 é usado para atravessar filtros de conteúdo, inclusive salvaguardas de LLMs, e
as recomendações de defesa vão na mesma direção — **decodificar antes de classificar**, e tratar o
pedido de decodificação em si como sinal.

O mesmo trabalho registra a corrida: sistemas calibrados para base64 deixam passar base32, porque não
foram ajustados para esse padrão.

**Implicação para este projeto:** qualquer pipeline sério precisa de uma etapa de **normalização
anterior à classificação** — decodificar codificações conhecidas, reverter homóglifos, colapsar
substituições de caractere — e precisa **registrar que a normalização ocorreu**. O fato de um texto
ter chegado ofuscado é, ele próprio, um dado.

---

## 3. Ofuscação multimodal: o meme

O meme é o caso mais difícil, e por um motivo estrutural: ele **distribui o sentido entre imagem e
texto**. Cada camada, isolada, é inócua; o significado nasce da combinação — e é exatamente essa
incongruência que permite passar conteúdo hostil sob aparência de piada compartilhada.

Três consequências para a detecção:

- **Classificador de texto puro não vê.** A legenda pode ser inteiramente benigna.
- **Classificador de imagem puro também não.** A imagem pode ser um formato de meme popularíssimo e
  sem qualquer carga.
- **A ironia é defesa embutida.** O formato já vem com a resposta pronta para a acusação: "é só um
  meme". Isso não é acidente — é função.

A pesquisa em detecção de ódio implícito multimodal trata justamente da lacuna entre o que cada
modalidade carrega e o que a combinação produz.

---

## 4. Migração de plataforma: o vetor Discord

Ofuscação linguística resolve o problema de **passar pelo filtro**. Migrar de plataforma resolve o
problema de **não ter filtro**.

O que a pesquisa institucional documenta:

- Plataformas adjacentes a games — Discord, Twitch, Steam — tornaram-se **infraestrutura
  organizacional** de recrutamento e construção de comunidade, com acesso direto a público jovem.
- O Discord permite criar grupos privados sobre praticamente qualquer tema, e a plataforma acumula
  críticas de longa data quanto à moderação frouxa. Seu relatório de transparência informa
  **36.966 contas desativadas no primeiro semestre de 2024** por conteúdo violento, gráfico ou
  extremista — número que serve tanto de evidência de esforço quanto de escala do problema.
- Autoridades dos EUA alertaram, em documentos noticiados em 2026, sobre radicalização de jovens em
  servidores da plataforma.
- Análises de servidores descrevem um padrão de **entrada gradual**: o conteúdo extremista aparece
  primeiro enquadrado como elemento cultural, estético ou lúdico — não como chamado explícito à
  violência. A escalada vem depois, dentro de câmara de eco.

### Por que isso muda o desenho da pesquisa

O corpo desta pesquisa é público e coletado por API oficial. Espaços privados **não são acessíveis
por esse método, e não deveriam ser** por infiltração: entrar em comunidade fechada para coletar
conversa levanta questões éticas sérias, envolve risco real ao pesquisador e, feito sem protocolo
aprovado, contamina o resultado.

O que é metodologicamente honesto fazer:

- estudar o **vazamento** — o material que atravessa do espaço fechado para o aberto, que é
  observável e é justamente onde o recrutamento acontece;
- estudar **relatórios de transparência** e material já publicado por organizações que fazem esse
  trabalho com protocolo próprio;
- **declarar a lacuna** em vez de fingir cobertura. Este projeto observa o Reddit público. O que
  acontece em servidor fechado está fora do alcance, e dizer isso é parte do método.

---

## 5. O que este projeto pode e não pode afirmar

| Consegue | Não consegue |
|:---|:---|
| Medir frequência e dispersão de termos em corpus público | Determinar intenção de um indivíduo |
| Mapear em quais comunidades um termo circula | Provar que alguém é extremista |
| Acompanhar a evolução temporal de um vocabulário | Cobrir espaços privados |
| Identificar coocorrências e vizinhança semântica | Resolver ambiguidade sem contexto |
| Registrar que houve ofuscação | Inferir o conteúdo apenas da ofuscação |

Isso não é modéstia protocolar. Ferramenta de detecção de discurso codificado **erra contra os
mesmos grupos que pretende proteger** quando é usada como veredito. O produto legítimo aqui é
**evidência agregada para pesquisa**, não classificação de pessoas.

---

## Fontes

- Kruk, J. et al. (2024). *Silent Signals, Loud Impact: LLMs for Word-Sense Disambiguation of Coded
  Dog Whistles.* Dataset com 16.550 exemplos desambiguados.
  [arXiv:2406.06840](https://arxiv.org/abs/2406.06840) ·
  [dataset](https://huggingface.co/datasets/SALT-NLP/silent_signals_detection)
- *Making FETCH! Happen: Finding Emergent Dog Whistles Through Common Habitats.*
  [arXiv:2412.12072](https://arxiv.org/abs/2412.12072)
- *Deciphering Implicit Hate: Evaluating Automated Detection Algorithms for Multimodal Hate.*
  [arXiv:2106.05903](https://arxiv.org/abs/2106.05903)
- Steen, E., Yurechko, K., & Klug, D. (2023). *You Can (Not) Say What You Want: Using Algospeak to
  Contest and Evade Algorithmic Content Moderation on TikTok.* Social Media + Society.
  [doi:10.1177/20563051231194586](https://doi.org/10.1177/20563051231194586)
- *Countering Malicious Content Moderation Evasion in Online Social Networks: Simulation and
  Detection of Word Camouflage.* [arXiv:2212.14727](https://arxiv.org/abs/2212.14727)
- GNET — *Inside the Discord Server: Echo Chambers and the Spread of Gen-Z Radicalisation* (2026).
  [gnet-research.org](https://gnet-research.org/2026/03/11/inside-the-discord-server-echo-chambers-and-the-spread-of-gen-z-radicalisation/)
- GNET — *Policing Extremism on Gaming-Adjacent Platforms: Awful but Lawful?* (2025).
  [gnet-research.org](https://gnet-research.org/2025/02/26/policing-extremism-on-gaming-adjacent-platforms-awful-but-lawful/)
- NBC News (2026). *Extremists are using Discord to radicalize American youth, officials warned.*
  [nbcnews.com](https://www.nbcnews.com/tech/security/discord-messages-server-dhs-terror-extremist-charlie-kirk-fbi-patel-rcna232377)
