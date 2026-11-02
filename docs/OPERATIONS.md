# Protocolo de evoluÃ§Ã£o e publicaÃ§Ã£o

1. Ler `AGENTS.md` e documento especÃ­fico; inspecionar `git status`.
2. Formular objetivo, risco e aceite; distinguir implementaÃ§Ã£o real de hipÃ³tese.
3. Fazer mudanÃ§a pequena, reversÃ­vel, mobile-first e sem dependÃªncia paga desnecessÃ¡ria.
4. Rodar `node scripts/validate-events.cjs` e checar sintaxe JS; testar fluxo afetado em navegador.
5. Testar mapa com rede real: imagem HTTP 200 pode conter erro (caso CARTO). Verificar visualmente.
6. Revisar diff, atualizar requisitos/ADR/roadmap quando necessÃ¡rio.
7. Commit/push apenas de arquivos intencionais; verificar GitHub Actions e produÃ§Ã£o.
8. Reportar entregue, evidÃªncia, pendÃªncias e prÃ³ximos passos.

**Checklist UI:** tela estreita, toque/carrossel, busca/filtros, link externo, mapa, tema claro/escuro, fallback de rede, acessibilidade.

**Incidentes:** informaÃ§Ã£o errada â†’ corrigir/retirar e registrar; reclamaÃ§Ã£o de direitos â†’ suspender conteÃºdo contestado atÃ© apuraÃ§Ã£o; falha no deploy â†’ conferir workflow; CDN indisponÃ­vel â†’ agenda deve continuar Ãºtil.

**Fluxo editorial futuro (nÃ£o implementado):** discovered â†’ pending_review â†’ verified â†’ published â†’ expired/cancelled.

**Regras de operaÃ§Ã£o:** nÃ£o commitar perfis de Chrome, screenshots de debug, segredos ou scripts temporÃ¡rios; nÃ£o presumir deploy concluÃ­do enquanto workflow estiver em execuÃ§Ã£o. Registrar decisÃµes em `docs/DECISIONS.md`.

## Falha de QA e correÃ§Ã£o â€” 2026-10-28
Um mapa que carregava corretamente foi publicado com rÃ³tulos sobrepostos e calor desproporcional a um evento. **Carregamento nÃ£o equivale a aprovaÃ§Ã£o visual.** Toda mudanÃ§a cartogrÃ¡fica exige captura em viewport mÃ³vel realista, tema claro/escuro, verificaÃ§Ã£o de legibilidade, ausÃªncia de sobreposiÃ§Ã£o e adequaÃ§Ã£o semÃ¢ntica do heatmap. EvidÃªncia inicial: [captura do mapa em Chrome mobile emulado](map-qa-mobile.png). A captura Ã© de emulaÃ§Ã£o, nÃ£o teste em aparelho fÃ­sico.

**Regressão cartográfica:** verificar também data com somente 1 evento: halo visível, localizado e discreto, marcador clicável e legenda coerente. Omitir calor somente quando não houver evento mapeado.


## Verificação do ciclo Build Web Apps — 2026-11-02
Fluxo afetado: entrada na agenda → filtro de data/mês/categoria → detalhe de evento → compartilhar/baixar .ics → voltar → mapa (calendário, seleção, popup e retry). Priorizar GitHub Actions já existente e navegação real antes de considerar testes aprovados.

**Comandos existentes/atualizados:**
```bash
node scripts/check-site.cjs
node scripts/validate-events.cjs
node scripts/test-event-ux.cjs
node scripts/test-venue-location.cjs
node scripts/test-image-rights.cjs
node scripts/test-licensed-photos.cjs
node scripts/test-media-selection.cjs
node scripts/test-map-popup.cjs
# Gate editorial futuro, NÃO condição do catálogo experimental:
node scripts/validate-events.cjs --beta
```

O modo experimental do validador acusa integridade inválida como erro e dados incompletos como alertas; não confundir warnings com revisão humana. O modo beta exige `status: verified` + `lastVerifiedAt` para cada registro visível e, se não houver horário, `editorialException` individual com `approved: true`, `reviewedAt`, `reason` e `sourceEvidenceUrl`. Esses campos não devem ser preenchidos automaticamente sem auditoria. Revisão e fonte continuam exigidas também para imagens, preços e links.

**QA manual obrigatório antes de aceitar:** viewport móvel e desktop, teclado, tema claro/escuro, hoje/amanhã/fim de semana (inclusive mudança de mês), mês futuro, zero resultados, retorno à agenda e ao mapa, .ics importado, share API/cópia, CDN indisponível/retry, arquivo auxiliar JSON ausente, mapa com 0/1/muitos eventos e legenda sem inferir fluxo humano. Quando não houver navegador disponível, reportar QA pendente, mesmo com teste Node e CI verdes.

**Publicação:** commit no `main` pode iniciar deploy automático; verificar Actions e site real separadamente. Versão do código, deploy concluído, dados auditados e aceite do Cliente são estados distintos. Em 02/11/2026 a origem antiga `wagarcdev.github.io/partiufloripa/` respondeu HTTP 404 e a nova `archersland.github.io/partiufloripa/` respondeu HTTP 200; gerador de URLs canônicas corrigido para a nova origem. Verificar pós-deploy também o HTML das páginas geradas.
