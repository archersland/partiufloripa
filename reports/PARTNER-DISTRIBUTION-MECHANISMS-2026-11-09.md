# PartiuFloripa — Canais de divulgação e atribuição em bilheterias (discovery v0.5)

**Data:** 09/11/2026. **Estado:** pesquisa de mecanismos oficiais, não parceria, não autorização comercial, não aceite.  
**Referência:** [Investigação de concorrentes e fontes — issue #7](https://github.com/archersland/partiufloripa/issues/7); [matriz de fontes v0.3](SOURCE-DISCOVERY-MATRIX-2026-11-04.md); [auditoria de API/licenças Blueticket e UTicket v0.4](BLUETICKET-UTICKET-FEEDS-API-LICENSES-2026-11-04.md).  
**Escopo preservado:** PartiuFloripa **descobre e redireciona à fonte oficial**; não opera checkout, pagamento ou revenda no MVP. Sem contatos/prospecção, campanhas, compras, códigos artificiais ou scraping. ADR-005, ADR-006, ADR-014 e ADR-037 mantidas.

## Por que esta pesquisa
O Cliente observou [Baladas Floripa](https://baladasfloripa.com.br/grand-prix-official-party-posh-club-sao-paulo-formula-1-07-11-2025-ingressos-desconto-2/), com programação, CTA de ingresso e cupom. Há exemplo público do link `https://www.blueticket.com.br/evento/39458?c=baladasfloripa`. Isto **comprova uso externo de link com parâmetro**, mas **não** a função interna da chave `c`, a comissão, a validade ou a licença de um agregador independente. Capturas do Cliente mostram também que o portal externo reúne páginas de eventos; a percepção negativa da UI é avaliação subjetiva, não evidência de tráfego ou performance.

**Correção de foco:** a proibição de crawling é questão **de obtenção de dados**, distinta de **divulgação por links, atribuição de tráfego/vendas e eventual remuneração**. O interesse comercial em vender ingressos não substitui contrato, licença de mídia nem autorização de importação.

## Mecanismos identificados — com fonte primária e estado
| Plataforma | Mecanismo oficial documentado | Quem ativa/fornece | Atribuição/benefício confirmado | Limite para PartiuFloripa |
|---|---|---|---|---|
| **Shotgun** | Link rastreável para canais de marketing; links exclusivos de promoter; cupons opcionais | **Produtor** no Smartboard, podendo indicar promoter por evento ou todos seus eventos | Acompanha visitas e vendas; `utm_source` exportável; porta de promoter. **Toda venda online é paga ao organizador** e Shotgun **não divide automaticamente receita** | Promoter por convite; **links de marketing sem promoter** são caminho simples para parceiros editoriais. Nenhuma API de catálogo inferida |
| **Sympla** | Programa de afiliados por evento, convite por e-mail; link pessoal + código pessoal opcional | **Organizador** habilita/convida | Visitas, ingressos e dados financeiros atribuídos; comissão e desconto **caso habilitados** | Não é adesão universal a todos os eventos; não inferir scraping autorizado |
| **UTicket** | Link de cupom por evento; **cupom recorrente** com link apresentando **eventos de um mesmo produtor** onde ativado; promoters via WhatsApp | **Produtor** cria/ativa cupom, habilita parceiro por evento | Rastreamento por influenciador; cupom recorrente permite acompanhar parceiro; publicação oficial cita possibilidade de comissionar por resultado (não afirma split automático) | O cupom recorrente **não** dá acesso a eventos de todos produtores automaticamente; não é feed. Termos de coleta seguem não verificados |
| **PensaNoEvento** | Links personalizados com cupom de influenciador; PDV digital de comissários/RPs; dashboard e suporte a marketing de produtores | **Produtor / operação** | Divulgação e controle de vendas; módulo de listas descreve cálculo de comissões | Funcionalidades do cliente produtor; não comprova programa público de afiliado nem feed licenciado |
| **Blueticket** | Link público para eventos, comissários/promoters no fluxo de PDV; exemplo externo do código `c=baladasfloripa` | Organizador nomeia promoter oficial; parâmetros comerciais do exemplo não documentados publicamente | PDV envia link de pagamento ao comprador; código externo observado, mas **sem relatório oficial de tracking ou comissão** | Confirmar com contrato/programa aplicável; termos de plataforma continuam proibindo scraping não autorizado |
| **Ingresse** | Cupons de organizadores, inclusive códigos de embaixadores/comissários; termos permitem link de compra com cupom já aplicado | **Organizador** define distribuição | Código promocional, possível desconto; **nenhuma comissão confirmada** | Não assumir programa geral nem licença de catálogo |
| **Eventbrite** | Links de rastreamento de marketing individualizados para eventos e afiliados | **Organizador** cria no painel | Views e vendas por link, relatórios exportáveis | Serve como referência de mecanismo, não prova cobertura/contrato local |
| **Ticket360** | Página oficial anuncia **Clube360 / Modo Promoter** com pontos/cashback por venda via link | Regras de programa futuro | Site diz **“em breve”**; **não é programa ativo confirmado** | Não considerar disponível até lançamento e termos |
| **LivePass** | Canais de promoção a artistas/fãs e mídias digitais na visão institucional | Equipe/plataforma e organizadores | Participação de promoção descrita genericamente | Sem link rastreável público de parceiro ou programa contratável identificado |
| **Zig Tickets** | Organizadores controlam dados do evento e política comercial; materiais promocionais de organizadores | Organizador | Sem link rastreável/programa público de parceiro verificado neste recorte | Não inferir que um termo de subdomínio white-label aplique a toda Zig |

### Referências oficiais
- Shotgun, [criar e gerenciar promoters](https://support-pro.shotgun.live/hc/pt-br/articles/13970546627858-Criar-e-gerenciar-promoters); [rastreio por fonte](https://support-pro.shotgun.live/hc/pt-br/articles/9971181306898-Como-posso-acompanhar-minhas-vendas-por-fonte-com-links-de-rastreamento); [portal do promoter](https://support-pro.shotgun.live/hc/pt-br/articles/13970940523154--Portal-do-Promoter).
- Sympla, [posso divulgar eventos como afiliado?](https://ajuda.sympla.com.br/hc/pt-br/articles/210255583-Posso-divulgar-eventos-como-afiliado) (atualização visível de 06/10/2026). **“Evento Amigo”** é **outro programa**: remunera indicação de organizador novo, não venda de ingresso; [artigo oficial](https://ajuda.sympla.com.br/hc/pt-br/articles/24139057931028-Como-funciona-o-programa-Evento-Amigo).
- UTicket, [link com cupom](https://www.uticket.com.br/ajuda/produtores/gerenciamento-de-cupom-de-desconto/como-gerar-link-de-compra-do-cupom); [cupom recorrente](https://www.uticket.com.br/ajuda/produtores/gerenciamento-de-cupom-de-desconto/posso-criar-um-cupom-recorrente-que--vlido-em-vrios-eventos); [restrição de promoters](https://uticket.com.br/ajuda/produtores/gerenciamento-de-promoters/como-restringir-determinados-ingressos-para-promoters); [parcerias no blog oficial](https://uticket.com.br/blog/como-vender-ingressos-com-pouco-orcamento-estrategias-praticas-para-produtores/).
- PensaNoEvento, [plataforma e módulos oficiais](https://www.pensanoevento.com.br/conheca) (Vendas On-line, PDV Digital, Nomes na Lista, marketing e suporte a divulgação).
- Blueticket, [central com PDV/promoter](https://blueticket.movidesk.com/kb/pt-br/article/325567/duvidas-sobre-compras) e [termos oficiais](https://blueticket.movidesk.com/kb/article/146707/termos-de-uso-da-plataforma-blueticket).
- Ingresse, [central de ajuda sobre cupom](https://meajuda.ingresse.com/support/solutions/articles/8000086849-cupom-de-desconto) e [termos de serviço revistos em 06/11/2026](https://sobre.ingresse.com/termos-de-servico).
- Eventbrite, [criar tracking links](https://www.eventbrite.com/help/en-au/articles/835126/how-to-create-promotional-tracking-links/).
- Ticket360, [Clube360 — em breve](https://www.ticket360.com.br/sobre/clube360).
- LivePass, [visão de promoção](https://institucional.livepass.com.br/visao/).
- Zig Tickets, [termos de instalação white-label](https://marketplace-checkoutv2.zig.tickets/paginas/termos) (não generalizar indevidamente).

## Separação prática dos modelos
1. **Página de evento + link canônico**: publicação factual revisada e encaminhamento para bilheteria; não significa afiliação, remuneração nem licença de imagens.
2. **Link de marketing com rastreio**: ideal quando organizador quer medir tráfego e vendas **sem** transformarmos a UX numa loja de ingressos; Shotgun e Eventbrite documentam geração para canais.
3. **Promoter/afiliado**: autorizado/ativado pelo **organizador** (alguns programas são por evento, outros permitem múltiplos eventos de mesmo produtor); comissão/benefício varia. **Não gerar códigos de URL arbitrários.**
4. **Material de mídia e dados estruturados**: contrato/licença distintos do direito de criar link; material promocional não é automaticamente livre; API/feed para importação de todos eventos **não comprovada** por esses programas.

## Direção de produto — hipótese, não implementação
Para futuro contrato de referência de ingresso, separar em dados:
- URL original de fonte editorial (`sourceEditorialUrl`);
- URL oficial/canônica de venda (`officialTicketUrl`);
- eventual URL de promoção **fornecida e validada** pelo produtor (`approvedPartnerUrl`);
- origem / permissão do link, titular, abrangência (`event` ou `organizer`), data e condição de validade;
- identificação de atribuição interna de cliques no PartiuFloripa, **distinta de receita ou compras comprovadas** por relatório externo;
- licença de artes, titular e evento a que se aplicam, sempre separada dos links.

Sem coletar dados pessoais de clientes nem receber pagamentos. Não alterar arquitetura neste relatório; a proposta de atribuição já tem documento e ADR próprios.

## Próximas verificações priorizadas (sem contatos ou campanhas)
- [ ] **Blueticket:** localizar contrato/diretrizes oficiais de parceria editorial, link/código digital e eventual programa de marketing para agregador; por ora somente PDV e exemplo externo comprovados.
- [ ] **UTicket:** qual escopo do cupom por produtor e se parcerias com veículos editoriais são contempladas nas regras; feed/catalogação continua desconhecido.
- [ ] **Shotgun e Sympla:** requisitos de aceite do produtor, território, prazo e uso de imagem por evento; nenhuma integração automática geral autorizada.
- [ ] **PensaNoEvento:** identificar se oferece kit de mídia oficialmente reutilizável e autorização a portais independentes, sem copiar o catálogo.
- [ ] **Casas/produtores locais:** eventual cadastro voluntário e entrega de links/artes licenciados ao PartiuFloripa (prospecção externa vedada nesta fase).
- [ ] Verificar páginas de evento/ingressos com casos reais de Floripa, provando link canônico correto e tratamento de eventos esgotados/cancelados; não inventar métricas de conversão.

## Limites e verificação
**Fontes e termos públicos** foram pesquisados e a interpretação do modelo foi corrigida; o relatório não declara autorização comercial já concedida, nem existência de programa universal. Nenhum site foi raspado, nenhum contrato/credencial obtido, nenhum convite enviado, nenhum código criado e nenhuma alteração funcional feita. Documento no GitHub é apenas persistência da pesquisa, não deploy e nem aceite. Testes `scripts/validate-events.cjs`/CI/QA não se aplicam a alteração documental apenas.
