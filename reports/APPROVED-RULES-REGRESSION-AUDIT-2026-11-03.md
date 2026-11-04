# Inventário de regressão — regras aprovadas do PartiuFloripa
Data do ciclo: 03/11/2026. Destino de implementação: `fix/horizonte-dialogs-media-20261103` (prévia **sem deploy público**).

## Escopo e método
Confrontados `docs/DECISIONS.md` (ADR-001 a ADR-040, incluindo homologação provisória desta conversa), `docs/REQUIREMENTS.md` (RF-01 a RF-40), implementação HTML/CSS/JS, cadastro de eventos/locais, workflows e testes Node/Chrome existentes. Registro auditável item a item em `docs/REGRESSION-COVERAGE.json`, cuja completude é verificada por `scripts/test-regression-inventory.cjs` no CI. Evidência está vinculada à execução real do script, não somente à existência de uma classe; `automated` cobre apenas a parte automatizável.

## Resultado do inventário
- ADR (40 identificadores): {"automated":18,"partial":14,"deferred":1,"superseded":7}.
- RF (40 identificadores): {"partial":16,"deferred":2,"automated":18,"superseded":4}.
- Testes novos: `test-approved-business-rules.cjs` (escopo sem pagamentos/social/ads, categorias, links estáveis, beta negado sem revisão, datas entre anos, calendário, regras de audiência, localizações, imagens condicionadas à prévia), `test-regression-inventory.cjs` (nenhuma decisão aprovada sem classificação/evidência; testes `automated` realmente ligados à CI). `test-generated-details.cjs` ampliado para **todas** as URLs de evento, com canonical, OpenGraph, id, robots, base path e scripts, não apenas três amostras.
- Gates antes dispersos e fora do workflow principal passam a rodar sempre na CI de validação: `test-approved-feed.cjs`, `test-reconcile-candidates.cjs`, `test-review-queue.cjs` e `test-audit-catalogue.cjs`. Negativas de SSRF/permissão continuam feitas com fixtures **sem chamadas de rede**.
- `test-browser-ui.cjs` conserva interação de Agenda, Lugares, Mapa, dialogs, busca/calendário; `test-vitrine-preview.cjs` testa imagens reais somente localmente (overlay privado ignorado pelo Git).
- Não reativar o mecanismo de publicação, anúncios, scraping ou beta. `pages.yml` mantém `deploy` apenas em `main`.

## Pendências que os testes NÃO podem homologar
1. **Imagem/produção editorial:** eventos específicos, permissões de cartazes e imagens de casas, dados e agendas: conferência humana por fonte/licença.
2. **Heatmap visual:** o módulo de audiência prova referência/cálculo e os diâmetros, mas a camada qualitativa em tela não tem a mesma cobertura funcional da prévia experimental (ADR-030/031, RF-07). Não declarar completa.
3. **Mapa remoto:** tiles Esri, termos do provedor, falha CDN e contraste real em Android exigem inspeção específica.
4. **Compartilhamento e acessibilidade física:** permissões de share/clipboard e Android físico ainda sem evidência.
5. **Política editorial/privacidade/beta:** aceitação individual, links de convite e consentimento exigem decisões/verificações humanas.
6. **Divergências históricas:** requisitos RF-03/05/17/32 e ADRs antigas foram substituídos por decisões posteriores; não restaurar seu comportamento apenas para fazer teste antigo passar.
7. **Divergência entre destinos:** IDs ADR-038/039 representam assuntos distintos em `main` e no ramo da prévia. Exige reconciliação explícita antes de merge.

## Limites de validação
As classificações `automated` e `partial` **não** significam que todos os fatos do mundo estejam corretos; medem somente contratos locais observáveis. CI, deploy, inspeção do browser e homologação do Cliente são portas diferentes. O resultado exato do workflow será registrado após sua execução.

## Ampliação funcional de navegador (03/11/2026)
O E2E de Chrome também combina **busca, categoria, região e horário**, compara os eventos realmente renderizados com a projeção editorial calculada, filtra novamente por texto e restaura os quatro controles. O fluxo de **compartilhamento** é exercitado com mock da API `navigator.share` em aba isolada (verifica título e URL interna), sem compartilhar conteúdo real nem exigir permissão. Persistem os limites físicos de Android e clipboard.
