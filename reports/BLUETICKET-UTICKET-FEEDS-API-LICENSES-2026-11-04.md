# PartiuFloripa — Blueticket e UTicket: feeds, APIs e direitos (pesquisa v0.4)

- **Data de pesquisa:** 04/11/2026
- **Tipo:** evidência exploratória / relatório, **não** decisão de integração, licença concedida ou homologação
- **Escopo:** interfaces públicas de integração, termos públicos, responsabilidade sobre mídias e requisitos para reutilização pelo portal
- **Origem:** continuação do [inventário de fontes v0.3](SOURCE-DISCOVERY-MATRIX-2026-11-04.md) e da [Issue #7](https://github.com/archersland/partiufloripa/issues/7)
- **Regras herdadas:** ADR-006, ADR-014, ADR-016, ADR-017, `docs/SOURCES-AND-RIGHTS.md` (dados de terceiros, revisão individual, imagens licenciadas, sem scraping não autorizado)

## Veredito resumido
| Plataforma exata | Feed público documentado de eventos? | API de catálogo documentada para terceiros? | Termos/licença sobre coleta | Decisão operacional |
|---|---|---|---|---|
| **Blueticket (blueticket.com.br)** | **Não localizado** (não significa inexistente) | **Não localizada**. Há identificador público `soul-api.blueticket.com.br` com título «Blueticket SoulApi», mas sem documentação de catálogo, escopo ou licença verificados. | **Restrição EXPRESSA** a acesso automatizado e extração por scraping/crawling (12.1), uso comercial sem autorização prévia e escrita (12.1), reprodução comercial sem autorização (14.5); imagens e conteúdos de eventos pertencem aos organizadores/titulares (14.6). | **BLOQUEADO** para crawler ou integração de catálogo não autorizada. Só considerar integração com autorização escrita e direitos próprios dos organizadores. |
| **UTicket (uticket.com.br)** | **Não localizado** | **Não localizada** | Política de Privacidade recuperada **não** é licença de dados/eventos. Termos de Uso completos não recuperados por leitura pública desta pesquisa (SPA dependente de JS). | **DESCONHECIDO / NÃO LIBERADO** para automação e republicação; investigar termos e eventual contrato/feed específico, sem assumir permissão. |

## Blueticket — evidência oficial direta
1. [Termos de Uso da Plataforma Blueticket (Movidesk)](https://blueticket.movidesk.com/kb/article/146707/termos-de-uso-da-plataforma-blueticket): atualizados em **27/10/2026**, segundo cabeçalho exibido na página em 04/11/2026.
2. **Cláusula 12.1:** proíbe (i) robôs/scripts/qualquer meio automatizado para acessar plataforma ou comprar ingressos, (iii) extrair dados por scraping/crawling e (ix) uso comercial sem autorização prévia e escrita.
3. **Cláusulas 14.4–14.6:** proteção da plataforma, dos bancos e conteúdos próprios; licença limitada, pessoal e não transferível para uso pessoal; reprodução e uso comercial sujeitos a autorização escrita; marcas, imagens e conteúdos dos eventos pertencem aos organizadores ou titulares.
4. **Cláusula 11:** organizador é responsável por programação, local, horário e imagens; ticketing não equivale a fonte de direitos sobre material criativo.
5. [Página pública `soul-api.blueticket.com.br`](https://soul-api.blueticket.com.br/): resultado de pesquisa exibe apenas «Blueticket SoulApi»; **não foi feita enumeração de rotas, chamada autenticada ou inferência de endpoints**. Existência do endereço **não prova** API de evento acessível, publica nem licenciada.
6. [Aplicativo Blueticket Organizador](https://play.google.com/store/apps/details?id=br.com.blueticket.organizador): permite organizadores consultar indicadores e vendas; evidencia capacidade privada operacional, **não** API de conteúdo para terceiros.
7. **Falso positivo importante:** `bluetickets.app` é plataforma distinta de *tickets de suporte/helpdesk*, com endpoints próprios; não associá-la à bilheteria brasileira. [Documentação do homônimo](https://bluetickets.app/docs).

## UTicket — evidência e limitação
1. [Site UTicket](https://uticket.com.br/): catálogo público e busca por cidade, com publicação pelos organizadores, sem documentação de feed/API na superfície pública pesquisada.
2. [Central de Ajuda UTicket](https://uticket.com.br/ajuda): conteúdo público para consumidores/produtores; nesta pesquisa não foram identificados endpoints documentados de exportação pública ou API para agregadores.
3. [Política de Privacidade](https://uticket.com.br/privacy): diz que organizadores publicam e gerenciam eventos e inclui regras de tratamento de dados pessoais. **Não concede** licença comercial de extração/republicação do catálogo.
4. Tentativa de ler `https://uticket.com.br/terms` pelo navegador textual da pesquisa retornou apenas shell JavaScript; versões alternativas de rota não retornaram texto jurídico verificável. Consequentemente, **não foi possível confirmar por citação direta** cláusula de scraping, propriedade intelectual ou redistribuição dos termos completos da UTicket. Isso **não significa** ausência de restrição.
5. Busca textual na web por `site:uticket.com.br API`, `webhook`, `feed` e termos de integração não retornou documentação técnica pública verificável de catálogo. **Resultado negativo limitado ao universo indexado/consultado**; integração privada continua possível, mas não demonstrada.
6. **Falso positivo importante:** `uniticket.com.br` (UniTicket) é outro endereço e **seus termos não podem ser atribuídos** à UTicket.

## Matriz de permissões por operação
| Operação pretendida | Blueticket | UTicket |
|---|---|---|
| Usar resultados públicos **como pista editorial individual**, com conferência na fonte oficial | Pesquisa pontual, sem automação ou cópia de mídia | Pesquisa pontual, sem inferir licença de republicação |
| Ligar do PartiuFloripa para bilheteria oficial de evento conferido | Analisar URL e regras do evento; não é licença para copiar arte | Idem |
| Publicar título/data/local em descrição original, revisada individualmente | Verificar fonte primária e base jurídica/contratual específica; não copiar descrições completas | Idem, termos pendentes |
| Copiar cartaz/foto, identidade visual ou descrição promocional | **NÃO** sem autorização do titular; a própria Blueticket aponta para direitos do organizador | **NÃO** sem prova de titularidade/licença |
| Scraper recorrente / download em lote / API não documentada | **BLOQUEADO**: termos proíbem | **NÃO LIBERADO**: termos/escopo sem confirmação |
| Feed/API para plataforma agregadora com credenciais e autorização | Somente se a Blueticket fornecer autorização **escrita**, escopo e direito de redistribuir o conteúdo dos produtores | Somente com documentação/contrato/escopo verificáveis |

## Perguntas objetivas para possível autorização futura (**não contatar sem aprovação do Cliente**)
- A plataforma disponibiliza **feed, RSS, iCal, JSON de agenda ou API para agregadores**? Qual URL **documentada**, autenticação, limite, frequência e escopo (todos os eventos ou só os do organizador)?
- Um terceiro pode **exibir título, data, município, casa, categoria e link oficial**, em portal independente que não vende ingressos?
- Há possibilidade de publicar **thumbnail, cartaz, logo ou descrição**? Quem autoriza: plataforma, produtor, titular de imagem? Que atribuição e retenção são exigidas?
- O feed inclui **eventos atualizados/cancelados**, paginação, IDs estáveis e alterações? Quais limites e condições comerciais?
- A autorização escrita cobre **PartiuFloripa, uso público, eventual publicidade futura e casos de mudança de titularidade**? Não presumir parceria nem remuneração.

## Gates para a engenharia
- Nenhuma chave, API oculta, cookie, login ou endpoint não documentado foi explorado.
- Não houve crawling do catálogo, download de cartaz, submissão de formulário, contato ou tentativa de contornar o bloqueio.
- Proposta de integração fica **bloqueada** até evidência positiva de `automationPermission=explicitly_allowed`, com URL/contrato, escopo de eventos, finalidade, direitos de material, cota e revogação documentados.
- Registrar origens em modelo futuro de fontes, separando `sourceEditorial`, `sourceEventOfficial` e `ticketUrl`; não transformar pistas de agregador em origem primária.
- **Documentação apenas:** sem alteração em site, JSON ou fluxo; testes `validate-events`, CI e QA E2E não aplicáveis a este relatório. Criar arquivo no `main` não significa deploy ou aceite.

## Estado final
**Blueticket:** extração automatizada não autorizada pelos termos públicos, sem feed/API de catálogo para terceiros confirmados.  
**UTicket:** integração/API/feed e licença de catálogo **não verificados**; não ativar automação até obter base positiva.  
**Próxima hipótese de menor custo:** priorizar agendas **dos próprios organizadores e casas**, com feeds ou submissões voluntárias comprovadamente autorizados.
