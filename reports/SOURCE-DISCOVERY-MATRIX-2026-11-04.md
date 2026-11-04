# PartiuFloripa — Matriz de fontes, permissões e divergências v0.3

**Tipo:** relatório de descoberta (não ADR / não homologado)  
**Verificação:** 04/11/2026, consulta pública pontual  
**Escopo:** fontes de agenda, bilheterias, direitos de reutilização e candidatos à revisão editorial  
**Decisão preservada:** ADR-006 / ADR-014 / ADR-016 / ADR-017; não habilitar scraping, importação em lote ou republicação de imagens sem autorização.

## TL;DR
- A descoberta de um anúncio é diferente do direito de obtê-lo automaticamente, republicá-lo ou reutilizar imagem.
- Nenhuma plataforma desta matriz tem **coleta automatizada geral liberada** para o PartiuFloripa.
- Priorizar **organizador/casa oficial para confirmação** e usar agregadores como *sinais de descoberta*, sem repassar seu conteúdo como se fosse fonte primária.
- Saravá 2026 é candidato com boa evidência primária; Réveillon Lumière vs. Lua Nova permanece **divergente** e não deve ser publicado como evento confirmado sem reconciliação.
- Não houve execução de scraper, contato com terceiros, mudança em `events.json`, autorização comercial ou publicação.

## Vocabulário de autorização
- **Descoberta manual / pesquisa pública:** consulta pontual para encontrar páginas e verificar fatos; não transfere direitos de reutilização.
- **Revisão editorial individual:** apurar data, local, fonte e identidade de um evento; publicação exige os gates editoriais existentes.
- **Integração autorizada:** API, feed ou importação com contrato, escopo, titular e evidência de direitos compatíveis.
- **Bloqueada:** qualquer extração automatizada contrária a termos ou sem autorização quando exigida. Não presumir permissão por `robots.txt` ou HTTP 200.
- **Não verificada:** nenhuma licença geral identificada; **não** equivale a permissão.

## Matriz principal
| Origem | Papel / cobertura | Pesquisa pontual | Coleta automatizada / API | Republicação de imagens e descrições | Evidência / próxima verificação |
|---|---|---|---|---|---|
| **Sympla** | Bilheteria multiorganizador, alta relevância | Usar páginas públicas para avaliação humana, sem scraping | **BLOQUEADO** crawler/mineração automatizada sem autorização **expressa por escrito**, conforme 19.3; API própria tem regras e dados de eventos criados pelo usuário | Não autorizada por esta pesquisa | [Termos 19.3](https://termos-e-politicas.sympla.com.br/hc/pt-br/articles/360048945451-Vers%C3%A3o-Completa) / [API](https://termos-e-politicas.sympla.com.br/hc/pt-br/articles/360031078691-Introdu%C3%A7%C3%A3o) |
| **Shotgun** | Festivais, música, baladas; caso Saravá | Página pública de eventos pode ser conferida editorialmente | [API para produtores](https://support-pro.shotgun.live/hc/pt-br/articles/33561354477970-Encontre-seu-ID-de-produtor-e-token-de-API) precisa ID/token do produtor. **Não** dá acesso autorizado ao catálogo de terceiros | Não presumir licença de materiais de produtor; revisar termos | [Doc oficial API](https://support-pro.shotgun.live/hc/pt-br/articles/33561354477970-Encontre-seu-ID-de-produtor-e-token-de-API) |
| **PensaNoEvento** | Eventos e casas regionais, boa relevância | Página de eventos, com checagem do produtor | **NÃO VERIFICADA** licença de coleta para agregador; termos vedam robôs para comprar/burlar fila e não concedem licença de redistribuição | Termos dizem que imagens/textos dos eventos pertencem aos produtores | [Termos 23/10/2026](https://www.pensanoevento.com.br/termos-de-uso); confrontar com a política legada e direitos por evento |
| **Zig Tickets** | Bilheteria importante para eventos no Santo Lua | Páginas públicas, sujeito a verificação | **NÃO VERIFICADA** API/integração geral; não generalizar termos de subdomínios white-label a todos | Termos da instalação consultada atribuem conteúdo do evento ao organizador, sem licença para terceiros | [Exemplo Lua Nova](https://zig.tickets/pt-BR/evento/reveillon-lua-nova-2027-florianopolis); [termos de uma instalação Zig](https://marketplace-checkoutv2.zig.tickets/paginas/termos) — escopo específico |
| **UTicket** | Bilheteria geral, filtro de cidade | [Portal](https://uticket.com.br/) público | **NÃO VERIFICADA** política para importação/API. Política de privacidade não equivale à licença de conteúdo | Não presumir | [Portal](https://uticket.com.br/) / [ajuda](https://uticket.com.br/ajuda) / [privacidade](https://www.uticket.com.br/privacy); investigar termos específicos |
| **LivePass** | Shows nacionais e eventos grandes; cidade pode não refletir páginas individuais | Consultas manuais | **NÃO VERIFICADA** API/feed de catálogo ou licença de agregação | Sem autorização identificada; organizador é responsável por programação | [Termos](https://www.livepass.com.br/en/help/terms/) |
| **Blueticket** | Bilheteria com presença forte em SC; shows, Carnaval e casas | [Listagem pública](https://www3.blueticket.com.br/) | **NÃO VERIFICADA** API/feed de terceiros | Sem licença identificada | [Portal](https://www3.blueticket.com.br/) / [central de ajuda](https://ajuda.blueticket.com.br/). No catálogo foram vistos Dino Fonseca em Florianópolis 15/01/2027 e Carnaval Floripa 2027; fatos a revalidar por evento |
| **Organizadores e casas oficiais** | Confirmação primária de identidade, adiamento, horário, cancelamento | Preferenciais na revisão editorial | Automação somente quando autorizada por fonte específica | Cartazes/fotos exigem licença individual | Ex. [organizador Saravá](https://linktr.ee/festivalsarava); registrar cada fonte separadamente |
| **Administração pública / agendas culturais** | Programação pública e gratuita; diversa da bilheteria | Verificação editorial na fonte oficial | Feed/dados abertos e licença **ainda a localizar**; domínio público governamental não é licença universal de fotografias | Auditar origem e licença de imagens | [Exemplo PMF / Fundação Franklin Cascaes](https://devportal.pmf.sc.gov.br/entidades/cultura/index.php?menu=0&noti=27736&pagina=notpagina) |
| **Ayon, Hoje Ali, events.lat, Guia Floripa, Bandsintown** | Sinais secundários para identificar eventos ou casas que faltam | Úteis como listas de candidatos, com atenção a cidade/data | **NÃO AUTORIZAR** coleta recorrente por inferência | Não transferir arte/texto sem direitos | Registrar URL sinalizadora e buscar organizador + bilheteria originais |

## Exemplos de revisão de evento

### SARA-2026 — Festival Saravá 2026 — candidato prioritário
- **Fonte primária de bilhetes:** https://shotgun.live/pt-br/festivals/festivalsarava2026
- **Canal público do organizador:** https://linktr.ee/festivalsarava
- **Indicadores fornecidos pela fonte:** 12 e 13/12/2026, Alcateia Park Campeche, Florianópolis; início sábado 16h; descrição informa programação de domingo iniciando às 15h e encerramento na madrugada seguinte. Conferir sessões individualmente antes de normalizar o JSON, para evitar marcar o evento inteiro como um único dia.
- **Avaliação:** sinal fortemente corroborado, não cadastrado. Não importar preços de ingressos (variáveis), artwork ou descrições promocionais sem revisão/licença. Situação de venda observada na página pública na pesquisa, **não garantida para data futura**.
- **Próximo gate:** revisão individual conforme ADR-016, endereço/precisão, status e termos de reutilização; não publicar automaticamente.

### NYE-SANTOLUA-2027 — Réveillon Lumière 2027 x Réveillon Lua Nova 2027
- **Ayon (secundário):** https://useayon.com/eventos/sc — lista `Réveillon Lumière 2027` em 31/12/2026 22h no Santo Lua, com indicação Shotgun.
- **Zig (bilheteria):** https://zig.tickets/pt-BR/evento/reveillon-lua-nova-2027-florianopolis — `Réveillon Lua Nova 2027`, 31/12/2026 22h–01/01/2027 05h no Santo Lua.
- **Outra corroboração:** https://ihoje.com/events/reveillon-lua-nova-2027-florianopolis-Bmn7flHzT0m7 atribui realização `Lua Nova & Trip To Deep`; https://zig.tickets/pt-BR/eventos/lua-nova-22-11 apresenta evento prévio de `Lua Nova × Trip to Deep`.
- **Histórico do nome Lumière:** https://roleentretenimento.com/agenda/lancamento-oficial-reveillon-lumiere-2027 mostra evento de lançamento em 12/09/2026 no mesmo Santo Lua.
- **Falha de agregação diagnosticável:** https://festscanner.com/en/event/reveillon-lumiere-cachoeira-do-bom-jesus-2027-01-01 tem título `Lua Nova` mas descrição `Lumière` e horário 01h de 01/01, demonstrando que páginas de terceiros podem misturar versões de um evento ou deslocar data por fuso. **Não inferir** que o agregador esteja correto.
- **O usuário relatou** erro 404 em ligação do Ayon à Shotgun; ainda não reproduzido por teste HTTP controlado com o URL exato; status de venda **não comprovado**.
- **Avaliação:** sinais de um evento com informações conflitantes, porém **não está comprovado** que Lumière foi renomeado/cancelado ou que sejam eventos idênticos. **Bloquear cadastro e publicação até conferência de fontes primárias**; se houver evento Lua Nova distinto validado, analisar individualmente, sem reaproveitar o Lumière.

### Catálogo local
Checagem textual em `events.json` em 03/11/2026 não encontrou os termos `Saravá`, `Lumière`, `Lua Nova` ou `Santo Lua`; isso não substitui busca por IDs/aliases e nem resolve eventual existência de registros correlatos sob outro nome. Nenhum registro criado.

## Fluxo editorial recomendado (não implementado)
1. **Pista de descoberta** (`signalSourceUrl`, fonte/horário observados).
2. **Identificar produtor e fonte primária** (`officialEventUrl`), separar URL editorial de bilheteria (`ticketUrl`).
3. **Normalizar com evidência**: nome, município, casa, data local, portas/início/fim, sessões, categoria; não presumir timezone ou localização exata.
4. **Deduplicar com ressalvas**: (produtor + local + data + atração), mantendo aliases e histórico; conflito de nome, horário ou URL vai para `needs_human_review`, nunca sobrescreve evento automaticamente.
5. **Validar o link e conteúdo**: sucesso HTTP ≠ evento correspondente; investigar redirect, 404/410, nome divergente, cancelamento e ticket esgotado sem inferir que evento cancelou.
6. **Direitos:** separar fatos resumidos de texto promocional/imagem; registrar autorização, titular e prova para reuso específico; usar arte neutra permitida se necessário.
7. **Revisão humana individual**, status editorial e publicação somente após gates existentes; após publicado, rechecagem periódica **somente** nos meios autorizados.
8. **Mudanças rastreáveis:** registrar `lastVerifiedAt`, fontes, campos alterados, evidência e motivo de exceção, sem inventar aprovação.

## Contrato proposto para um futuro cadastro de fontes (não criar banco neste trabalho)
`sourceId`, `displayName`, `role` (primary|ticketing|secondary), `host`, `allowedMethods`, `automationPermission` (blocked|unknown|explicitly_allowed), `permissionScope`, `permissionEvidenceUrl`, `termsCheckedAt`, `licenseTextImages`, `reviewOwner`, `frequencyLimit`, `provenanceNotes`.

**Gate mínimo para `explicitly_allowed`:** prova objetiva e aplicável ao fluxo em questão; nome/escopo do titular dos direitos, finalidade, dados permitidos, volume e requisitos de atribuição; ausência de proibição **não basta**.

## Plano enxuto para próxima rodada
- [ ] Verificar termos técnicos de Blueticket e UTicket, com URLs canônicas e limites exatos.
- [ ] Localizar fontes públicas de cultura de Floripa com feed/API e licença de republicação claros.
- [ ] Revisar Saravá por sessão e preencher ficha editorial **sem publicação**.
- [ ] Rastrear, nas páginas oficiais acessíveis, a evolução do nome Lumière/Lua Nova e confirmar o link exato que quebrou; conflito não resolvido permanece fora do catálogo.
- [ ] Validar 5–10 amostras de eventos com cidade+data+categoria em fontes distintas para medir lacunas do catálogo, sem coletar material protegido.
- [ ] Apresentar ao Cliente eventual escolha de método/abertura de escopo; esta pesquisa não aprova lançamento nem a coleta.

**Verificação de engenharia:** alteração exclusivamente documental. Scripts de eventos, lint e QA de navegador **não aplicáveis** a este relatório; nenhuma implementação ou deploy do portal declarados.
