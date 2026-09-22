---
title: "O Programador Prático: O gato comeu meu código - Administrando seu Repositório"
description: "Quando inventamos desculpas para nossos erros, perdemos a oportunidade de aprender e evoluir."
date: 2026-02-24
draft: false
slug: o-gato-comeu-meu-codigo
categories:
  - livros
tags:
  - o-programador-pratico
  - responsabilidade
---

![Gato programador ou ambiente de caos tecnológico](https://cdn.pixabay.com/photo/2015/09/29/13/47/cat-963931_1280.jpg)

Todos nós já passamos por isso. O prazo está estourando, um bug crítico aparece no ambiente de staging ou o banco de dados corrompe. A reação instintiva de muita gente é procurar um culpado: "O fornecedor atrasou", "A biblioteca está com bug", ou a clássica desculpa escolar adaptada para o backend: **"O gato comeu meu código-fonte"**.

No entanto, a diferença entre um desenvolvedor comum e um **Programador Pragmático** começa exatamente aqui: na postura técnica em relação à responsabilidade.

## A Responsabilidade é uma Escolha Ativa

No desenvolvimento de software, a responsabilidade é algo que você assume ativamente. Quando você aceita uma task, define uma arquitetura ou sobe um serviço em Spring Boot, você está se comprometendo a entregar aquilo funcionando.

O ponto chave do item 1.1 do livro não é sobre ter controle total sobre o universo (sabemos que o hardware falha e o Wi-Fi cai), mas sobre como lidamos com as falhas quando elas inevitavelmente ocorrem. Um programador pragmático não tenta esconder seus erros sob o tapete ou ignorar o débito técnico. Ele é honesto, direto e focado na solução.

## O Teste do Gato (ou do Pato de Borracha)

Quando algo dá errado, o instinto de defesa nos faz criar justificativas. Antes de correr para o seu tech lead e dizer que a culpa é do servidor, os autores Andrew Hunt e David Thomas sugerem um exercício mental simples:

> _"Antes de abordar alguém para dizer por que algo não pode ser feito, pare e escute a si próprio. Converse com o pato de borracha no seu monitor ou com o gato. Sua desculpa parece convincente ou soa como amadorismo?"_

Se o seu código sumiu porque você não deu push, a falha não é da máquina. A responsabilidade técnica era ter um fluxo de trabalho seguro. Se você não tinha um plano de contingência para um risco que sabia que existia, a falha é sua.

## Ofereça Opções, Não Desculpas

A lição mais valiosa aqui é a mudança de mentalidade de "dar desculpas" para "fornecer opções".

Um programador pragmático analisa o incidente e apresenta soluções alternativas. Em vez de apenas dizer que "o código não está pronto", tente:

- "Não vamos entregar a funcionalidade completa hoje, mas podemos subir o MVP com os endpoints X e Y e finalizar o Z amanhã."
- "O servidor caiu, mas o backup de ontem está íntegro e consigo restaurar em 2 horas."
- "Tivemos um conflito de merge complexo; se eu focar nisso agora com ajuda do Fulano, resolvemos até o final do dia."

Ao fazer isso, você tira o foco da falha e coloca na resolução, demonstrando controle sobre o projeto.

![Ambiente de trabalho organizado](https://cdn.pixabay.com/photo/2016/11/19/15/32/laptop-1839876_1280.jpg)

## Caso Real: Quando o gato realmente "comeu" meu código

Já vivi exatamente essa situação. Em um projeto que eu era o único responsável por desenvolver um produto novo do zero, acabei perdendo uma parte de tudo o que tinha feito até aquele momento.

Eu já tinha feito o estudo técnico, analisado as documentações e boa parte das funcionalidades principais já estava rodando em uma primeira versão de testes. O que eu perdi não foi apenas a correção de um bug simples, mas implementações prontas, testes validados e regras de negócio complexas que haviam sido ajustadas especificamente para o cenário da empresa.

**E o que eu fiz? Sentei no chão e chorei?** Não.

Fui direto ao meu líder e joguei limpo: expliquei que havia perdido as alterações em meio aos commits e que precisaria refazer o trabalho. Como o raciocínio estava fresco na memória e a arquitetura já estava definida, só disse ao meu lider que eu resolveria, e sentei para codar novamente. O resultado? O código saiu muito melhor do que estava antes, mais limpo e performático.

Hoje, meu workflow mudou. Mesmo que seja um ajuste pequeno em uma propriedade do projeto, eu realizo o commit. Tenho em mente que meu trabalho só está seguro quando está no repositório.

## Conclusão: Confiança se Constrói com Honestidade

Assumir a responsabilidade pelas falhas não é sinal de fraqueza; é sinal de senioridade. Quando seus colegas sabem que você não vai tentar enganá-los com desculpas criativas, eles passam a confiar no seu julgamento técnico.

Na próxima vez que algo der errado — e vai dar —, deixe o gato em paz. Respire fundo, avalie os danos, prepare opções viáveis e assuma o controle do seu código.

---
