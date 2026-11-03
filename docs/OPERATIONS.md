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

## QA da aba Lugares e datas compartilhadas — 03/11/2026
- Rodar o CI já existente (inclui `node scripts/test-venue-hours.cjs`, `node scripts/test-event-ux.cjs` e `node scripts/check-site.cjs`).
- Smoke em viewport 390×844 e desktop: alternar Agenda→Lugares→Mapa, verificar que filtros e painel oculto não vazam para outra aba, alternar Hoje/Amanhã/Fim de semana/data ISO; no mapa, mudar calendário e voltar a Lugares conservando a data.
- Testar filtro por bairro, funcionamento (Todos/Costuma abrir/Costuma fechar/Não confirmado) e busca sem acentos; preservar ordenação dos grupos e baixa ênfase em fechados com contraste legível.
- Simular ausência de `venue-hours.json`: todos os lugares devem virar horário não confirmado; ausência de `events.json` não deve bloquear Lugares; ausência de `venues.json` deve mostrar indisponibilidade sem dizer que não existem casas.
- Não validar horário em fonte genérica ou com mais de 90 dias de revisão; não alegar aberto agora, feriado normal ou atividade em casa sem evento. Conferir que `events.json` e potencial de público continuam independentes.
- A nova URL pode aceitar `?view=places&date=YYYY-MM-DD` para inspeção de data sem redefinir o mês da Agenda; conferir comportamento visual após deploy. QA no Android físico e aceite humano continuam pendentes.
