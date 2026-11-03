# Auditoria de eventos e casas — PartiuFloripa

**Data de coleta/revisão:** 03/11/2026 (America/Sao_Paulo). **Fonte interna:** `archersland/partiufloripa@main`, `events.json`, `data/venues.json`, `docs/SOURCES-AND-RIGHTS.md`. **Fontes públicas:** Firecrawl Search (índice e descrições de resultados) e Firecrawl Scrape (páginas oficiais/veículos sem bloqueio identificado), pesquisa web complementar. **Situação:** auditoria técnica e documental parcial; nenhum evento homologado para beta; sem scraping da Sympla, contato com casas, download/reuso de cartazes ou automação recorrente.

## 1. Escopo e contagem

- **56 ocorrências** no `events.json`; **14 locais nomeados fisicamente**, mais **5 eventos com “Local a confirmar”**. Esses cinco estão em `sourceReview: quarantined`, de modo que não são casas.
- **51 ocorrências** fora da quarentena, das quais **33 têm data a partir de 03/11/2026** (o inventário contém **18 ocorrências anteriores**); **0 marcadas `status: verified`**. A idade da ocorrência não confirma ou cancela sua realização.
- **7 registros visíveis sem hora**; a norma ADR-016/023 exige revisão individual e aviso, e o gate `--beta` exige evidência, mesmo para dados incompletos.
- O cadastro de casas passou de **3 para 23** entradas: os **14 locais nomeados do catálogo** estão agora representados, mais **9 candidatos novos com endereços documentados**. Isso **não cria eventos novos** nem pontos exatos no mapa.
- Somente o Floripa Comedy Club tinha coordenadas de um **complexo aproximado** no registro original; as **20 entradas novas não recebem coordenadas** por falta de geocodificação de entrada comprovada. `region_centroid` é apenas fallback visual onde houver centro regional cadastrado, nunca GPS da casa.

### Fontes dos 56 registros

| Domínio do link armazenado | Ocorrências | Observação |
|---|---:|---|
| www.pensanoevento.com.br | 27 | 26 páginas específicas + 1 perfil genérico |
| ouviram.com.br | 14 | Uma matéria para 14 ocorrências |
| emfloripa.ia.br | 5 | 5 quarantined |
| guiafloripa.com.br | 4 | Links genéricos; detalhamento necessário |
| musicpark.com.br | 2 | Agenda do operador, 2 ocorrências |
| tocaonde.com.br | 2 | Conferir especificidade do link |
| www.eventoon.com.br | 1 | Conferir especificidade do link |
| undr.com.br | 1 | Conferir especificidade do link |

## 2. Achados prioritários (não corrigir automaticamente)

1. **CRÍTICO — ID `evt-362d49fca53d` (14/11, Bar do Espartano):** título atual da fonte específica `/eventos/108084/` é **“BACKWASH: 2016 vs 2026”**, não “NA ONDA convida: atração a confirmar”. Data 14/11 e casa coincidem; o título/atrações estão obsoletos. Fonte pública: https://www.pensanoevento.com.br/eventos/108084/backwash-2016-vs-2026 (consulta 03/11). **Corrigir apenas após revisão editorial explícita; não substituir foto/atração por suposição.**
2. **CRÍTICO — ID `evt-628f76d5f85e` (13/11, MUNDO M):** o link específico Pensa no Evento informa **Stage Music Park**; a **agenda oficial do Music Park** classifica como **Indoor**. Fontes: https://www.pensanoevento.com.br/eventos/109366/mundo-m-florianopolis e https://musicpark.com.br/agenda/ . Disputa sobre **setor/espaço**, mesmo complexo, não resolvida pela presença do show na agenda. Não fixar coordenada de entrada ou capacidade de Stage para essa ocorrência.
3. **ATENÇÃO — `evt-9d90a0eb82b0` (06/11, “TRIPPY ANOS 2000”):** o `source` aponta ao **perfil genérico do Espartano** (https://www.pensanoevento.com.br/espartanofloripa), não à ocorrência. A programação indexada na pesquisa de 03/11 não mostrou este título na data. Ausência na agenda pesquisada não equivale a cancelamento; falta fonte individual.
4. **ATENÇÃO — `evt-3ebafd721fc1` (29/10, Daniel Duncan):** `time: 19:00` no catálogo e `21h` no slug da fonte histórica; pode ser abertura da casa versus início do show, mas a busca indexada específica não trouxe a página para confirmar. **Não afirmar erro sem evidência.**
5. **ATENÇÃO — `evt-ebb62fc37d0b` (30/10, abertura Folianópolis):** a ficha salva 18h; a página específica do Guia Floripa informa, em trechos distintos, início geral às **18h** e abertura da sexta às **19h**. Distinguir início do evento de abertura de portões. Fonte: https://guiafloripa.com.br/agenda/shows/folianopolis-2026-leo-santana-e-o-tchan-timbalada-e-mais.php .
6. **COBERTURA — 10, 11 e 12/11, “O Céu da Língua”:** a matéria de origem informa **duas sessões por noite (18h30 e 21h30)**, mas o catálogo contém só a sessão de 18h30. Não duplicar automaticamente: recuperar os links específicos da bilheteria e comprovar cada sessão. Fonte: https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 .
7. **HORÁRIOS — 20–22/11, “Dois de Nós”:** a matéria usada como fonte registra os dias, mas não o horário da sessão. Continuar com horário ausente; não inferir nem liberar para beta sem revisão.
8. **DIREITOS — 12 associações de cartazes originais ainda pendentes** em `data/image-rights.json`; fotos ilustrativas e de arquivo de artistas com licença documentada pertencem a registros separados. **Nenhuma descoberta de evento constitui licença para republicar cartaz.**

## 3. Auditoria dos 56 registros — rastreabilidade integral

**Legenda:** INDEX = link específico encontrado em pesquisa indexada (metadados completos ainda não certificados); WEB = encontrado em busca web complementar; NÃO INDEX = consulta Firecrawl sem resultado específico (não significa HTTP 404); SEC = fonte secundária com data/local compatíveis; OFICIAL = agenda/página da própria casa consultada; GUIA = página agregadora; CONFLITO = contradição que exige revisão; QUARENTENA = excluído da listagem. Em todos os casos, **status editorial continua não verificado**. Os links de fonte são os cadastrados; se o link é genérico, a coluna abaixo o informa.

| # | Data | Evento / casa | Fonte no catálogo | Evidência / ação |
|---:|---|---|---|---|
| 1 | 2026-10-29 21:00 | BOILER DECK #37 · Bar do Espartano | [evt-a35373c81ac5](https://www.pensanoevento.com.br/eventos/111987/boiler-deck-37) | **WEB** · página correspondente achada em busca complementar; sem revisão de direitos |
| 2 | 2026-10-30 21:00 | POP HITZ · Bar do Espartano | [evt-54c9de57c44b](https://www.pensanoevento.com.br/eventos/108694/pop-hitz) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 3 | 2026-10-31 21:00 | BAILA · Bar do Espartano | [evt-10d554498659](https://www.pensanoevento.com.br/eventos/108699/baila) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 4 | 2026-11-01 21:00 | HYPE — Ed. Especial Elite · Bar do Espartano | [evt-d39809f47b90](https://www.pensanoevento.com.br/eventos/110488/hype-ed-especial-elite) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 5 | 2026-11-05 21:00 | INFERNINHO · Bar do Espartano | [evt-7486ca6d39b6](https://www.pensanoevento.com.br/eventos/110916/inferninho) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 6 | 2026-11-06 21:00 | TRIPPY ANOS 2000 · Bar do Espartano | [evt-9d90a0eb82b0](https://www.pensanoevento.com.br/espartanofloripa) | **GUIA** · perfil de casa, não link individual; título não localizado na programação indexada |
| 7 | 2026-11-07 21:00 | HYPE · Bar do Espartano | [evt-4ff37533bed9](https://www.pensanoevento.com.br/eventos/110927/hype) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 8 | 2026-11-12 21:00 | BALANCE · Bar do Espartano | [evt-a8db01615de1](https://www.pensanoevento.com.br/eventos/110917/balance) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 9 | 2026-11-13 21:00 | BAILE DO OLIMPO · Bar do Espartano | [evt-82ff8748a60e](https://www.pensanoevento.com.br/eventos/110921/baile-do-olimpo) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 10 | 2026-11-14 21:00 | NA ONDA convida: atração a confirmar · Bar do Espartano | [evt-362d49fca53d](https://www.pensanoevento.com.br/eventos/108084/na-onda-convida-rj) | **CONFLITO** · página atual chama-se BACKWASH; título antigo; [referência atual](https://www.pensanoevento.com.br/eventos/108084/backwash-2016-vs-2026) |
| 11 | 2026-11-20 21:00 | HYPE · Bar do Espartano | [evt-7495d9df5930](https://www.pensanoevento.com.br/eventos/110922/hype) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 12 | 2026-11-21 21:00 | DJ vs DECK · Bar do Espartano | [evt-4e523a3e1344](https://www.pensanoevento.com.br/eventos/110924/dj-vs-deck) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 13 | 2026-11-26 21:00 | CLOSE FRIENDS · Bar do Espartano | [evt-d1212145d4ed](https://www.pensanoevento.com.br/eventos/110919/close-friends) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 14 | 2026-11-27 21:00 | BAILE DO OLIMPO · Bar do Espartano | [evt-824adfa07292](https://www.pensanoevento.com.br/eventos/110923/baile-do-olimpo) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 15 | 2026-11-28 21:00 | POP HITZ · Bar do Espartano | [evt-b8f5589b5bf2](https://www.pensanoevento.com.br/eventos/110925/pop-hitz) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 16 | 2026-10-27 21:00 | Brow Malaquias e Felipe Pansolin — Os Folgados · Floripa Comedy Club | [evt-860906acdacb](https://www.pensanoevento.com.br/eventos/108712/brow-malaquias-e-felipe-pansolin-os-folgados-21h) | **NÃO INDEX** · checar página antiga e diferença entre horário da abertura/show |
| 17 | 2026-10-28 21:00 | Luã Lima — Devaneios de um Manezinho · Floripa Comedy Club | [evt-8cb45e74aaa8](https://www.pensanoevento.com.br/eventos/109308/lua-lima-devaneios-de-um-manezinho-21h) | **NÃO INDEX** · checar página antiga e diferença entre horário da abertura/show |
| 18 | 2026-10-29 19:00 | Daniel Duncan · Floripa Comedy Club | [evt-3ebafd721fc1](https://www.pensanoevento.com.br/eventos/107475/daniel-duncan-21h) | **NÃO INDEX** · checar página antiga e diferença entre horário da abertura/show |
| 19 | 2026-10-30 21:00 | Fábio Güere — Inutilidade Pública · Floripa Comedy Club | [evt-5eb7218d6443](https://www.pensanoevento.com.br/eventos/107476/fabio-guere-panico-inutilidade-publica-21h) | **NÃO INDEX** · checar página antiga e diferença entre horário da abertura/show |
| 20 | 2026-10-31 21:00 | Cícero Viana — Aqui Tem Preparo! · Floripa Comedy Club | [evt-af92d277b7ec](https://www.pensanoevento.com.br/eventos/107477/cicero-viana-aqui-tem-preparo-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 21 | 2026-11-01 21:00 | Nathi Gaiteira — Amor, Humor e Modão · Floripa Comedy Club | [evt-37afcce322db](https://www.pensanoevento.com.br/eventos/109171/nathi-gaiteira-amor-humor-e-modao-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 22 | 2026-11-03 21:00 | Humor & Huana — Bob Rodrigues · Floripa Comedy Club | [evt-401f1a110051](https://www.pensanoevento.com.br/eventos/110727/humor-huana-reducao-de-danos-com-bob-rodrigues-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 23 | 2026-11-04 21:00 | Arianna Nutt — De Repente 40 · Floripa Comedy Club | [evt-76f759a2b51c](https://www.pensanoevento.com.br/eventos/109494/arianna-nutt-de-repente-40-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 24 | 2026-11-05 21:00 | Festival Open Mic · Floripa Comedy Club | [evt-56db956570ff](https://www.pensanoevento.com.br/eventos/111512/festival-open-mic-o-melhor-voce-escolhe-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 25 | 2026-11-06 21:00 | Irineu Nicoletti — Meio Tanso · Floripa Comedy Club | [evt-59cedc637478](https://www.pensanoevento.com.br/eventos/109496/irineu-nicoletti-meio-tanso-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 26 | 2026-11-07 21:00 | Marcio Donato (4 Amigos) · Floripa Comedy Club | [evt-b8678d2f037d](https://www.pensanoevento.com.br/eventos/105680/marcio-donato-4-amigos-21h) | **INDEX** · título compatível no índice; data, horário, alterações e direitos ainda exigem revisão |
| 27 | 2026-11-13 22:00 | MUNDO M · Stage Music Park | [evt-628f76d5f85e](https://www.pensanoevento.com.br/eventos/109366/mundo-m-florianopolis) | **CONFLITO** · Pensa: Stage; [operador: Indoor](https://musicpark.com.br/agenda/) |
| 28 | 2026-11-14 (sem hora) | Armandinho e Vitor Kley — Encontro de Gigantes · Stage Music Park | [evt-68c009490966](https://musicpark.com.br/agenda/) | **OFICIAL** · dia/casa anunciados na agenda; horário individual ausente |
| 29 | 2026-11-14 (sem hora) | Blancah (long set) · Terraza Music Park | [evt-28f829da39c2](https://musicpark.com.br/agenda/) | **OFICIAL** · dia/casa anunciados na agenda; horário individual ausente |
| 30 | 2026-11-10 18:30 | O Céu da Língua — Gregorio Duvivier · Teatro Ademir Rosa | [evt-a2fa2c2379b5](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10; existe outra sessão no mesmo dia |
| 31 | 2026-11-11 18:30 | O Céu da Língua — Gregorio Duvivier · Teatro Ademir Rosa | [evt-d6de7aa71729](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10; existe outra sessão no mesmo dia |
| 32 | 2026-11-12 18:30 | O Céu da Língua — Gregorio Duvivier · Teatro Ademir Rosa | [evt-86de8aca90b1](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10; existe outra sessão no mesmo dia |
| 33 | 2026-11-13 19:00 | Pele Negra, Justiça Branca · Cinema Gilberto Gerlach | [evt-b8aa6b37dcc2](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 34 | 2026-11-13 21:00 | Viver é Melhor que Sonhar: Belchior · Teatro Ademir Rosa | [evt-fa30d5d7081c](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 35 | 2026-11-14 19:30 | Minha Última Carta de Amor · MIS/SC | [evt-4c4ed12fddd7](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 36 | 2026-11-19 20:00 | Ritmos Brasileiros do Norte ao Sul · Teatro Pedro Ivo | [evt-1b056db0cbb9](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 37 | 2026-11-20 (sem hora) | Dois de Nós · Teatro Ademir Rosa | [evt-ada5cbfbfcde](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10; hora não informada |
| 38 | 2026-11-21 (sem hora) | Dois de Nós · Teatro Ademir Rosa | [evt-61b491eb7c76](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10; hora não informada |
| 39 | 2026-11-22 (sem hora) | Dois de Nós · Teatro Ademir Rosa | [evt-697e839c07b7](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10; hora não informada |
| 40 | 2026-11-21 18:30 | A Dança das Flores · Teatro Pedro Ivo | [evt-de4c14b00bd8](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 41 | 2026-11-26 20:00 | Música em Cena — Associação Coral de Florianópolis · Teatro Álvaro de Carvalho | [evt-7c83d7b8a97e](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 42 | 2026-11-28 18:30 | O Pequeno Príncipe e o Presente dos Céus · Teatro Pedro Ivo | [evt-9a01a5e083e8](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 43 | 2026-11-28 21:00 | Roxette UK — The Tribute Show · Teatro Ademir Rosa | [evt-1546dcd99ecd](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) | **SEC** · dia/local compatíveis com matéria de 15/10 |
| 44 | 2026-10-30 18:00 | Folianópolis 2026 — abertura · Passarela Nego Quirido | [evt-ebb62fc37d0b](https://guiafloripa.com.br/agenda?cmbCategory=shows) | **SEC** · edição/dia na [página específica](https://guiafloripa.com.br/agenda/shows/folianopolis-2026-leo-santana-e-o-tchan-timbalada-e-mais.php); abertura 18h/19h ambígua |
| 45 | 2026-10-31 (sem hora) | Folianópolis 2026 — segundo dia · Passarela Nego Quirido | [evt-4a29531bb042](https://guiafloripa.com.br/agenda?cmbCategory=shows) | **SEC** · edição/dia na [página específica](https://guiafloripa.com.br/agenda/shows/folianopolis-2026-leo-santana-e-o-tchan-timbalada-e-mais.php) |
| 46 | 2026-11-01 (sem hora) | Folianópolis 2026 — encerramento · Passarela Nego Quirido | [evt-252e05950d25](https://guiafloripa.com.br/agenda?cmbCategory=shows) | **SEC** · edição/dia na [página específica](https://guiafloripa.com.br/agenda/shows/folianopolis-2026-leo-santana-e-o-tchan-timbalada-e-mais.php) |
| 47 | 2026-10-30 20:00 | Abruna — pop, rock e R&B · Delfino 146 | [evt-9980b1fd85a8](https://guiafloripa.com.br/agenda/Shows/) | **GUIA** · link agregado; falta página específica |
| 48 | 2026-10-31 20:00 | Halloween: Skrotes + OSSCA — Nosferatu · Teatro Ademir Rosa | [evt-8eade7ba7bfe](https://tocaonde.com.br/guides/halloween-2026-florianopolis) | **SEC** · guia de Halloween nomeia casa e evento em 31/10; buscar fonte primária |
| 49 | 2026-10-31 21:00 | Halloween com Blockbusters · Balbúrdia Florianópolis | [evt-32fc50b56d0e](https://tocaonde.com.br/guides/halloween-2026-florianopolis) | **SEC** · guia de Halloween nomeia casa e evento em 31/10; buscar fonte primária |
| 50 | 2026-11-01 14:00 | N.N.P — Jessica Brankka e Miss Natalia · P12 Jurerê | [evt-e2c338dd3749](https://www.eventoon.com.br/cidade/florianopolis-sc) | **GUIA** · catálogo de cidade, não evento específico; necessita origem primária |
| 51 | 2026-11-06 20:00 | Show de Fresno · Local a confirmar | [evt-d13a03ca392e](https://emfloripa.ia.br/agenda/) | **QUARENTENA** · local não comprovado; manter fora da agenda |
| 52 | 2026-11-07 10:00 | 3º Festival Cultural Chinês de SC · Local a confirmar | [evt-aad7b4c02ecb](https://emfloripa.ia.br/agenda/) | **QUARENTENA** · local não comprovado; manter fora da agenda |
| 53 | 2026-11-07 10:00 | Haru Matsuri — 4ª edição · Local a confirmar | [evt-7ad7b0fc7589](https://emfloripa.ia.br/agenda/) | **QUARENTENA** · local não comprovado; manter fora da agenda |
| 54 | 2026-11-13 12:00 | Feira de Cerâmica · Local a confirmar | [evt-fb254317e98a](https://emfloripa.ia.br/agenda/) | **QUARENTENA** · local não comprovado; manter fora da agenda |
| 55 | 2026-11-13 10:00 | Ponte de Palavras — encontro literário · Local a confirmar | [evt-368fb60b6ca1](https://emfloripa.ia.br/agenda/) | **QUARENTENA** · local não comprovado; manter fora da agenda |
| 56 | 2026-11-01 23:00 | Halloween — Festa à Fantasia (Open Bar) · UNDR Florianópolis | [evt-579a08463320](https://undr.com.br/eventos/halloween-festa-a-fantasia-open-bar-2/) | **OFICIAL** · página específica confirma 01/11/2026 às 23h e endereço em Adolfo Konder |

## 4. Inventário geográfico dos 14 locais já citados

Todos os 14 estão agora identificáveis pelo nome no registro, mas isso **não** significa precisão GPS, revisão integral da casa ou data de evento confirmada. Endereços de complexo (CIC e Music Park) não são entradas individuais. Dúvidas de numeração ficam explícitas.

| Local | Ocorrências | Endereço registrado / ressalva | Evidência |
|---|---:|---|---|
| Bar do Espartano | 15 | Av. das Rendeiras, 1098 - Lagoa da Conceição, Florianópolis - SC (sem coordenada exata) | [Fonte](https://www.pensanoevento.com.br/locais/867/bar-do-espartano-florianopolis) |
| Floripa Comedy Club | 11 | Square SC, Rod. José Carlos Daux, 5500, Loja 18, Saco Grande, Florianópolis - SC (sem coordenada exata) | [Fonte](https://squaresc.com.br/empresa/floripa-comedy-club/) |
| Stage Music Park | 2 | Rodovia Jornalista Maurício Sirotski Sobrinho, 1050 - Jurerê, Florianópolis - SC (sem coordenada exata) | [Fonte](https://musicpark.com.br/agenda/) |
| Terraza Music Park | 1 | Rodovia Jornalista Maurício Sirotski Sobrinho, 1050 - Jurerê, Florianópolis - SC (sem coordenada exata) | [Fonte](https://terrazamusicpark.com.br/) |
| Teatro Ademir Rosa | 9 | Endereço de entrada pendente | [Fonte](https://www.mostradecinemainfantil.com.br/feriadao-do-dia-das-criancas-mostra-ira-exibir-filmes-premiados-e-historias-para-toda-a-familia/) |
| Cinema Gilberto Gerlach | 1 | Endereço de entrada pendente | [Fonte](https://www.mostradecinemainfantil.com.br/feriadao-do-dia-das-criancas-mostra-ira-exibir-filmes-premiados-e-historias-para-toda-a-familia/) |
| MIS/SC | 1 | Centro Integrado de Cultura, Av. Gov. Irineu Bornhausen, 5600 - Agronômica, Florianópolis - SC (sem coordenada exata) | [Fonte](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) |
| Teatro Pedro Ivo | 3 | Rodovia SC-401, km 15, 4600 - Saco Grande, Florianópolis - SC (sem coordenada exata) | [Fonte](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) |
| Teatro Álvaro de Carvalho | 1 | Rua Marechal Guilherme, 26 - Centro, Florianópolis - SC (sem coordenada exata) | [Fonte](https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026) |
| Passarela Nego Quirido | 3 | Endereço de entrada pendente | [Fonte](https://www.pmf.sc.gov.br/entidades/cultura/index.php?cms=passarela+nego+quirido&menu=9&submenuid=2107) |
| Delfino 146 | 1 | Rua Luís Delfino, 146 - Centro, Florianópolis - SC (sem coordenada exata) | [Fonte](https://delfino146.com.br/) |
| Balbúrdia Florianópolis | 1 | Rua Almirante Lamego, 425 - Centro, Florianópolis - SC (sem coordenada exata) | [Fonte](https://www.pensanoevento.com.br/locais/1790/balburdia-cervejeira-florianopolis) |
| P12 Jurerê | 1 | Jurerê Internacional - Florianópolis - SC (sem coordenada exata) | [Fonte](https://parador12.com.br/) |
| UNDR Florianópolis | 1 | Alameda Adolfo Konder, 1007 - Centro, Florianópolis - SC (sem coordenada exata) | [Fonte](https://undr.com.br/eventos/halloween-festa-a-fantasia-open-bar-2/) |

**Pendências geográficas específicas:** Passarela Nego Quirido (fontes divergentes sobre logradouro/número), P12 (site oficial confirma Jurerê Internacional sem número de acesso); Stage x Indoor da festa MUNDO M; faltam geocodificações auditadas. A única coordenada pré-existente corresponde ao **Square SC**, não à porta do Floripa Comedy Club. O mapa de calor exige também evidência de público/capacidade separada, conforme ADR-029 a ADR-032; **não atribuir capacidades por similaridade entre salas**.

## 5. Nove casas novas incluídas no cadastro de pesquisa

**Incluídas em `data/venues.json` como locais identificados, não como novos eventos nem pins exatos.** A inclusão de metadados públicos de um estabelecimento não autoriza scraping recorrente de sua programação ou reprodução de suas fotos. As fontes abaixo foram inspecionadas individualmente quando acessíveis; buscas indexadas foram usadas onde a rede não permitiu abrir redes sociais.

| Casa | Bairro | Endereço divulgado | Evidência |
|---|---|---|---|
| Célula Showcase | João Paulo | Rodovia João Paulo, 75 - João Paulo, Florianópolis - SC | [Fonte principal](https://www.instagram.com/celulashowcase/) · [Complementar](https://shotgun.live/en/events/13-11-sex-emocionados-a-festa-emo-da-celula) |
| ETC. Casa de Vinhos e Artes | Rio Tavares | Servidão Amantino Cameu, 500, casa A - Pedrita/Rio Tavares, Florianópolis - SC | [Fonte principal](https://www.instagram.com/p/DRhhjekjTNH/) · [Complementar](https://uticket.com.br/evento/etc-apresenta-naquela-mesa/01LYFEZD4HPSRH) |
| Chopp do Gus | Córrego Grande | Rua João Pio Duarte Silva, 1650 - Córrego Grande, Florianópolis - SC | [Fonte principal](https://choppdogus.com.br/) · [Complementar](https://tocaonde.com.br/venues/128579-chopp-do-gus-florianopolis) |
| John Bull Floripa | Lagoa da Conceição | Av. das Rendeiras, 1046 - Lagoa da Conceição, Florianópolis - SC | [Fonte principal](https://johnbullfloripa.com.br/) |
| Bugio Centro | Centro | Rua Victor Meirelles, 112 - Centro Histórico, Florianópolis - SC | [Fonte principal](https://www.cervejariabugio.com.br/) · [Complementar](https://cidadecriativa.floripa.br/servicos/bugio-centro-floripa-unesco/) |
| Bugio Trindade | Trindade | Servidão Cristiano Wanderley Faria, 25 - Trindade, Florianópolis - SC | [Fonte principal](https://www.cervejariabugio.com.br/) |
| Berlin Floripa | Centro | Rua Vítor Konder, 409 - Centro, Florianópolis - SC | [Fonte principal](https://berlinfloripa.com.br/) |
| Galeria Lama | Centro | Calçadão João Pinto, 198 - Centro, Florianópolis - SC | [Fonte principal](https://www.galerialama.com.br/) · [Complementar](https://www.galerialama.com.br/about-1) |
| Franz Cabaret | Centro | Rua Cristóvão Nunes Pires, 84 - Centro, Florianópolis - SC | [Fonte principal](https://www.franzcabaret.com/) |

**Cobertura de estilos:** rock/alternativo (Célula, Chopp do Gus, John Bull), vinho/arte (ETC), música e cultura de centro (Bugio Centro, Berlin, Galeria Lama, Franz), programação na Trindade (Bugio Trindade). Outros espaços identificados durante o discovery, como a Casa de Noca, exigem esclarecimento de endereço/operador atual antes de cadastro. Não houve contato externo.

## 6. Novas fontes a explorar (somente se permitido)

- Célula: https://www.instagram.com/celulashowcase/ (o Firecrawl não consegue raspar diretamente Instagram; pesquisa por índice público retornou endereço). Exemplo de evento de casa: https://shotgun.live/en/events/13-11-sex-emocionados-a-festa-emo-da-celula ; requer revisão de data/direitos antes de inserir no `events.json`.
- ETC: https://www.instagram.com/etceteracasa/ e https://uticket.com.br/evento/etc-apresenta-naquela-mesa/01LYFEZD4HPSRH ; validar agenda individual, sem inventar horários.
- Chopp do Gus: https://choppdogus.com.br/ e https://tocaonde.com.br/venues/128579-chopp-do-gus-florianopolis ; a casa mostra histórico de apresentações e evento na semana; não copiar fotos nem assumir coleta autorizada.
- John Bull, Berlin, Galeria Lama, Bugio Centro/Trindade, Franz: páginas oficiais já apontadas no cadastro. Avaliar existência de feed e termos antes de eventual uso de atualizações automáticas.

## 7. Critérios para a próxima rodada editorial

1. Para cada uma das 56 ocorrências, registrar **fonte individual do organizador**, data/hora do evento (diferente da abertura), endereço/parte do complexo, data da verificação, status de cancelamento e evidência de direitos quando houver mídia. Não promover `status: verified` a partir de uma consulta indexada, matéria agregada ou HTTP 200.
2. Corrigir primeiro os dois conflitos em destaque e a referência genérica do TRIPPY; depois quatro URLs de shows antigos sem indexação atual, demais páginas genéricas e eventos sem horário. Revisar datas vencidas sem apagar histórico automaticamente.
3. Geocodificar individualmente a entrada apenas por evidência verificável (placa/maps oficial/serviço autorizado). Nunca gerar latitude/longitude a partir do endereço pela IA. Até então, deixar sem coordenadas e usar centro regional apenas quando devidamente identificado como aproximado.
4. **Permissões de uso:** não raspar Sympla; para Pensa no Evento, Shotgun e outras bilheterias, distinguir pesquisa pontual de ingestão recorrente, que exige análise de termos/licença e decisão operacional. Informações públicas podem ser usadas como evidência editorial, não como licença de replicação de conteúdo.
5. Executar testes de localização/validação e CI; conferir que novas casas sem eventos **não aparecem inventadas** no mapa e que nenhuma capacidade ou estimativa de público foi importada sem fonte.

**Resultado deste ciclo:** inventário das 56 ocorrências e dos 14 locais, registro de 9 novas casas e lista de discrepâncias; auditoria editorial exaustiva de datas, alterações, licenças e autorizações de ingestão **não concluída**. Esta é uma entrega de pesquisa, não aceite de publicação beta.

## 8. Verificação de persistência e testes (03/11/2026)
- O inventário `data/venues.json` (23 entradas), as asserções em `scripts/test-venue-location.cjs` e este relatório foram gravados e **relidos** na `main`.
- GitHub Actions [run 41580131613](https://github.com/archersland/partiufloripa/actions/runs/41580131613), commit `6a17575af0ad9d7e40f91508193207ccd268cbf0`: `completed/success` após a inclusão de locais, relatório e documentação de origem. Isso demonstra a execução dos checks técnicos e do workflow, **não** valida endereço de entrada, realidade de eventos, permissão de coleta nem aceite de beta.
- Ainda não foram coletados pontos de entrada geográfica exatos, nem feitas revisões editoriais humanas individuais dos 56 eventos. Não realizar migração ou publicação de cartazes sem evidência de direitos.
