# PartiuFloripa — pipeline ALS e decisões revisáveis
Atualizado: 2026-10-29 | Estado: documentação operacional; **nenhum aceite inferido**

## Fontes
- Canônica: https://github.com/archersland/partiufloripa
- Decisão A1.10: [UI-CARDS-A1.10.md](UI-CARDS-A1.10.md)
- Implementação A1.11: [CARD-NAVIGATION-AND-IMAGES.md](CARD-NAVIGATION-AND-IMAGES.md)
- Protocolo transversal: AI-Workspace/ALS/approval-center-contract.md (v0.1-candidate), ALS/acceptance-contract.md e ALS/dashboard-contract.md (v0.2-draft). O caminho remoto anterior APPPROVAL-CENTER.md não foi confirmado; não tratá-lo como link operacional.
- Dashboard é **projeção**, não nova fonte de verdade. Não registrar aprovações sem decisão do Client e readback.

## Pipeline: ações, artefatos e gates
| ID | Área | Item/artefato | Situação comprovada | Próxima ação | Decisão do Client |
|---|---|---|---|---|---|
| PF-UX-01 | UX | A1.10: busca horizontal baixa e carrossel largo | Design aprovado em conversa; código versionado | Validar visual desktop/Android, fotos com títulos nas bordas, acessibilidade e touch | **Homologar resultado visual**, somente após evidência real |
| PF-UX-02 | UX | Página interna de detalhes A1.11 | Primeira implementação versionada; design não homologado | Produzir capturas reais mobile/desktop e proposta de refinamento | **Aprovar/rejeitar/solicitar alterações** do design |
| PF-CONTENT-01 | Produto / Operações | Foto padrão por casa de eventos | Parcial: Bar do Espartano com associação local; demais sem associação validada | Inventariar casas; localizar fotos próprias e origem/licença; montar galeria comparativa | **Selecionar fotos propostas por casa**, quando houver opções reais; aceite editorial separado de direitos |
| PF-ENG-01 | Engenharia | Card inteiro → detalhe interno → CTA externo | Código A1.11 versionado; sem QA navegador confirmado | Testar navegação, histórico, links, mobile e teclado | Homologação funcional após QA, não nova autorização para codificar |
| PF-ENG-02 | Engenharia / Produto | IDs persistentes, URL canônica, SEO por evento | Pendente | Propor contrato de ID/slug, migração compatível e SEO | Decisão de contrato somente se houver alternativas com impacto |
| PF-PROD-01 | Produto / Growth | Descoberta contínua (mesma casa, relacionados, próximos eventos) | Hipótese ainda não desenhada/aprovada | Propor fluxo e protótipo na página de detalhes | **Escolher experiência** entre alternativas após apresentação |
| PF-DATA-01 | Operações / QA | Catálogo e direitos | Validador: 8 eventos sem horário; 31 alertas de região genérica; imagens/links com auditoria editorial pendente | Conferir fontes e licenças, sem inventar dados | Revisão editorial quando existir lote de evidências |
| PF-DATA-02 | Produto | Preços e 💵 | UI definida; catálogo sem preços confiáveis | Definir campo, proveniência e política de atualização | Não pedir aprovação para preencher dados verificados; decidir apenas regra editorial controversa |
| PF-QA-01 | QA | Deploy e QA visual/funcional | JS syntax verificado; navegação real e GitHub Pages não homologados | Executar testes e registrar capturas, resultados e regressões | **Aceite de entrega** após evidências |
| PF-GOV-01 | Governança | H-APPROVAL-001 e sincronização dashboard | Gateway operacional não comprovado; não alegar publicação de pacote | Criar solicitações versionadas com artefatos reais; sincronizar deterministamente e confirmar readback | Só o Client decide; ausência de resposta ≠ aprovação |

## Protocolo de aprovação
- Uma solicitação por gate/artefato efetivamente revisável, não por tarefa rotineira.
- Quando houver artefato real, incluir projectId=`partiufloripa`, requestId estável, revisão/hash, categoria `decision_gate` ou `acceptance_deliverable`, critérios, riscos, MIME e referências.
- Estados: `created → published → in_review → decided → dispatched → acknowledged`; não inferir mudança de estado por commit ou teste.
- Ações do Client: aprovar, rejeitar, pedir alterações; aprovar com ressalvas apenas quando aplicável.
- Gateway autenticado só quando comprovadamente operacional. **Até lá, dashboard delivery PENDING**, apresentar material revisável na conversa e manter registro no Git.
- P&D e atividades departamentais não iniciam pesquisa contínua/autônoma por este registro.

## Prioridade recomendada (não equivale a aprovação)
1. QA A1.11 e evidência visual; 2. proposta de design da página de detalhes; 3. inventário/licenças e seleção de fotos; 4. retenção por descoberta relacionada; 5. IDs/SEO e enriquecimento de dados.

## Complemento — Figma, decisões e Dashboard (2026-10-29)

Arquivo Figma: https://www.figma.com/design/iLSNGxgYRAtqMQYyOcdZhf . Foundations com quatro cores; frame mobile 390×844; screenshot original bloqueado sob header, logo e busca editáveis. Alterações persistiram após F5. Capturas desktop e mobile corrigidas estão no Git. **Ainda não houve homologação visual.** Acesso via Chrome autenticado, sem Figma API/MCP.

| ID | Área | Classe ALS | Artefato | Próxima ação | Decisão do Client | Estado |
|---|---|---|---|---|---|---|
| PF-DS-01 | UX / Design System | routine_operation | Foundations: tokens, tipografia, espaçamento | Completar Figma e comparar CSS | Nenhuma para execução rotineira | in_progress |
| PF-DS-02 | UX / Design System | acceptance_deliverable | Design System v1: componentes, variantes, estados, evidências | Preparar pacote verificável | Homologar / ressalvas / rejeitar / alterações | preparation, não enviado |
| PF-UI-01 | UX / Interface | acceptance_deliverable | Telas mobile + desktop reconstruídas sobre screenshots bloqueados | Importar desktop, completar telas e comparar 100% | Homologar fidelidade visual após QA | in_progress, não enviado |
| PF-MAP-01 | Produto / UX | decision_gate | Proposta do heatmap real + seletor calendário | Apresentar alternativas e comportamento mobile/data/período | Escolher alternativa visual/funcional | proposed, sem pacote |
| PF-MAP-02 | Engenharia / QA | acceptance_deliverable | Mapa/calendário implementados e testados | Testar filtros, datas, densidade, performance e acessibilidade | Homologar entrega verificada | not_ready; depende PF-MAP-01 |
| PF-FIGMA-OPS-01 | Infraestrutura | routine_operation | Harness de browser GUI com readback e screenshots | Consolidar scripts seguros; CDP isolado segue não autenticado | Nenhuma para rotina autorizada | GUI verified; CDP pending |
| PF-FIGMA-ORG-01 | Governança | decision_gate | Renomeação de equipe Beyond Droid → AI Work | Verificar efeitos na equipe compartilhada | Confirmar nome e escopo | proposed |
| PF-DASH-01 | Governança | routine_operation | Projeção determinística por área, artefato e ação | Conectar manifesto ao gateway quando operacional e validar readback | Nenhuma para gerar projeção | gateway PENDING |

### Contrato de projeção por área
- Fonte canônica: GitHub deste projeto e decisões registradas. Dashboard é projeção e superfície de decisão, nunca segunda fonte de verdade.
- Campos: id, projectId=partiufloripa, area, work_class, state, artifact_refs, next_action, client_action, evidence_refs, blockers, updated_at, dashboard_delivery.
- Só criar pedido de aprovação com artefato revisável, requestId estável, revisão/hash, MIME, critérios e evidências. Não criar gate para rotina.
- Transporte dashboard_delivery=PENDING até gateway autenticado, persistência, renderer, callback, idempotência e readback comprovados. Nenhum item desta tabela foi publicado no Approval Center.
- Ciclo de transporte: created → published → in_review → decided → dispatched → acknowledged. Ausência de resposta, commit ou teste nunca equivalem a aprovação.
- Apresentar por departamento/pipeline os itens em preparação, em execução, aguardando decisão, bloqueados e verificados, sem porcentagens inventadas.

### Critérios para disponibilizar botões de decisão
- PF-DS-02: biblioteca navegável, estados e variantes, tokens reconciliados com CSS, screenshots, desvios e critérios PASS/FAIL.
- PF-UI-01: frames mobile 390×844 e desktop 1440×900, screenshots bloqueados abaixo dos elementos editáveis, comparação 100% e responsividade.
- PF-MAP-01: alternativa(s) de protótipo com heatmap verdadeiro, calendário, período, estados vazios e comportamento mobile.
- PF-MAP-02: evidência real de testes de data, filtros, densidade, legenda, performance e acessibilidade.

Prioridade sugerida (não é aprovação): PF-DS-01, PF-UI-01, PF-MAP-01, PF-DS-02, PF-MAP-02. Produto permanece portal web primeiro; app/social fora do MVP.
