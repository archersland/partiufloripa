# Baseline visual aprovado — Horizonte Noturno v0.2

**Estado da decisão:** linha visual escolhida pelo Cliente em 02/11/2026 (“primeira variação noturna do segundo output”), preservada como referência de implementação em 03/11/2026. Não interpretar essa escolha como aceite final do beta nem das telas migradas.

## Origem e autoridade
- Artefato de referência: prévia privada intitulada **“PartiuFloripa — Prévia Horizonte Noturno”**, recuperada e lida em ambiente local autorizado (somente para recuperar o layout previamente escolhido). O projeto registra a existência histórica desse preview como fonte visual; não confundir o arquivo de demonstração com um build que usa `events.json`.
- A prévia antiga era um bundle isolado de React, com eventos de amostra e imagens ilustrativas embutidas. **Não substituímos o site com esse bundle**, pois isso apagaria regras, ligações, fontes, URLs profundas e testes da produção. O visual foi portado ao HTML/JS estático existente.
- O HTML de produção público `index.html` e `styles/horizonte-noturno.css` passam a ser o **destino técnico canônico** para a versão web; `evento.html`, `creditos.html` e `styles/horizonte-detalhe.css` herdam a mesma linguagem. Os dados continuam em `events.json`, `data/venues.json`, `data/venue-hours.json` e registros auxiliares com proveniência.

## Identidade e estrutura que não podem regredir silenciosamente
1. **Paleta permanentemente noturna**, independentemente do tema do sistema: fundo `#041b21`, superfície `#0a252c`, acento menta `#8fe5cc`, destaque pêssego `#ffaf78`, linha `#315b60`. DM Sans no texto e DM Serif Display nos títulos, com fallback.
2. **Cabeçalho ilustrado** com arte decorativa da prévia aprovada (não é foto de um evento real), marca PartiuFloripa, título “Seu próximo rolê começa aqui.” e campo de busca grande, sobre fundo escuro.
3. **Hierarquia editorial:** um **Destaque do dia** principal, com imagem/faixa e detalhes; abaixo, **Nos próximos dias** em cards horizontais compactos com miniaturas, local e data. Não reproduzir carrossel antigo de múltiplos destaques como layout principal. Uma mesma ocorrência nunca deve aparecer duplicada no destaque e na lista.
4. **Três visões:** Agenda / Lugares / Mapa, preservando o seletor de data em nível superior solicitado em 03/11/2026. Aba Lugares usa cartões do mesmo tema, grupos “costumam abrir”, “costumam fechar” (visual secundário) e “horário não confirmado”.
5. **Mapa:** estilo noturno, calendário, marcadores e calor por capacidade/expectativa documentada de eventos; não é fluxo real de pessoas. Lugares sem coordenada de entrada não recebem ponto fictício. Botão “ver mapa” deve abrir a visualização integrada, nunca uma versão antiga.
6. **Detalhe:** mesmo tema editorial em página profunda, com links, fonte, avisos, compartilhamento e calendário `.ics` existentes; URL canônica/SEO e status editorial preservados.
7. **Mobile first:** 360–390 px e desktop, controles com foco visível, nomes legíveis, imagens sem direitos presumidos, estados de erro explícitos. Evitar sair da hierarquia escolhida ao desenvolver novas abas.

## Gates automatizados
- `scripts/test-ui-baseline.cjs` bloqueia retirada do tema, tokens, estrutura, controle de datas, abas e import de módulos relevantes.
- `scripts/test-home-layout.cjs` protege projeção editorial da agenda (destaque único, ordenação, eventos futuros, filtros, datas vazias, semana).
- `scripts/test-product-regressions.cjs` protege fontes e invariantes dos domínios Evento, Lugar, Horário, Mapa, Quarentena e falhas isoladas.
- `scripts/test-generated-details.cjs` testa páginas de evento realmente geradas e caminhos relativos, `<base>`, canonical, indexação e script `.ics`.
- `scripts/verify-deployed-site.cjs` verifica após deploy **o HTML e os assets realmente servidos**, inclusive detalhes, esquemas de dados e tokens. Não confundir CI com aceite visual: inspeção em browser/Android continua como gate humano.

**Mudanças materiais nesta referência:** exigir revisão do Cliente ou ADR explícito e atualização conjunta dos testes. Não “resolver” um teste retirando a asserção do baseline.

## Adendo de interação v0.3 — 03/11/2026 (aguardando aceite visual)
- A navegação primária ao clicar em card de evento (inclusive link de evento no popup do mapa) passa a abrir diálogo nativo sobre a aba atual. As URLs profundas preservam compartilhamento, SEO e abertura direta. Ctrl/Cmd+clique e abrir em nova aba continuam usando o link original.
- O card de Lugar tem imagem ilustrativa licenciada, identificada como tal, e abre diálogo com nome, endereço textual, estado habitual com ressalvas, evidências e atrações futuras presentes no catálogo. Uma casa sem eventos também deve abrir seu detalhe.
- A composição dos cards de Nos próximos dias dá prioridade a miniatura visível, título serifado, data e casa, sem sobrepor data grande/legendas sobre a foto compacta.
- O hero mantém a imagem decorativa da Ponte Hercílio Luz embutida no CSS. A declaração CSS precisa ser válida (cor apenas na última camada da propriedade background); presença de dados WebP isolada não comprova renderização.
- As fotos genéricas licenciadas do inventário existente não retratam as casas reais. Não chamá-las de fotos da casa. Substituição por foto real depende de fonte, licença/autorização e registro individuais. QA no navegador, Android físico e aceite do Cliente permanecem separados da aprovação técnica de CI.
