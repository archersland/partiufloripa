# UI-CARDS-A1.10 — Decisão aprovada (2026-10-28)

## Fonte da verdade
Este documento registra a aprovação visual dos cards do PartiuFloripa. Os dois contextos compartilham a mesma identidade, mas **não** o mesmo formato geométrico.

## Carrossel / featured
- Card largo e gordinho, largura-alvo 350–370 px; imagem 16:9 no topo.
- Sobrepor à imagem categoria à esquerda (emoji aprovado + texto) e data/hora à direita (borda verde discreta, fundo translúcido e gradiente de contraste).
- Abaixo: título do evento, localização e rodapé de preço/link.
- Localização: pin verde ~24 px alinhado ao centro vertical do conjunto de duas linhas: estabelecimento em destaque; bairro e Florianópolis em tom secundário.

## Busca / resultados
- Card **baixo, largo, horizontal**; imagem à esquerda, conteúdo à direita. Nunca transformá-lo em card vertical de grade.
- Categoria com emoji e data/hora como etiquetas no topo da coluna direita; título, localização em duas linhas, preço e link.
- Manter o mesmo vocabulário visual, bordas, cores e tipografia do carrossel.

## Categorias / emojis aprovados
Baladas 🪩; Shows 🎤; Humor 😂; Teatro 🎭; Cinema 🎬; Dança 💃; Festivais 🎪; Feiras 🛍️; Cultura 📚.

## Preço
- Prefixo "A partir de" branco; valor e símbolo R$ verde suave #B7DC91; emoji 💵 **à direita** do valor, nunca 💸.
- Quando o catálogo não tem preço, exibir "Consultar valores" em vez de inventar valores ou exibir emoji de dinheiro.

## Cores de referência
Card #151B25; borda #343D4A; verde principal #C9F48A; borda da data #8EAD62; preço #B7DC91; local secundário #AEB9C8.

## Critérios de aceite
1. Desktop e mobile: carrossel largo, busca horizontal baixa.
2. Categoria e data sobrepostas somente no carrossel; ambas legíveis em fotos claras e escuras.
3. Local e bairro visíveis; pin centrado no bloco de duas linhas.
4. Preço real, quando existir, com R$ verde e 💵; sem preços fictícios.
5. Imagens reais do catálogo ou fallback já previsto, sem novas imagens artificiais.
6. Sem regressões em busca, filtros, mapa, links externos e acessibilidade.
7. Validar visualmente em navegador antes de considerar concluído.

## Clássico Refinado — escolha homologada em 03/11/2026 (ADR-041)

O Cliente escolheu o **modelo 01 — Clássico Refinado** entre três opções comparadas em versões mobile e desktop para o futuro carrossel **Destaques do Dia**. O modelo **retoma a geometria A1.10**, com imagem 16:9 no topo, categoria e data/hora sobrepostas, título editorial, localização e rodapé informativo/ação. É um card *largo* com informação abaixo da foto, **não** o cartaz full-bleed nem o modelo vertical de corpo separado escolhidos como alternativas 02/03.

**Prioridade visual atual:** usar a identidade noturna homologada Horizonte Noturno v0.4 (fontes, fundo, menta e pêssego) em vez de reverter as antigas cores exploratórias do A1.10. 350–370 px é a largura-alvo de referência no desktop; a versão mobile adapta-se à área útil e deve deixar perceptível a continuidade do trilho, sem exigir crop de arte para criar dados fictícios.

**Comportamentos desejados para o futuro carrossel** (ainda não implementados/homologados em runtime): passar manualmente nos indicadores, rolar por toque no mobile e avançar automaticamente quando não houver interação. Falta definir o conjunto de eventos elegíveis para um mesmo dia, a política de tempo, pausa, foco de teclado, movimento reduzido, desempenho e critérios de teste. Nunca representar eventos de **datas diferentes** como se fossem destaques de uma mesma data; o comparativo tem dados de demonstração, com datas explícitas.

**Limite do aceite:** esta é a escolha **do card**, não o aceite da implementação do carrossel, que não modifica o site vigente, a lista Vitrine Noturna nem o destaque único até etapa autorizada. O guia v0.4 e as regras dos detalhes de evento permanecem em vigor; uma futura alteração do featured atual terá ADR/QA próprios.
