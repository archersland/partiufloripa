# Mapa de calor por potencial de público — regra v1

Data: 02/11/2026. Escopo autorizado pelo Cliente: documentar e implementar para validação na prévia Editorial Noturno. Implementação não equivale a aceite visual ou homologação editorial.

## Objetivo e semântica
Representar o volume potencial de público associado aos eventos noturnos cadastrados na data escolhida. Não representa pessoas medidas, ocupação confirmada, fluxo de trânsito nem probabilidade de lotação. Capacidade é referência de porte, não previsão de casa cheia. A escala é absoluta e igual entre datas.

## Referência por evento
1. Público esperado documentado em `event.audience.expected` tem prioridade, inclusive zero.
2. Sem previsão válida, usar capacidade específica do evento (`audience.capacity`); na ausência, capacidade-base da casa em `data/venue-capacities.json`.
3. Fonte HTTPS e data de consulta são obrigatórias para qualquer número. Valor negativo, não numérico, sem fonte/data ou capacidade em disputa não produz referência válida. Zero é permitido somente para público previsto.
4. Previsão não se soma à capacidade. É limitada pela capacidade aplicável. Ampliação documentada usa `audience.capacity` própria, sem alterar permanentemente a casa.
5. Dados ausentes: marcador permanece e informa público desconhecido; não atribuir calor fictício. Falha do registro auxiliar tem o mesmo fallback. Pontos regionais continuam explicitamente aproximados.

## Composição e horários
Deduplicar pelo ID da ocorrência. Na mesma casa e data, sessões com início e término conhecidos contribuem pelo maior público simultâneo: intervalos adjacentes não se sobrepõem; término após meia-noite é suportado. Esse pico é limitado à capacidade aplicável da casa/evento. Sem término conhecido, usar a maior referência individual da casa, comparada ao pico das sessões conhecidas, sem inventar duração ou somar sessões incertas.

Casas diferentes próximas contribuem juntas no mapa. O agregado diário é potencial da noite, não uma declaração de simultaneidade entre casas. O halo não indica alcance físico do público. Permanece o recorte existente de eventos com início informado a partir das 18h na data do cadastro; eventos após meia-noite pertencem à própria data, sem inferir vínculo com a noite anterior.

## Escala e transparência
Pontos usam pessoas como peso e máximo visual fixo de 10.000 pessoas por célula do mapa (saturação visual, não limite operacional). Mesmo zoom e mesmo valor produzem mesma intensidade, sem normalização pelo maior evento do dia. Opacidade mínima técnica de 0,015 mantém um halo discreto, sem igualar a intensidade de eventos pequenos e grandes. Legenda: menor/maior potencial de público, com teto visual 10 mil+. Popup informa capacidade ou previsão e oferece fonte; contagem de eventos sem referência fica visível. A escala de 10.000 é escolha técnica inicial para validação, não decisão atribuída ao Cliente.

## Pesquisa inicial e riscos
Registro reúne os 14 locais nomeados no catálogo, com pendências explícitas; `Local a confirmar` não é uma casa. Pesquisa pública, sem contato externo ou scraping da Sympla. Stage: páginas do operador divergem entre 10.000 e 13.000; Terraza FLN: 1.000 e 1.800. Esses valores ficam candidatos em disputa e não alimentam calor até esclarecer configuração. Não confundir Terraza FLN com Terraza BC. Ademir Rosa e Cinema Gilberto Gerlach têm referência da organização da Mostra (906 e 138), sem equivalência a alvará vigente. Não transferir capacidade da sala de cinema ao museu MIS/SC inteiro. Sem fonte suficiente, manter desconhecido.

## Implementação e validação
Módulo puro `scripts/audience-heat.js`, testes de precedência, evidência, zero/ausência, deduplicação e sobreposição. Reutilizar Leaflet e leaflet.heat, sem serviço pago ou backend. Prévia privada empacotada recebe patch estrito e reversível por `scripts/patch-private-heatmap.cjs`; não substitui o layout pelo `index.html` antigo. Validar mobile/desktop, data vazia, referência ausente, popup/fonte e navegação integrada. Publicação e QA devem ter evidências distintas. Rollback: restaurar HTML anterior e reverter commit dos módulos/documentos, sem reescrever outros trabalhos.
