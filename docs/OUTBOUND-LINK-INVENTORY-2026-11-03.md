# Matriz passiva dos links de origem cadastrados — PartiuFloripa

**Snapshot:** 2026-11-03, `events.json@main` (56 registros/35 URLs/8 domínios), `data/venues.json@main` (39 casas sem campos `officialSite`/`website`).
**Estado:** inventário passivo **completo para o snapshot**, sem requisições HTTP aos destinos, verificação de página final, compatibilidade UTM/ref, confirmação de direito ou de comissionamento. **Não é lista aprovada de CTAs comerciais.**

## Critérios de classificação

- `ticketing_event_page_candidate`: URL de plataforma com caminho específico de evento; evento correto/status de ingresso ainda pendentes de conferência.
- `ticketing_venue_or_promoter_page_candidate`: perfil/portal da plataforma; não comprova entrada para um evento individual.
- `operator_generic_agenda`: agenda oficial aparente do operador, sem prova de destinação à sessão correta.
- `organizer_event_page_candidate`: página aparentemente própria do operador; requer conferência.
- `third_party_editorial_or_generic_agenda`: informação editorial, não é prova de tráfego à casa.

Identificadores de casa/ocorrência na lista são dados **editoriais da nossa base**, não credenciais nem IDs de parceiros. Uma fonte editorial NÃO deve ser convertida automaticamente em `outbound_url`.

## Inventário: 35 URLs distintas

| Origem registrada (URL, não necessariamente destino recomendado) | Ocorrências | Local(is) informado(s) | Tipo provisório |
| --- | ---: | --- | --- |
| https://emfloripa.ia.br/agenda/ | 5 | Local a confirmar | `unknown` |
| https://guiafloripa.com.br/agenda?cmbCategory=shows | 3 | Passarela Nego Quirido | `unknown` |
| https://guiafloripa.com.br/agenda/Shows/ | 1 | Delfino 146 | `unknown` |
| https://musicpark.com.br/agenda/ | 2 | Stage Music Park · Terraza Music Park | `unknown` |
| https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 | 14 | Teatro Ademir Rosa · Cinema Gilberto Gerlach · MIS/SC · Teatro Pedro Ivo · Teatro Álvaro de Carvalho | `unknown` |
| https://tocaonde.com.br/guides/halloween-2026-florianopolis | 2 | Teatro Ademir Rosa · Balbúrdia Florianópolis | `unknown` |
| https://undr.com.br/eventos/halloween-festa-a-fantasia-open-bar-2/ | 1 | UNDR Florianópolis | `unknown` |
| https://www.eventoon.com.br/cidade/florianopolis-sc | 1 | P12 Jurerê | `unknown` |
| https://www.pensanoevento.com.br/espartanofloripa | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/105680/marcio-donato-4-amigos-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/107475/daniel-duncan-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/107476/fabio-guere-panico-inutilidade-publica-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/107477/cicero-viana-aqui-tem-preparo-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/108084/na-onda-convida-rj | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/108694/pop-hitz | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/108699/baila | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/108712/brow-malaquias-e-felipe-pansolin-os-folgados-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/109171/nathi-gaiteira-amor-humor-e-modao-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/109308/lua-lima-devaneios-de-um-manezinho-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/109366/mundo-m-florianopolis | 1 | Stage Music Park | `unknown` |
| https://www.pensanoevento.com.br/eventos/109494/arianna-nutt-de-repente-40-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/109496/irineu-nicoletti-meio-tanso-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/110488/hype-ed-especial-elite | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110727/humor-huana-reducao-de-danos-com-bob-rodrigues-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/110916/inferninho | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110917/balance | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110919/close-friends | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110921/baile-do-olimpo | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110922/hype | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110923/baile-do-olimpo | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110924/dj-vs-deck | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110925/pop-hitz | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/110927/hype | 1 | Bar do Espartano | `unknown` |
| https://www.pensanoevento.com.br/eventos/111512/festival-open-mic-o-melhor-voce-escolhe-21h | 1 | Floripa Comedy Club | `unknown` |
| https://www.pensanoevento.com.br/eventos/111987/boiler-deck-37 | 1 | Bar do Espartano | `unknown` |

## Regras da próxima etapa

1. Verificar manualmente se o link aponta ao evento correto (há divergências editoriais documentadas em `SOURCES-AND-RIGHTS.md`). Não gerar `outbound_url` por transformação automática.
2. Registrar `event_id`, `venue_id` confiável, `editorial_source_url`, `official_outbound_url` **apenas se verificado**, evidência oficial, data, provedor, classe, parâmetros existentes, redirecionamentos, riscos e status de autorização.
3. Pesquisar mecanismos de atribuição do domínio correspondente: somente depois de validar termos e formato, considerar UTM; preservar códigos e assinaturas de terceiros.
4. Confirmar que abrir a página final funciona em navegação comum antes de considerar link parametrizado; **navegação íntegra não comprova que relatório de parceiro registrou nossa origem**.
5. Sem link oficial verificável, o CTA permanece de consulta à fonte editorial, nunca `Comprar ingresso` com promessa enganosa.
6. Nova publicação, alteração em eventos e implementação de tracking exigem gates técnicos e aprovação de publicação separados.

## Síntese para Growth B2B

- 26 páginas com caminho específico de evento na PensaNoEvento + 1 página de perfil na mesma plataforma = **27 ocorrências**.
- 1 URL de página de evento do operador UNDR = **1 ocorrência**.
- 2 ocorrências do Music Park usam a **mesma agenda genérica**, e 26 ocorrências adicionais referenciam mídias/agregadores/portais, totalizando **28 ocorrências sem link direto individual de bilheteria no campo source**.
- Não inferir nenhuma comissão, disponibilidade, visualização, clique ou conversão dessas contagens.

**Evidência:** leitura do repositório via conector GitHub em 2026-11-03; nenhum site de destino foi acessado para esta matriz.
