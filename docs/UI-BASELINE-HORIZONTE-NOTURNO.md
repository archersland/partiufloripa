# Horizonte Noturno — baseline visual v0.2 e UI Style Guide v0.4


**Consultar o guia visual atualizado:** [PDF v0.4 (10 pranchas)](UI-STYLE-GUIDE-HORIZONTE-NOTURNO-v0.4.pdf) · [HTML navegável v0.4](UI-STYLE-GUIDE-HORIZONTE-NOTURNO.html). O PDF é um artefato de documentação na branch; não integra o site publicado.

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


## Complemento visual v0.3 — fotografia do hero e especificação de transparências (03/11/2026)

**Artefato do guia:** [UI Style Guide Horizonte Noturno — 10 pranchas de alta fidelidade](UI-STYLE-GUIDE-HORIZONTE-NOTURNO.html). Este complemento **não altera** as escolhas aprovadas acima, o código ou a definição de aceite beta.

**Correção visual da prancha 01:** o guia não utiliza mais a ponte SVG esquemática. Reaproveita o **mesmo WebP incorporado ao seletor `.mast` de `styles/horizonte-noturno.css`**, com o enquadramento original `center 44%`, o gradiente do tema e a amostra da marca/título/busca. Isso melhora a fidelidade visual sem adquirir outra imagem. Não se assume origem, titularidade ou licença da arte; confirmar em `SOURCES-AND-RIGHTS.md` antes de ampliar usos.

**Referências de opacidade:** CSS `#RRGGBBAA`, em que `AA` é o canal alfa. Percentuais arredondados, não brilho. Os registros distinguem **estilo público atual**, **prévia privada original** e **composição específica do guia**; não combinar dois overlays de versões distintas.

| Fonte / elemento | Valor observado | Alfa e função |
| --- | --- | --- |
| Tema público `.mast` | `linear-gradient(90deg,#041b216b,#041b2155)` + WebP | 42% → 33%; tonalização da fotografia |
| Prévia privada `.hero:before` | `#021b2260` | 38%; overlay da versão React, não adicional automático no site estático |
| Tema público `.search` | `#031a20ee` | 93%; superfície da busca |
| Prévia privada `.search` | `#031a20ec` | ~92,5%; ligeira divergência |
| Prévia privada `.picture span` | `#041b21b8` | 72%; selo “imagem ilustrativa” |
| Tema público `.event-date` | `#0c2930d9` | 85%; data sobre a arte |
| Tema público `#agenda .event-search:hover` | `#0a2c3360` | 38%; hover (manter foco visível à parte) |
| Tema público `#agenda .event-search .event-art` | `linear-gradient(0deg,#041820aa,transparent)` | 67% → 0%; contraste da miniatura |
| Prévia privada `dialog::backdrop` | `#001016c9` e `backdrop-filter:blur(5px)` | 79%; escurecimento/desfoque do modal |
| Prévia privada `.datebar input` | `opacity:0`, fundo `transparent` | 0% visível; seletor nativo **não é desativado**, revisar foco/teclado |
| `index.html` `.event-overlays` | `linear-gradient(#0008,transparent)` | 53% → 0%; legenda sobre arte |
| `index.html` `.event-art` | `rgba(5,15,23,.63)` → transparente | 63% → 0%; arte herdada |
| `index.html` `.event-media.has-stock-photo .event-art` | `rgba(3,12,19,.73)` → transparente | 73% → 0%; foto ilustrativa |
| `index.html` `.event-art-venue` | `#0c202b99` | 60%; tarja da casa |
| `index.html` `.cover .cat` | `#08151ad9` | 85%; badge herdado |
| `index.html` `.stock-notice` | `#0b1d2bdb` | 86%; aviso sobre mídia |
| `index.html` `.leaflet-control-attribution` | `opacity:.72`, `#152127cc` | 72% + 80%; crédito cartográfico |
| `index.html` `.pf-map-popup` | sombra `#0b1c26ab` | 67%; sombra, não opacidade do conteúdo |
| `index.html` `.leaflet-popup-close-button` | `#17282fdc` | 86%; botão de fechar popup |
| `index.html` `.pf-map-image-hint` | `#101e2acb` | 80%; aviso na miniatura |
| Prévia privada `.pf-event-halo` | amarelo com `.65/.38/.14/0` | 65% → 38% → 14% → 0%; halo sem número inventado |
| Prévia privada `.pf-event-halo--weighted` | menta com `.78/.37/.12/0` | 78% → 37% → 12% → 0% |
| Prévia privada `.pf-event-halo--warm` | amarelo com `.85/.40/.12/0` | 85% → 40% → 12% → 0% |
| Prévia privada `.pf-event-halo--hot` | coral com `.86/.42/.14/0` | 86% → 42% → 14% → 0% |

**Elementos demonstrativos, não tokens de produção:** `#041b21bb` no campo ilustrativo do guia e `#041b21d5` no quadro explicativo; ambos são recursos da prancha, distintos da busca real. `transparent` em botões, links, linhas e backgrounds herdados, assim como as transições de opacity internas do Leaflet, permanecem sujeitos ao CSS original, não a um “alfa global” da marca.

**Verificação documental:** estrutura de 10 pranchas e fotografia reaproveitada do stylesheet validada por inspeção do HTML; este procedimento não valida contraste/pixel-perfect no navegador, PDF v0.3, permissões da imagem ou Android físico. **Status:** documentação atualizada na branch `docs/ui-style-guide-horizonte-noturno-v03`; sem deploy do portal e sem aceite final.


## Revisão v0.4 — iconografia do local e fidelidade dos exemplos (03/11/2026)

**Solicitação do Cliente:** na prancha 06, substituir o glifo `⌖` (visual de asterisco/diamante) por um pin de localização convencional junto ao nome da casa; nas pranchas 09 (mobile) e 10 (desktop), substituir a representação vetorial da ponte por **fotografia de referência já usada no site**.

**Implementação documental (branch `docs/ui-style-guide-horizonte-noturno-v03`):**
- `docs/UI-STYLE-GUIDE-HORIZONTE-NOTURNO.html`, **v0.4**: prancha 06 utiliza ícone SVG inline no estilo `map-pin`, traço 1,9, tamanho 22 px, cor menta `#8FE5CC`, acessibilidade via rótulo `Local do evento` e SVG decorativo oculto ao leitor de tela. O ícone indica a casa/venue, não localização precisa de GPS.
- Pranchas 09 e 10: componentes visuais de hero nas miniaturas das telas **Eventos, Lugares e Mapa**, mais o exemplo desktop, utilizam **o mesmo WebP da Ponte Hercílio Luz que consta em `styles/horizonte-noturno.css`**, sem nova imagem gerada ou busca externa. O WebP está embutido **uma única vez** como recurso CSS reutilizado, com enquadramento `center 44%`. As imagens ilustrativas dos eventos continuam representativas, não cartazes reais licenciados.
- O CSS da imagem foi reescrito em propriedades válidas `background-image`, `background-size`, `background-position` e `background-repeat`, evitando o shorthand de layers não interpretado pelo Chromium e mantendo o degradê de legibilidade.
- **Fidelidade:** as pranchas 09/10 são composições de alta fidelidade com cabeçalho fotográfico e conteúdo preservado, mas não são screenshots pixel-perfect do portal atual. A aba Lugares continua proposta no conjunto visual (apesar de implementada funcionalmente em `main`) até inspeção/aprovação específica.

**Verificação efetuada:** exportação do PDF v0.4 com **10 páginas**; leitura de confirmação do arquivo GitHub; renderização headless em Chrome das pranchas 06, 09 e 10 com largura 1600 px; contagem de 10 pranchas, **1 SVG de localização** no card principal, **3 heroes mobile e 1 desktop** com fotografia original aplicada; erros de página zero e rolagem horizontal ausente nas três pranchas inspecionadas. Versão do navegador/projeto publicado e Android físico **não** foram homologados por esses testes. Direitos da mídia continuam sujeitos ao registro de fontes, não presumidos.

**Status:** atualização documental concluída na branch; sem alterações no HTML do portal, sem commit em `main` e sem publicação.
