# PartiuFloripa

Portal web, mobile-first, para descobrir eventos e entretenimento em Florianópolis.

**Produto em Discovery/MVP (atualizado em 02/11/2026).** O catálogo continua experimental: datas, horários, permissões e links exigem auditoria. Interface implementada não equivale a QA, publicação implantada ou beta aprovado.

- URL histórica do GitHub Pages (continuidade após transferência ainda precisa verificação): https://wagarcdev.github.io/partiufloripa/
- Código: https://github.com/archersland/partiufloripa
- Stack: HTML/CSS/JS estático, `events.json`, Leaflet + leaflet.heat, GeoJSON local e GitHub Pages.
- Sem backend, login, bilheteria ou processamento de pagamentos.

## Por onde começar
1. [AGENTS.md](AGENTS.md) — protocolo curto para agentes.
2. [docs/PRODUCT.md](docs/PRODUCT.md) — visão, escopo e usuários.
3. [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) — requisitos e aceite.
4. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — implementação e contrato de dados.
5. [docs/ROADMAP.md](docs/ROADMAP.md) — prioridades e gates.
6. [docs/OPERATIONS.md](docs/OPERATIONS.md) — rotina, testes, publicação e incidentes.
7. [docs/SOURCES-AND-RIGHTS.md](docs/SOURCES-AND-RIGHTS.md) — coleta, proveniência e direitos.
8. [docs/DECISIONS.md](docs/DECISIONS.md) — decisões e motivos.
9. [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) — hipóteses não confirmadas.

## Estado de implementação (2026-11-02)
- Catálogo de 56 ocorrências em `events.json` (5 quarantined, 51 elegíveis à demonstração experimental; 33 com data a partir de 02/11); IDs estáveis/slugs, cards, detalhe, busca, filtros, carrossel, meses dinâmicos e atalhos Hoje/Amanhã/Fim de semana.
- Mapa Leaflet/Esri com calendário nativo, calor dos eventos noturnos cadastrados e marcadores de precisão aproximada; **não** representa densidade de pessoas. Retry após falha do carregamento.
- 14 imagens locais históricas e registros separados de licenças de fotografias ilustrativas; artes de eventos sem direitos documentados não são automaticamente utilizadas.
- Compartilhamento pelo navegador, link copiável e exportação .ics quando houver data e hora válidas, com aviso de conferência. Metadados de fonte e situação editorial no detalhe. Deploy automático ao atualizar `main`, condicionado aos checks.
- Não há métricas de audiência, AdSense ativo, programa de afiliados, aprovação comercial ou direitos de imagem documentados.

## Desenvolvimento
Abrir `index.html` via servidor HTTP local (não via `file://`, porque há `fetch` de arquivos JSON). Exemplo: `python -m http.server 8000`. Verificação básica: `node scripts/check-site.cjs`, `node scripts/validate-events.cjs`, `node scripts/test-event-ux.cjs` e testes de módulos; gate editorial futuro: `node scripts/validate-events.cjs --beta` (não passa sem auditoria individual). Alterações entram por commit e deploy do GitHub Actions.

## Governança
Este repositório é a fonte da verdade **do PartiuFloripa**. Mudanças de escopo, arquitetura, conformidade ou estratégia devem atualizar a documentação correspondente no mesmo commit. Não presumir que documentos de outros projetos se aplicam aqui.

## Revisão de melhoria do MVP
As capacidades Build Web Apps e oportunidades OPT-01 a OPT-14 estão [documentadas](reports/BUILD-WEB-APPS-REVIEW-2026-11-02.md). O [roadmap](docs/ROADMAP.md) discrimina código implementado, testes, pendências editoriais e aceite do beta. Não ativar scraping ou novas campanhas sem permissão.
