# Medição de cliques externos e identificação de origem — PartiuFloripa

**Versão:** 0.1, 2026-11-03. **Estado:** requisitos e protocolo de pesquisa documentados; **não implementado, não implantado e não homologado**. Complementa RF-12 e ADR-036. Não constitui autorização para prospecção, acordos comerciais, afiliados, mudanças em links públicos, lançamento do beta, serviços pagos ou automação de rastreamento.

## 1. Objetivo e limites do produto

Medir, de forma auditável e proporcional à privacidade, as **interações de saída** geradas pela Agenda, Lugares, Mapa e detalhe de evento, agrupadas por evento e casa, para futuramente demonstrar o valor que o PartiuFloripa produz antes de negociar destaque ou patrocínio.

- **Clique de saída no portal não é visita confirmada no destino** nem venda, ingresso, conversão, pessoa individual, comissão ou reconhecimento no analytics de terceiros.
- Separar tráfego gerado pelo portal de tráfego **reconhecido pela plataforma externa**. Reconciliação com o destino somente quando houver dados legítimos fornecidos pelo operador ou uma integração autorizada.
- Não interferir na navegação quando a telemetria falhar; preservar URL oficial, acessibilidade, abas, rotas profundas e `rel="noopener"` para links em novas abas.
- O MVP permanece web e de baixo custo. Ainda **não há coletor, backend, analytics, cookies persistentes ou indicadores medidos**. Avaliar a necessidade técnica mínima antes de adicionar infraestrutura.
- Esta especificação não autoriza experimentar em produção URLs modificadas de terceiros. Aplicar alterações somente após pesquisa, segurança, privacidade, teste manual e autorização pertinente.

## 2. Vocabulário e métricas

| Identificador | Definição operacional | Uso/advertência |
| --- | --- | --- |
| `outbound_activations_raw` | Ativações de links externos que o cliente conseguiu observar (toque, clique, teclado, quando observáveis) | Não inclui, necessariamente, «abrir em nova aba» pelo menu de contexto nem cliques bloqueados por extensões |
| `outbound_clicks_eligible` | Ativações válidas após os filtros da seção 3, antes da deduplicação | Ato de intenção de navegação, não carregamento comprovado do destino |
| `outbound_clicks_dedup` | Ativações elegíveis excluindo repetições da seção 4 | **Métrica principal de cliques atribuíveis ao portal**, sem extrapolação de público |
| `outbound_click_sessions_30d` | Número de IDs de sessão efêmeros distintos que geraram ao menos um clique elegível em 30 dias | **Não chamar de pessoas únicas**; sessão ≠ navegador ≠ pessoa |
| `outbound_event_sessions_30d` | Sessões distintas que clicaram pelo menos uma vez em determinado evento em 30 dias | Pode somar mais de uma vez ao agregar eventos de uma mesma casa |
| `outbound_clicks_by_venue_30d` | Cliques deduplicados por `venue_id` nos últimos 30 dias | Juntar por ID estável, não por texto livre do nome |
| `outbound_clicks_by_surface` | Cliques deduplicados por `agenda`, `lugares`, `mapa` ou `detalhe` | Origem na interface do portal, não origem da sessão no mundo externo |
| `outbound_collection_success_rate` | Eventos elegíveis reconhecidos pelo coletor / tentativas elegíveis de envio, quando mensurável | Diagnóstico técnico, não taxa de navegação/venda |

Relatórios: séries diárias, janelas móveis de 7 e 30 dias, por `event_id`, `venue_id`, `destination_id` e superfície. Registrar instante em UTC, apresentar período civil em `America/Sao_Paulo`; não comparar dias com denominadores diferentes sem indicação. Métricas de taxa de clique sobre impressões só após definir e validar o evento de impressão, que **não** está aprovado aqui. Evitar estimativas de «pessoas» enquanto não existir método validado e base legal adequada para identificação.

## 3. Regras de elegibilidade e rejeição de medição (não de navegação)

Uma ativação elegível deve: (a) originar-se de ação observável do usuário; (b) apontar para destino HTTPS **previamente validado e autorizado editorialmente**; (c) relacionar-se a entidade e link efetivamente exibidos; (d) informar a superfície; e (e) passar pelo controle técnico de duplicatas/reenvios. Aceitar ações de teclado e leitores de tela em igualdade com mouse/toque.

Rejeitar da métrica elegível, contabilizando apenas contadores agregados de motivo quando viável:
1. Eventos sintéticos de testes, monitoramento automatizado identificado, verificadores de link e atividade evidentemente não humana; heurísticas não devem excluir sem revisão tráfego legítimo.
2. Links vazios, inválidos, não HTTPS, destinos divergentes do catálogo confiável, evento em quarentena e entradas sem fonte revisada quando a regra editorial as excluir da navegação.
3. Instrumentação disparada por renderização, hover, scroll, pré-carregamento, refresh, retorno à aba, cópia de link ou erro de script sem ativação real.
4. Reenvio técnico com o **mesmo `interaction_id`** (idempotência), ainda que tenha ocorrido em momentos diferentes.

**Não bloquear a pessoa, mostrar erro ou alterar o link original apenas porque a medição foi descartada.** Não usar a contagem como mecanismo antifraude para terceiros; classificar acessos duvidosos como «indeterminados» para revisão, em vez de supor que são bots.

## 4. Deduplicação inicial — valores de trabalho a validar em QA

- **Camada 1, idempotência:** `interaction_id` aleatório por ativação, gerado no cliente, deduplicado no recebimento para impedir dupla contabilização por `sendBeacon`/retry. Janela proposta de até **24 horas** no serviço coletor; sem servidor, não reivindicar essa garantia.
- **Camada 2, dupla ativação:** suprimir da métrica principal uma nova ativação da **mesma sessão + entidade (evento ou lugar) + destino canônico** ocorrida em até **30 segundos** da primeira elegível. Conservar o agregado «suprimidos por repetição». Uma nova ativação após 30 s volta a contar.
- **Entidades diferentes:** cliques em dois eventos distintos da mesma casa contam separadamente; uma mesma sessão só conta uma vez em `outbound_click_sessions_30d` e até uma vez por evento em `outbound_event_sessions_30d`.
- **Sessão de medição:** proposta de identificador aleatório efêmero em `sessionStorage`, expirando após **30 min de inatividade**. Abas diferentes, armazenamento indisponível, browsers e dispositivos podem gerar IDs diferentes para a mesma pessoa; não fazer fingerprinting ou consolidar por IP.
- O relógio e a chave de deduplicação devem ser validados no recebimento; não confiar somente na hora do browser. Não apagar a necessidade de distinguir duplicação de interação legítima.
- **Os intervalos 30 s / 30 min / 24 h são parâmetros iniciais de engenharia, não evidência empírica.** Testar sensibilidade antes da implantação e versionar qualquer mudança. Não retrointerpretar séries históricas com regra nova sem aviso.

### Casos mínimos de regressão

| Cenário | Resultado esperado na métrica deduplicada |
| --- | --- |
| Toque único ou Enter em CTA HTTPS revisado | +1 |
| Dois disparos da mesma ativação, mesmo `interaction_id` | +1 no total |
| Duplo toque no mesmo evento/destino em 5 s | +1 no total; +1 duplicado suprimido |
| Mesmo evento/destino após 31 s | +2 no total, na mesma sessão |
| Segundo evento da mesma casa, dentro de 30 s | +2 no total, distribuídos entre eventos |
| Mesmo evento em outra superfície dentro de 30 s | +1 no total, preservando atribuição à primeira superfície |
| Link inválido, monitor, carregamento automático, evento em quarentena | +0 elegível; navegação não bloqueada pela instrumentação |
| Falha, timeout ou bloqueio do coletor | CTA continua funcionando; mensuração marcada como incompleta, sem fabricar clique |
| Usuário sem identificador de sessão disponível | Contar clique válido se permitido; sessões únicas como «indisponíveis», sem inventar ID persistente |
| CTA com querystring/fragment e link assinado | Link original preservado; não adicionar parâmetros incompatíveis |

## 5. Contrato mínimo e privacidade

**Campos candidatos**: `interaction_id` (efêmero), timestamp UTC, `event_id` **ou** `venue_id`, `venue_id` relacionado quando confirmado, `destination_id` estável, hostname aprovado, `surface`, `cta_kind`, `session_id` efêmero quando viável e status de processamento. Não enviar URL completa com tokens/consultas, nome, e-mail, telefone, localização do dispositivo, IP persistido pelo produto, identificadores publicitários ou conteúdo de navegação sensível.

- Separar **contadores agregados** de eventos temporários de depuração. Sugestão inicial a submeter à revisão de privacidade: eventos técnicos retidos até **30 dias**, agregados por dia/entidade até **13 meses**, com descarte e direito de revisão documentados. A retenção é **proposta**, não obrigação legal nem configuração ativa.
- Avaliar LGPD (finalidade, transparência, base legal, operador/processador, retenção, opt-out/consentimento quando aplicável), configuração de logs da infraestrutura e bloqueadores antes de implantar.
- Não publicar CSVs de cliques, IDs de sessões, IPs ou logs pessoais no repositório GitHub público. Evitar coleta de dados individualizados para fins de publicidade sem decisão específica.
- O relatório de sessões distintas é uma **contagem operacional de sessões de clique**, nunca a promessa literal de «quantas pessoas únicas». Não adicionar cookie persistente, login ou identificação cross-device ao MVP para corrigir artificialmente essa diferença.

## 6. Engenharia de coleta — opções em aberto

O site atual é GitHub Pages/HTML/CSS/JS estático e os links de evento saem de `evento.html` como `<a target="_blank" rel="noopener noreferrer">`. Portanto **`noreferrer` impede o envio do cabeçalho `Referer` neste CTA**: a plataforma de destino não deve depender só desse sinal para reconhecer a origem. Isso não bloqueia UTMs explícitas. **Não remover `noreferrer` sem avaliação de privacidade e segurança.**

Pesquisar comparativamente: (A) analytics de primeiro/terceiro fornecedor com eventos customizados e política de privacidade; (B) endpoint mínimo autorizado de coleta, sem transformar o site em aplicação com login/backend integral; (C) agregação de logs apropriados, se realmente disponível. Verificar limites de gratuidade, disponibilidade, bloqueios de extensões, retenção, CORS, ad blockers, segurança e custo. Instrumentação deve ser **não bloqueante**, testável em ambiente isolado e centralizada para não duplicar escutas nas abas ou nos links gerados. Nenhuma opção está escolhida ou ativada.

## 7. Estratégia de URLs identificadas e auditoria por plataforma

**Padrão candidato**, apenas em destinos confirmados compatíveis:
`?utm_source=partiufloripa&utm_medium=referral&utm_campaign=descoberta_eventos&utm_content=detalhe`

`utm_content` pode representar `agenda`, `lugares`, `mapa` ou `detalhe` conforme a superfície. `utm_source` é estável, minúsculo; não usar nomes de pessoas. A documentação oficial do Google Analytics admite UTMs e distingue maiúsculas/minúsculas, mas **isso não comprova que qualquer casa utilize GA4, visualize UTMs ou receba os parâmetros após redirecionamentos**.

**Precedência de implementação (quando autorizada):**
1. Preservar a URL oficial e seus parâmetros existentes; compor querystring via `URL`/`URLSearchParams`, nunca concatenação cega de `?`.
2. URLs assinadas, QR dinâmico, links curtos, checkout, deep links, destinos que eliminam parâmetros e links com `utm_source`/código de atribuição já atribuído: **não sobrescrever nem modificar sem contrato/validação**.
3. `source`, `ref`, `affiliate`, `partner`, `utm_*` não são equivalentes. Usar apenas convenções documentadas para **aquele domínio/plataforma**, mantendo a classificação de visibilidade em relatórios como hipótese até prova.
4. Não criar link de afiliado, substituir identificador alheio, simular associação comercial, contornar antifraude ou acrescentar parâmetros a uma venda para se apropriar de conversão.
5. Em caso de dúvida, conservar link canônico e medir somente o clique de saída internamente.

### Pesquisa documental inicial (não é teste operacional em sites de casas)

| Plataforma/mecanismo | O que a documentação sustenta | Classificação atual |
| --- | --- | --- |
| Google Analytics 4 / UTM | `utm_source`, `utm_medium`, `utm_campaign` são parâmetros de campanha; reconhecimento depende do analytics configurado na propriedade de destino | Convenção conhecida; **compatibilidade de cada casa desconhecida** |
| Evvnt `ref` | Documentação diz que códigos arbitrários `?ref=VALOR` são registrados sem cadastro prévio; atribuição tem regras próprias e janela de 30 min | **Suporte documentado da plataforma**, não evidência de uso por casas do catálogo |
| Eventbrite Tracking links | Link rastreável criado por organizador no dashboard; views e vendas exibidas no painel | **Requer ação/permissão do organizador** para tracking links nativos; UTM por evento não confirmado |
| Sympla Comissários/Afiliados | Link individual depende de convite e acesso autorizado à afiliação; painel apresenta visitas, vendas e financeiros | **Requer relação autorizada** para afiliado; `source`/UTM arbitrários não comprovados |
| Cabeçalho HTTP `Referer` | Políticas do navegador/site podem enviar origem, reduzir informação ou suprimi-la; o CTA atual usa `noreferrer` | **Não garantido e atualmente suprimido nos CTAs de evento** |

Fontes oficiais consultadas em 2026-11-03:
- GA4: https://support.google.com/analytics/answer/10917952?hl=pt-BR
- Evvnt: https://support.evvnt.com/articles/6194309735-referral-code-tracking
- Eventbrite: https://www.eventbrite.com/help/en-au/articles/835126/how-to-create-promotional-tracking-links/
- Sympla: https://ajuda.sympla.com.br/hc/pt-br/articles/210255583-Posso-divulgar-eventos-como-afiliado
- HTTP Referrer-Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy

### Protocolo de auditoria das casas do catálogo

1. Inventariar **somente os links de saída já documentados** em `events.json`, `data/venues.json` e fontes oficiais, agrupar por domínio/provedor, entidade e tipo de URL; não supor que toda casa opera bilheteria.
2. **Fase passiva:** pesquisar documentação oficial de cada provedor, termos e presença de redirect, tracking links e UTMs; não fazer scraping da Sympla, nenhum envio em massa nem modificação real de links. **Não** capturar dados privados do dashboard de casas.
3. Anotar em matriz versionada: `venue_id`, `event_id` quando existente, domínio, URL canônica saneada (sem tokens), plataforma, parâmetros documentados, exige conta/convite, risco de URL assinada/redirecionamento, evidência (link + data), resultado de inspeção, responsável, **estado de reconhecimento no analytics**.
4. Classificar cada padrão: `documentado_sem_teste`, `teste_manual_controlado_pendente`, `navegacao_preservada`, `tracking_reconhecido_por_destino`, `requer_parceria`, `incompativel`, `desconhecido`. **HTTP 200 ou parâmetro preservado NÃO provam registro em banco ou painel do destino.**
5. **Fase controlada futura:** abrir amostras públicas em navegador isolado, em baixa frequência, sem finalizar pedidos ou pagamentos; comparar URL original x candidata, cadeia de redirecionamento e página final, confirmar integridade da experiência e documentar evidência. Apenas após avaliação de direitos/termos e autorização de experimento. Não reivindicar atribuição comercial sem evidência do proprietário.
6. Só publicar URLs parametrizadas após revisão de segurança, privacidade, casos positivos/negativos e rollback para link canônico. Se plataforma excluir UTMs/alterar destino, usar link original e métrica interna.
7. Revisão de compatibilidade quando houver mudança de provedor, formato do link ou redirecionamentos. Não usar a auditoria como prospecção: **nenhum contato externo nesta etapa**.

## 8. Inventário passivo do catálogo atual — snapshot de 2026-11-03

Leitura **somente de `events.json` e `data/venues.json`**, sem visitar, alterar ou testar URLs no destino: **56 ocorrências, 35 URLs de fonte distintas e 8 domínios**. Contagens abaixo são de **ocorrências de eventos catalogadas**, NÃO de cliques recebidos, visualizações ou contratos com casas.

| Domínio presente no campo `source` de `events.json` | Ocorrências | URLs distintas | Natureza indicada pelo link / consequência |
| --- | ---: | ---: | --- |
| `www.pensanoevento.com.br` | 27 | 27 | Plataforma de ingressos; **principal candidata para pesquisar compatibilidade**, sem evidência de que `source`/`ref` arbitrário seja registrado |
| `ouviram.com.br` | 14 | 1 | Artigo/agenda agregada; tráfego enviado ao portal editorial, não necessariamente à casa |
| `emfloripa.ia.br` | 5 | 1 | Agenda geral, e não necessariamente bilheteria de cada ocorrência |
| `guiafloripa.com.br` | 4 | 2 | Agenda de terceiros; destino editorial |
| `musicpark.com.br` | 2 | 1 | Agenda geral do operador, não landing específica dos dois eventos |
| `tocaonde.com.br` | 2 | 1 | Guia editorial de terceiros |
| `www.eventoon.com.br` | 1 | 1 | Página de cidade/agregador |
| `undr.com.br` | 1 | 1 | Página de evento no site do operador, a conferir como destino oficial |

O catálogo `data/venues.json` registra 39 lugares com evidências de localização, **mas não contém ainda campos `website` ou `officialSite`**. Links de `locationEvidence` servem para comprovação de endereço/identidade e **não devem ser convertidos automaticamente em CTA comercial**.

**Achado de produto:** o campo atual `event.source` é uma fonte editorial de informação, não um contrato de **link de ingressos/destino da casa**. Para demonstrar valor B2B, é necessária classificação editorial individual de URLs e eventualmente um campo separado de **destino oficial de saída**, com proveniência e verificação próprias, preservando `source` para auditoria e sem inventar links. Essa separação exige especificação incremental e testes de regressão do detalhe/CTA/SEO, não migração automática dos 56 registros.

A página pública de produtores da Pensanoevento confirma serviço de bilheteria e links próprios de divulgação, mas **não documenta aceitação genérica de `utm_source`, `source` ou `ref` arbitrários como atribuição em painel**: https://www.pensanoevento.com.br/vender-ingressos . Priorizar pesquisa documental dessa plataforma por representar 27 das 56 ocorrências; não testar ou ativar códigos sem evidência. Alguns serviços associados mencionam links personalizados, o que não equivale a licença para inventar identificação de afiliado.

**Próximo levantamento:** para cada registro, classificar `editorial_source`, `organizer_site`, `ticketing_event_page`, `generic_agenda`, `unknown`; identificar o domínio que realmente receberia o visitante e documentar se a casa consegue consultar relatórios. O inventário deste item é **passivo e parcial**: não auditou os 35 redirecionamentos, direitos, mecanismos internos de analytics ou contratos.

## 9. Aceite técnico futuro e riscos

**Critérios:** testes automatizados do algoritmo de filtro/idempotência/deduplicação e construção segura de URLs; cenários permitidos e proibidos na seção 4; verificação no Chromium mobile/desktop e Android físico quando possível; CTA mantém o destino com coletor desligado; sem duplicação nas abas; relatório por evento/casa/30 dias reconciliável com fixture conhecida; revisão de tratamento de dados; teste com `noopener noreferrer`, ad blocker, falha de conexão e parâmetros existentes. Integrar aos checks/CI já existentes sem criar build apenas para docs.

**Riscos:** subcontagem por bloqueadores e links abertos por menu; supercontagem por abas/dispositivos/bots; perda de UTM em redirects; interceptação de links assinados; falsa promessa de visitantes/vendas; custo/privacidade de serviço de coleta; colisão com atribuição alheia. **Aceite, publicação e contato comercial permanecem bloqueados até suas portas específicas.**

**Próximos passos técnicos, sem ativação:** inventariar domínios efetivamente presentes no catálogo, prototipar o resolvedor de URL e a função pura de deduplicação em testes locais/CI, comparar opções de coleta, auditar a política de privacidade e obter autorização de publicação quando tudo estiver verificável.
