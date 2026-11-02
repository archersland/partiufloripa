# Registro de decisÃµes â€” ADR leve

**ADR-001 Portal web primeiro â€” aceito.** App e social apenas se o portal demonstrar traÃ§Ã£o.

**ADR-002 Stack estÃ¡tica â€” aceito.** GitHub Pages, HTML/CSS/JS, JSON e GeoJSON. Baixo custo; contrapartida: atualizaÃ§Ã£o editorial manual.

**ADR-003 Sem pagamentos â€” aceito.** O PartiuFloripa encaminha para bilheterias oficiais e jamais processa pagamento de ingressos.

**ADR-004 Mapa esquemÃ¡tico â€” aceito.** Contornos municipais reais, referÃªncias regionais aproximadas e calor de eventos cadastrados; nÃ£o Ã© presenÃ§a real de pessoas.

**ADR-005 Comercial adiado â€” aceito.** NÃ£o iniciar prospecÃ§Ã£o, afiliados ou negociaÃ§Ã£o agora. AdSense web somente apÃ³s validaÃ§Ã£o e aprovaÃ§Ã£o; AdMob Ã© para apps.

**ADR-006 Direitos e proveniÃªncia â€” aceito como polÃ­tica.** NÃ£o presumir autorizaÃ§Ã£o por robots.txt ou por conteÃºdo pÃºblico; auditar imagens e dados.

**ADR-007 Harness versionado â€” aceito.** AGENTS.md conciso, docs por tema, Git como fonte da verdade deste projeto.

**Novo ADR:** tÃ­tulo, data, contexto, decisÃ£o, alternativas, consequÃªncias, evidÃªncia e status. NÃ£o reescrever decisÃµes histÃ³ricas silenciosamente.

**ADR-008 Mapa pronto e densidade mÃ­nima â€” aceito (2026-10-28).** ApÃ³s reprovaÃ§Ã£o visual em Android, substituir contornos municipais e rÃ³tulos manuais pelo Esri World Light Gray Canvas. Se houver menos de 3 regiÃµes com eventos na data, exibir apenas marcadores, sem simular calor. Rever condiÃ§Ãµes de uso do provedor antes de monetizaÃ§Ã£o.

**ADR-009 Imagens nÃ£o especÃ­ficas â€” aceito (2026-10-28).** Remover das 13 ocorrÃªncias os dois arquivos idÃªnticos que exibem apenas a marca da casa, nÃ£o cartazes especÃ­ficos. Preservar arquivos para anÃ¡lise, sem considerÃ¡-los licenciados.

**ADR-010 Calor mesmo com evento único — aceito (2026-10-28).** Manter heatmap em toda noite com eventos mapeados, inclusive uma única região, usando halo pequeno e intensidade proporcional, com marcador clicável. Não representar presença de pessoas.


**ADR-011 Seletor de data nativo — aceito (2026-10-28).** Substituir lista de datas por input date nativo, usando calendário do navegador/Android. Permitir dias sem eventos e exibir estado vazio; restringir ao intervalo das noites conhecidas. Não depende de biblioteca externa.


**ADR-012 Categorias por experiência — aceito (2026-10-28).** Baladas = DJs, pista, festas noturnas; Dança = espetáculo coreográfico; Shows = música ao vivo; Humor, Teatro, Cinema, Festivais culturais, Feiras e Cultura permanecem distintos. Folianópolis e set de DJ Blancah passam a Baladas para atender intenção de descoberta noturna. Cards exibem emoji + texto independentemente de cartaz; filtros também exibem emoji. Revisão editorial futura pode reclassificar eventos com evidência.


**ADR-013 Fallback visual por casa — aceito (2026-10-28).** Hierarquia de capa: cartaz do evento quando disponível, depois identidade visual da casa já existente no repositório, depois arte neutra da categoria com emoji. No fallback da casa, exibir aviso 'Imagem da casa' para não apresentar logotipo como cartaz específico. O logo local do Bar do Espartano é reutilizado nas ocorrências sem cartaz. Outros locais continuam com arte de categoria até se obter imagem de casa adequada e autorização de uso. Não confundir reutilização técnica com licença comercial.


**ADR-014 Automated collection with exception review - accepted (2026-10-29).** Automate event discovery and updates only from permitted sources. Route ambiguous data, conflicting changes, and rights issues to manual review. Source list, frequency, and exact rules are still pending. No implementation or QA acceptance is implied.

**ADR-015 Stable event IDs, readable URLs and SEO in web MVP - accepted (2026-10-29).** Add persistent event identifiers, readable shareable URLs, and event-level SEO/indexing in the current phase. Preserve old links and compatibility with static GitHub Pages. Scope decision only: implementation and acceptance remain pending.

**ADR-016 Publicacao de eventos incompletos apos revisao humana - aceita (2026-10-29).** Eventos com informacoes faltantes podem ser publicados apenas apos revisao humana explicita do registro, com aviso claro dos campos ausentes ou nao confirmados. A revisao deve consultar a pagina especifica e fontes confiaveis quando disponiveis; nao inventar dados. Ausencia de dados nao implica aprovacao automatica de publicacao. Campos minimos, processo detalhado de revisao e QA continuam pendentes. Esta ADR e decisao editorial; nao e implementacao nem homologacao do beta.

**ADR-017 Temporary neutral event artwork - accepted (2026-10-29).** Use neutral category artwork pending rights/provenance review. Do not display unverified event or venue images. This temporary rule supersedes ADR-013 fallback presentation until images are approved individually; no rights approval inferred.

**ADR-018 Compare a second ready-made map layer - accepted (2026-10-29).** Compare the existing Esri basemap with a suitable ready-made alternative using matching event data and heat visualization. Do not change the active basemap before visual review, QA, and provider terms verification.

**ADR-019 Refine internal event details page before approval - accepted (2026-10-29).** Keep card-to-detail navigation; refine UI and provide real mobile/desktop evidence before client visual acceptance. Initial A1.11 implementation is not a homologated design.

**ADR-020 Related-event recommendations deferred - accepted (2026-10-29).** Do not implement same-venue/category recommendations in the current beta scope. Reassess after beta validation.

**ADR-021 Closed beta with a validated subset - accepted (2026-10-29).** Initial validation may use a limited, individually reviewed event subset. This is not authorization to launch, and current public GitHub Pages hosting is not access-controlled. Access strategy, content gates, privacy and QA remain pending before beta acceptance.

**ADR-022 Expanded basemap comparison - accepted (2026-10-29).** Do not choose Esri or OpenStreetMap Standard yet. Expand the ready-made map alternatives presented for visual comparison and test the same event locations, heatmap semantics, performance and attribution. No approval to migrate the active map.

**ADR-023 Editorial exceptions reviewed case by case - accepted (2026-10-29).** Keep ADR-016: an event with missing details may be published only after explicit individual human review, visible disclosure of unconfirmed fields and documented evidence. No universal rule automatically authorizes publication based on which field is missing. Missing data must never be fabricated. This is a policy decision; review workflow and acceptance remain separate.

**ADR-024 Invitation-link beta access - accepted (2026-10-29).** For the initial web beta, invite a limited set of participants by sending a link instead of requiring individual logins. A shareable link is NOT access control: recipients may forward it and a public GitHub Pages URL cannot be treated as private. Do not advertise the beta as technically closed or expose unpublished/confidential content. Select a safe preview/data strategy and verify acceptance before launch.

**ADR-025 Esri basemap selected - accepted (2026-10-29).** The user corrected ADR-022: their previous selection to compare more map alternatives was an accidental click. Keep the existing Esri Light Gray Canvas as the approved primary basemap, with heatmap and native date picker unchanged. Other map providers remain optional technical experiments, not part of the MVP migration. This supersedes ADR-022's open-selection status; its comparison implementation and evidence are retained. Review provider terms and attribution before commercialization.

**ADR-026 Editorial Noturno event-detail design - accepted (2026-10-29).** The user explicitly approved the revised Editorial Noturno event-detail concept after the upper hero background was lightened to create a subtle, visible separation from the darker information panel. Implement this approved direction for live event detail pages: editorial serif event title, warm accent, dark teal hero/panel distinction, readable timing and venue hierarchy, neutral category artwork until rights review. Preserve source provenance warnings, verified/unverified data distinctions, quarantine guard, accessibility and backward-compatible URLs. This approves the design direction and implementation, not publication of unverified events, beta launch or final end-to-end QA.

**ADR-027 — Ampliar UX do MVP web com funcionalidades leves — aceito pelo Cliente (2026-11-02).** Contexto: revisão com `build-web-apps` evidenciou problemas de calendário fixo, resiliência, transparência e descoberta. Decisão: incluir datas rápidas, meses dinâmicos, compartilhamento, arquivo .ics, metadados editoriais, recuperação de mapa e indicação de aproximação cartográfica. Permanecer na stack estática. Alternativas avaliadas: migração para React/Next ou backend (rejeitadas por custo/risco desnecessários); somente reparos técnicos (insuficiente à solicitação). Consequências: testes Node e QA visual necessários; .ics com dados informados não garante evento confirmado; nenhuma conta ou pagamento. Evidências: `reports/BUILD-WEB-APPS-REVIEW-2026-11-02.md` e código na branch `main`. Aceite refere-se ao escopo, não a homologação do beta/design.

**ADR-028 — Portas distintas de validação experimental e beta — implementação técnica autorizada (2026-11-02).** Contexto: `validate-events.cjs` rejeitava registros sem horário enquanto ADR-016/023 permite exceções apenas após revisão individual; o CI não executava esse script. Decisão técnica: `node scripts/validate-events.cjs` verifica integridade estruturada e reporta horário ausente como pendência no catálogo experimental; `--beta` exige verificação individual documentada e, quando faltar horário, exceção editorial com justificativa/data/evidência; registros em quarentena não são publicados pela listagem. Alternativa: aceitar silenciosamente dados incompletos (rejeitada). Consequência: CI atual não homologa nenhum evento; beta segue bloqueado até auditoria. Responsável técnico: executor da alteração; cliente mantém aceite exclusivo do beta.



**ADR-029 — Calor por potencial de público — escopo autorizado pelo Cliente (2026-11-02).** Substituir contagem de eventos como peso por público esperado documentado ou capacidade pesquisada da casa/evento. Fonte/data obrigatórias; referência ausente permanece desconhecida, com marcador e sem calor fabricado. Previsão substitui capacidade; sessões da mesma casa não são somadas indiscriminadamente. Escala absoluta entre datas; não representar medição de pessoas. Regras e limites em [HEATMAP-BUSINESS-RULES.md](HEATMAP-BUSINESS-RULES.md). Atualiza a semântica anterior de ADR-004/010 sem trocar mapa, calendário ou visual aprovado. Implementação/publicação para validação autorizadas; aceite do Cliente permanece pendente.

**ADR-030 — Halo perceptível sem inventar público — correção técnica implementada para validação (2026-11-02).** Contexto: a ADR-010 exigia presença visual mínima para um único evento, mas a ADR-029 deixava registros sem referência de público somente com marcador. O Cliente relatou ausência de diferença visual após a primeira correção. Decisão: quando o agregado local não tem público positivo documentado, exibir uma aura âmbar *qualitativa*, sem valor numérico nem contribuição ao heatmap de público; eventos com público positivo usam somente o calor quantitativo, com maior raio/contraste, sem alterar números ou escala entre datas. Alternativas rejeitadas: inventar capacidade mínima (violaria proveniência) e manter somente ponto (não atende legibilidade desejada). Consequências: legenda explicativa, visual testado em navegador headless, sem alteração do mapa-base/precisão, QA Android físico e aceite visual pendentes. Evidências: `docs/HEATMAP-BUSINESS-RULES.md`, patch privado e capturas/testes da prévia. Não equivale a homologação editorial ou medição de presença.

**ADR-031 — Calor localizado e área proporcional — implementação técnica para validação (2026-11-02).** Contexto: o Cliente aprovou visibilidade mínima, mas observou que halos cobriam mais de um bairro mesmo em público de referência alto. Decisão: manter referência documental da ADR-029, porém reduzir o núcleo leaflet.heat e usar halo radial visual de 28–68 px, cujo diâmetro cresce com a raiz quadrada do público conhecido até 10 mil; o halo qualitativo sem referência é fixo em 42 px. Cores continuam graduadas. Alternativa de raio geográfico em metros rejeitada por sugerir alcance espacial real que não foi medido. Consequências: mapa menos disperso, comparação relativa por cor e área, nenhuma alteração nos números de audiência, prévia privada e patch de reconstrução ajustados; QA mobile/desktop e aceite visual humano separados. Detalhes e limites em `docs/HEATMAP-BUSINESS-RULES.md`.
