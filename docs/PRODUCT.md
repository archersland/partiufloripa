# Visão do produto

**Problema:** eventos de Florianópolis estão espalhados por casas, produtoras, redes sociais e bilheterias. **Proposta:** agenda web mobile-first que centraliza programação confiável e direciona à fonte oficial.

**Usuários hipotéticos:** moradores e visitantes procurando festas, shows, humor, teatro e cultura. Não há pesquisa de público validada.

**Jornada:** acessar → buscar/filtrar por data, região, categoria → comparar → abrir evento na fonte oficial. Mapa é alternativa de descoberta.

**Princípios:** confiabilidade antes de volume; mobile-first; acessibilidade; baixo custo; proveniência; nenhuma venda/processamento de pagamento pelo portal.

**MVP web — escopo atualizado em 2026-11-02:** agenda com meses derivados dos registros, busca e filtros (categoria, região, período do dia e atalhos Hoje/Amanhã/Fim de semana), cards e carrossel, detalhes de evento, links às fontes, compartilhamento via navegador/cópia de URL, exportação de lembrete `.ics` quando data e horário são válidos, transparência sobre fonte e revisão editorial, mapa Esri com calendário nativo e calor dos eventos noturnos cadastrados (nunca presença de pessoas), indicação de precisão cartográfica e fallback de rede. Coleta/atualização assistida de eventos por fontes autorizadas faz parte da direção do MVP, mas a ativação depende da validação de permissões, regras e evidências conforme ADR-014; não pressupor coleta automatizada implementada.

**Fora do MVP:** app nativo, GPS dos visitantes, recursos sociais, contas, bilheteria, pagamento, scraping agressivo, prospecção comercial.

**Monetização:** validar audiência primeiro. Futuramente avaliar AdSense (web), sujeito a aprovação e requisitos; afiliados e patrocínios adiados. Não presumir receita.

**Indicadores a medir:** eventos conferidos, erros de dados, links válidos, visitantes, tráfego orgânico, cliques de saída, retorno. Metas numéricas dependem de baseline real.

## UX e operação (revisão 2026-11-02)
A data rápida modifica a listagem e funciona em conjunto com categoria/região/horário. O calendário de noite do mapa continua sendo um controle próprio. Compartilhamento e arquivo .ics não substituem a confirmação com o organizador. Marcadores regionais e de casa têm representações diferentes, ambas aproximadas quando não houver entrada geográfica comprovada. O catálogo continua experimental; última checagem registrada não equivale a `status: verified`. Consulte [revisão enumerada](../reports/BUILD-WEB-APPS-REVIEW-2026-11-02.md).

## Proposta em análise — “Lugares” (03/11/2026)
O Cliente sugeriu que bares, botecos, baladas e espaços culturais possam ser descobertos mesmo quando não há atração específica cadastrada. A separação **Agenda (eventos datados) / Lugares (casas independentes de eventos) / Mapa (visão com semântica explícita)** é uma **proposta de UX ainda não aceita nem implementada**. A lista editorial foi enriquecida para 39 locais no `data/venues.json`, mas nenhuma casa sem evento é criada automaticamente na agenda ou calor. Consultar [especificação e critérios abertos](PLACES-DISCOVERY-PROPOSAL.md).

## Atualização do escopo implementado — 03/11/2026
O Cliente autorizou a implementação da **aba Lugares**, agora disponível como terceira visualização com **Agenda / Lugares / Mapa** e seleção de datas acima das abas. O portal mantém dois conjuntos distintos: 56 ocorrências de evento em `events.json` e 39 casas/locais em `data/venues.json`. Lugar sem show continua visível em Lugares, mas não gera evento nem potencial de público no mapa.

O funcionamento por data é **habitual e documentado**, não “aberto agora”. Há três situações: costuma abrir, costuma fechar ou horário não confirmado. A UI separa as listas, deixa o grupo de horários fechados visualmente secundário e disponibiliza filtros de status e bairro. Fontes e datas ficam acessíveis. Horários somente de 5 casas pesquisadas até agora; outras 34 permanecem honestamente como desconhecidas até nova auditoria, sem serem classificadas como fechadas. A implementação segue sujeita a QA visual, verificação do deploy e aceite do Cliente.

## Retificação da referência visual e testes — 03/11/2026
A identidade selecionada para a web é **Horizonte Noturno** (prévia privada escolhida pelo Cliente em 02/11). O layout público anterior era legado e não deveria ter sido reutilizado para implementar Lugares; sua identificação como fonte canônica causou regressão. A implementação agora usa hierarquia editorial “Destaque do dia” → “Nos próximos dias”, cabeçalho ilustrado, busca proeminente e abas Agenda/Lugares/Mapa no mesmo sistema noturno. O mapa permanece vinculado a **eventos**, nunca calor de público de bares sem atração. O registro de [baseline](UI-BASELINE-HORIZONTE-NOTURNO.md) e a [RCA](../reports/UI-REGRESSION-RCA-2026-11-03.md) são fontes de manutenção. Aceite visual e editorial pendentes.
