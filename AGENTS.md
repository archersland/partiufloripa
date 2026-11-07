# Harness TL;DR — PartiuFloripa

**Objetivo:** entregar e evoluir um portal web de eventos em Florianópolis; MVP web primeiro, sem aplicativo, recursos sociais ou processamento de pagamentos.

**Fonte da verdade:** este repositório. Leia `README.md` e apenas o documento de `docs/` pertinente à tarefa. Não usar memória de conversa como substituto de decisões versionadas.

**Antes de alterar:** `git status`, ler implementação e decisões relacionadas, distinguir fato confirmado de hipótese. Não sobrescrever trabalho alheio.

**Durante:** mudança pequena, verificável, mobile-first, acessível e sem custo fixo desnecessário. Não inventar eventos, datas, localização exata, direitos de imagem, permissões de scraping, comissões ou métricas. Dados de terceiros exigem proveniência.

**Depois:** executar `node scripts/validate-events.cjs`, verificar sintaxe JS, testar fluxo afetado no navegador quando possível, revisar `git diff`, registrar decisão se relevante e só então publicar. Relatar o que foi efetivamente verificado e o que ficou pendente.

**Aprovação humana:** solicitar somente para compromissos legais/comerciais, pagamentos, envio externo, credenciais ou decisões irreversíveis. Executar autonomamente tarefas técnicas permitidas.

**Documentos por intenção:** produto → `docs/PRODUCT.md`; aceite → `docs/REQUIREMENTS.md`; código/dados → `docs/ARCHITECTURE.md`; fontes/direitos → `docs/SOURCES-AND-RIGHTS.md`; sequência → `docs/ROADMAP.md`; deploy/testes → `docs/OPERATIONS.md`; decisões → `docs/DECISIONS.md`; dúvidas → `docs/OPEN-QUESTIONS.md`.

**Não fazer:** prospecção de casas ou afiliados agora; scraping da Sympla sem autorização; reutilizar cartazes presumindo licença; divulgar heatmap como fluxo real de pessoas; criar CNPJ, domínio pago, anúncios ou aplicativo sem nova decisão.

**Formato de entrega:** TL;DR, mudanças concretas, validações, riscos/pendências, próximo passo. Evitar longos relatórios de progresso.

## H-ROUTE-002 — Desktop Commander e economia de cota (2026-11-02)

Herança operacional: [HARNESS global](https://github.com/archersland/ai-workspace/blob/master/HARNESS.md) (§ H-ROUTE-002) e [harness específico do projeto](https://github.com/archersland/ai-workspace/blob/master/Projects/PartiuFloripa/HARNESS.md). O repositório deste produto mantém suas próprias decisões e código; a origem antiga `wagarcdev/ai-workspace` foi transferida para `archersland/ai-workspace`.

**Conector autorizado do destino e CI/automação existente primeiro. Desktop Commander apenas para recurso local indispensável e sem alternativa; justificar a exceção, minimizar chamadas e não disputar foco.** Não usá-lo para simples operações GitHub/Drive, inventários ou testes executáveis em CI. O Cliente relatou 13% de sua cota mensal consumida já em 02/11/2026: evitar desperdício. Usar H-LEAN-001 para manter o trabalho proporcional, sem criar PRs/validações sem necessidade. Não executar a automação suspensa das instruções dos Projetos ChatGPT.

## H-KANBAN-EXEC-001 — Status de tickets (06/11/2026)

Para toda execução autorizada de ticket com Issue vinculada ao Kanban do projeto, consultar [procedimento corporativo de checkpoint e readback GITHUB-KANBAN-001-ISSUE-OPERATIONS v0.3, §5](https://github.com/archersland/archersland-governance/blob/main/GOVERNANCE/GITHUB-KANBAN-001-ISSUE-OPERATIONS.md). **Qualquer executor (ChatGPT/Codex/outro/humano)** deve conferir Issue, Project, Status real, autorização e dependências; mover somente quando começar efetivamente para `Em execução` e atualizar QA/publicação/bloqueio/conclusão conforme evidências, por conector ou CLI/API autorizada, lendo novamente cada gravação. Sem capacidade, declarar `KANBAN NÃO SINCRONIZADO`. Nunca executar tarefa por mudança de cartão, encerrar sem gates, aceitar pelo QA, usar Desktop Commander quando houver alternativa GitHub adequada ou alterar Project Instructions suspensas. Restrições do projeto prevalecem.
