# Pesquisa de agendas e imagens reais — base por locais

**Data da consulta:** 03/11/2026 (America/Sao_Paulo). **Estado:** pesquisa exploratória; não configura importação, licença de imagem, autorização de scraping, sincronização, evento verificado ou QA. **Base:** 39 locais em `data/venues.json`, 56 registros em `events.json`, 14 mídias de casa **genéricas** em `data/venue-media.json`. Fotos específicas de casa aprovadas no cadastro atual: **0**.

## Correção de hierarquia
- **Music Park (novo pai):** Stage, Terraza, Posh, Indoor, Garden. https://musicpark.com.br/sobre/ ; agenda de operador: https://musicpark.com.br/agenda/ . O evento `evt-628f76d5f85e` figura em Stage na bilheteria e em Indoor no site oficial: revisão antes de vincular.
- **CIC (novo pai):** Teatro Ademir Rosa, Cinema Gilberto Gerlach, MIS/SC, MASC. Fonte descritiva: https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 ; para agenda primária, buscar páginas individualizadas em https://cultura.sc.gov.br/programacao/ . Consulta automatizada a essa rota sofreu bloqueio de acesso nesta investigação; não contornar.

## Matriz dos 39 locais atuais
**Legenda:** A = programação futura datada localizada em fonte oficial/institucional ou perfil de casa; B = programação datada localizada apenas em fonte secundária/ingressos ou listagem parcial; C = canal ou programação habitual localizado, mas não agenda futura específica demonstrada; D = fonte de agenda futura não identificada nesta rodada. Todos mantêm **permissão de coleta não verificada**.

| ID local | Casa | Grau | Fonte ou próximo alvo | Observação |
|---|---|:--:|---|---|
| floripa-comedy-club | Floripa Comedy Club | A | https://www.pensanoevento.com.br/floripacomedyclub/ | Grade datada; abertura e início do show diferem |
| teatro-ademir-rosa | Teatro Ademir Rosa | A | https://cultura.sc.gov.br/programacao/ | Agenda FCC documentada por página institucional reproduzida, checagem individual necessária |
| cinema-gilberto-gerlach | Cinema Gilberto Gerlach | B | https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 | Buscar item na programação FCC |
| bar-do-espartano | Bar do Espartano | A | https://www.pensanoevento.com.br/espartanofloripa | Evento de 14/11 mudou de nome; evitar duplicatas e misturar Espartano Surf House |
| stage-music-park | Stage Music Park | A | https://musicpark.com.br/agenda/ | Espaço filho do Music Park, não o complexo |
| terraza-music-park | Terraza Music Park | A | https://musicpark.com.br/agenda/ | Operador separa Stage/Indoor/Terraza |
| mis-sc | MIS/SC | B | https://cultura.sc.gov.br/programacao/ | Pertence ao CIC; filme de 14/11 em fonte secundária |
| teatro-pedro-ivo | Teatro Pedro Ivo | A | https://cultura.sc.gov.br/programacao/ | FCC divulga horários de sessões; ver origem por evento |
| teatro-alvaro-de-carvalho | Teatro Álvaro de Carvalho | A | https://cultura.sc.gov.br/programacao/ | TAC; FCC publica agenda |
| passarela-nego-quirido | Passarela Nego Quirido | C | https://guiafloripa.com.br/agenda?cmbCategory=shows | Local de eventos esporádicos; não foi identificada agenda contínua própria |
| delfino-146 | Delfino 146 | A | https://www.pensanoevento.com.br/delfino146 | Dezenas de apresentações datadas |
| balburdia-florianopolis | Balbúrdia Florianópolis | A | https://www.pensanoevento.com.br/balburdiafloripa | Conferir identidade contra filial específica |
| p12-jurere | P12 Jurerê | A | https://parador12.com.br/agenda-de-eventos/ | Agenda oficial inclui 2027 |
| undr-florianopolis | UNDR Florianópolis | C | https://undr.com.br/ | Site consta como fonte de evento legado; agenda completa não verificada nesta rodada |
| celula-showcase | Célula Showcase | A | https://linktr.ee/Celulashowcase | Vários links da própria casa para nov/dez; não tratar catálogo histórico inteiro como atual |
| etc-casa-de-vinhos | ETC. Casa de Vinhos e Artes | D | — | Sem agenda individual comprovada nesta rodada |
| chopp-do-gus-corrego-grande | Chopp do Gus | C | https://choppdogus.com.br/ | Programação regular descrita; histórico https://tocaonde.com.br/venues/128579-chopp-do-gus-florianopolis |
| john-bull-floripa | John Bull Floripa | B | https://johnbullfloripa.com.br/ ; https://rolezin.co/local/john-bull-floripa | Casa oficial confirma shows; terceira parte lista eventos futuros; validar página individual |
| bugio-centro | Bugio Centro | C | https://cidadecriativa.floripa.br/servicos/bugio-centro-floripa-unesco/ | Programação habitual e Instagram @bugiocentro; buscar agenda primária |
| bugio-trindade | Bugio Trindade | D | — | Não reaproveitar agenda da filial Centro |
| berlin-floripa | Berlin Floripa | A | https://berlinfloripa.com.br/b/ | Agenda própria de nov; reserva externa |
| galeria-lama | Galeria Lama | B | https://www.galerialama.com.br/about-1 ; https://r.shotgun.live/pt-br/cities/florianopolis | Página própria diz “Agenda” mas não dá datas; Shotgun listou sessão 05/11 |
| franz-cabaret | Franz Cabaret | A | https://www.pensanoevento.com.br/locais/541/franz-cabaret | Programação nov/dez |
| no-class | No Class | A | https://www.pensanoevento.com.br/casas/394/no-class | Programação futura |
| boho-bar-pista | Bohô Bar & Pista | D | — | Procurar perfil da casa e bilheteria por nome exato |
| vodu-arte-bar | Vodu Arte Bar | D | — | Procurar perfil oficial e calendário |
| boteco-do-maicao-centro | Boteco do Maicão Centro | C | https://www.planetabrasileiro.com/boteco-do-maicao-centro-F1708C80613D242 | Perfil Instagram mencionado; sem fonte datada |
| teodoro-bar | Teodoro Bar | D | — | Sem fonte datada localizada |
| selva-bar-floripa | SELVA Bar Floripa | B | https://ihoje.com/local/florianopolis/selva-floripa | Programação datada; origem possivelmente Cheers/organizador |
| opium-bar | Opium Bar | B | https://www.pensanoevento.com.br/eventos/112702/electric-feel-4-anos | Bilheteria apresenta organizador Opium, não equivale a agenda completa |
| atelie-389 | Ateliê 389 | C | https://www.instagram.com/atelie389/ | Perfil citado por terceiros; não inferir calendário de posts |
| desgosto-bar | Desgosto Bar | B | https://www.bandsintown.com/pt/v/10305817-desgosto ; https://underfloripa.com.br/agenda/ploho/ | Calendário parcialmente datado |
| ori-boteco-centro | ORI Boteco Centro | C | https://www.oriboteco.com.br/ | Site de casa/funcionamento; agenda específica não comprovada |
| botequim-floripa | Botequim Floripa | C | https://roleentretenimento.com/locais/botequim-floripa-florianopolis | Registros históricos; não afirmar próximos eventos |
| scuna-bar-club | Scuna Bar Club | C | https://scunabar.com.br/ | Site anuncia “agenda semanal”, mas sem datas individuais no texto examinado |
| bar-do-noel | Bar do Noel | C | https://floripa.com/o-que-fazer/guia-para-curtir-samba-pagode-e-chorinho-em-floripa/ | Programação habitual; Instagram @bardonoelfloripa indicado por fonte secundária |
| boteco-do-alemao | Boteco do Alemão | D | — | Não confundir eventos próximos ao bar com eventos do bar |
| kibelandia-chopperia | Kibelândia Chopperia | D | — | Sem agenda individual comprovada nesta rodada |
| barra-co | Barra Cô Drinks e Shots | C | https://www.instagram.com/barra.co.fln/ | Perfil identificado por diretório de terceiros; datas não verificadas |

**Não rastreados ainda e relevantes para expandir:** Teatro Dionísio (agenda oficial https://teatrodionisio.com/ ; programação adicional por organizador https://feverup.com/pt/florianopolis/candlelight ); MASC como espaço do CIC; complexo Music Park com novos filhos. Não adicionar automaticamente sem auditoria de identidade/status.

## Imagens específicas de locais (pesquisa de direitos)
- **Teatro Ademir Rosa:** https://commons.wikimedia.org/wiki/File:Teatro_do_CIC_Ademir_Rosa_-_1.jpg — foto REAL do teatro, autor Ajmcbarreto, **CC BY-SA 4.0**; atribuição, link, transformação e share-alike a observar antes de processar/publicar.
- **Teatro Álvaro de Carvalho:** https://commons.wikimedia.org/wiki/File:Teatro_%C3%81lvaro_de_Carvalho,_Florian%C3%B3polis,_Brasil_.JPG — foto REAL do teatro, autor Eugenio Hansen, **CC BY-SA 3.0**; créditos/condições aplicáveis.
- **Complexo CIC:** https://commons.wikimedia.org/wiki/File:CentroIntegradoDeCultura.jpg — foto do complexo, autoria Rachmaninoff; verificar versão exata da licença na página do arquivo antes de uso.
- **Outros candidatos fotográficos:** fotos públicas do John Bull, Stage, Célula, Franz, Delfino etc. foram localizadas em sites de terceiros, mas **não foi estabelecida licença de reprodução**; não salvar essas imagens no repositório nem incorporar aos cards sem revisão/autorização. URLs de páginas de referência: https://johnbullfloripa.com.br/ , https://musicpark.com.br/sobre/ , https://www.guiadasemana.com.br/florianopolis/arte/estabelecimento/teatro-ademir-rosa-cic , https://sucessosa.com.br/noticia/franz-cabaret-estreia-na-cena-de-florianopolis .
- `data/venue-media.json` contém 14 fotos genéricas por casa, não retratos reais: corrigir linguagem da UI para que o usuário não as confunda com fachadas. A busca de mídia real deve criar `mediaStatus` individual (`candidate_unlicensed`, `license_verified`, `published`, etc.), evidência e créditos. Não contar imagem encontrada como imagem licenciada.

## Ordem de priorização
1. **Alta cobertura e pronta para curadoria:** Music Park (operador), P12, Berlin, FCC (com bloqueio automatizado), perfis das casas na Pensa, Célula via Linktree.
2. **Agenda detectada, metodologia pendente:** John Bull, SELVA, Opium, Desgosto, Galeria Lama.
3. **Prospecção documental ainda incompleta (sem contato):** demais bares e unidades, distinguir redes sociais/histórico de calendário futuro.
4. **Foto real:** priorizar arquivos CC com metadados claros; para demais casas procurar seção imprensa/galeria/licença explícita, ou manter ilustração neutra.

## Segurança e qualidade da coleta
- Prioridade: feed/API oficial autorizado > agenda HTML oficial sob termo permissivo > link fornecido pelo produtor > curadoria manual de página pública > Instagram apenas quando autorizado tecnicamente/juridicamente.
- Sympla sem scraping; robots.txt e HTTP 200 não implicam licença. Instagram público não implica autorização para raspagem.
- Registre por fonte `sourceUrl`, `entityId`, `evidenceCheckedAt`, `permissionStatus`, `ingestionMethod`, `reviewedBy` quando houver, `lastSuccessfulReadAt` e erro; **default-deny**.
- Cada ocorrência candidata exige página de evento específica, data, local comprovado, checagem de alterações, deduplicação por URL/ID do produtor; armazenar abertura e início separados.
- Não fazer ingestão, edição de eventos, automação recorrente, publicação de imagens ou contato externo nesta pesquisa.
