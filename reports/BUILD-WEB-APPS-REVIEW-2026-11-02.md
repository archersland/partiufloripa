# Revisão Build Web Apps — PartiuFloripa
**Data:** 2026-11-02  
**Status:** análise documentada; implementação técnica em evolução; QA no navegador e aceite do MVP pendentes.  
**Fonte:** `archersland/partiufloripa@main` (código, `events.json`, workflows, documentação) e skills instaladas `build-web-apps`.

## Contexto e escopo
Portal estático mobile-first para eventos de Florianópolis. Tecnologias existentes: HTML/CSS/JS, JSON, Leaflet + leaflet.heat, Esri e GitHub Pages. Nenhuma migração para React, Supabase ou Stripe foi autorizada/necessária. O usuário determinou em 2026-11-02 a inclusão no MVP das funcionalidades propostas na revisão e o início das correções técnicas. A decisão não autoriza scraping, publicidade, venda de ingressos, publicação de dados não auditados como verificados nem lançamento beta.

## Capacidades conferidas no plugin
- `frontend-app-builder`: direção visual e implementação fiel a proposta aprovada, com comparação visual.
- `frontend-testing-debugging`: navegador, console, interações, responsive e regressões.
- `react-best-practices`: específico para React/Next; **não se aplica** à stack atual.
- `shadcn`: útil apenas sob stack compatível; não instalar no MVP estático.
- `supabase-postgres-best-practices`: banco relacional eventual, fora da fase atual.
- `stripe-best-practices`: pagamentos, explicitamente fora do MVP.

## Inventário enumerado de oportunidades
| ID | Prioridade | Problema / oportunidade | Resultado esperado | Situação |
|---|---|---|---|---|
| OPT-01 | P0 | Mês inicial fixo em outubro/2026 | Mês inicial e meses navegáveis derivados do catálogo e data local | Implementado; QA visual pendente |
| OPT-02 | P0 | Filtro de datas prático | Hoje, Amanhã, Fim de semana, combináveis com filtros existentes | Implementado; QA visual pendente |
| OPT-03 | P0 | Erro de JSON auxiliar derruba agenda | Catálogo permanece navegável; imagens locais neutras de fallback | Implementado; QA em falha de rede pendente |
| OPT-04 | P0 | Validação estrutural conflitante com exceções editoriais | Normal aceita aviso de horário ausente; `--beta` exige evidência e revisão individual | Implementado; execução CI pendente de confirmação |
| OPT-05 | P1 | Mapa não se recupera facilmente de falha de CDN | Reinicialização possível com botão de nova tentativa | Implementado; QA de falha real pendente |
| OPT-06 | P1 | Precisão cartográfica não distinguida visualmente | Marcador regional pontilhado/âmbar; casa identificada em verde | Implementado; QA visual pendente |
| OPT-07 | P1 | `Object.groupBy` pode falhar em Android antigo | Agrupamento nativo via `Map` | Implementado; QA Android físico pendente |
| OPT-08 | P1 | URLs e navegação após transferência do GitHub | Link do repositório atualizado; investigar URL pública histórica/canonical | Parcial — origem Pages ainda precisa verificação de domínio |
| OPT-09 | P1 | Compartilhamento limitado a copiar URL manual | Compartilhar via Web Share API ou copiar link | Implementado; QA mobile pendente |
| OPT-10 | P1 | Impossibilidade de exportar à agenda pessoal | Baixar `.ics` apenas quando data/hora têm formato válido, com aviso de conferência | Implementado; interoperabilidade de calendário pendente |
| OPT-11 | P1 | Proveniência pouco visível | Fonte/domínio, registro de última checagem e aviso distinto de verificação editorial | Implementado parcialmente — faltam conferências de dados |
| OPT-12 | P1 | QA visual pontual sem rotina suficiente | Validar viewport mobile/desktop, console, mapa, cliques, estados vazios, tema | Testes Node existentes ampliados; navegador/físico pendentes |
| OPT-13 | P2 | JS/CSS/HTML concentrados em arquivos extensos | Extrair módulos por responsabilidade sem migração de stack | Iniciado pelo módulo de UX; refatoração geral adiada |
| OPT-14 | P2 | Atualização editorial manual | Descoberta automatizada apenas de fontes permitidas, exceções para revisão | Incluído no planejamento do MVP conforme ADR-014; execução bloqueada até fontes/regras autorizadas |

## Descobertas verificadas por leitura de fonte
- `events.json`: 56 registros com IDs e slugs; no snapshot analisado, 5 em quarentena, 51 elegíveis à listagem experimental, 33 com data a partir de 02/11/2026; todos sem `status: verified`, dois com `lastVerifiedAt`.
- `data/venues.json`: uma casa com coordenadas documentadas; outras posições podem ser centroides regionais, não entradas exatas.
- `scripts/generate-event-pages.cjs`: já gera páginas legíveis e `noindex` para registros não verificados; origem pública histórica hardcoded precisa revisão no destino real de Pages.
- `.github/workflows/pages.yml`: validações estruturais e por módulo já existiam; nova validação de eventos/UX adicionada.
- Direitos de imagem são controlados por registros auxiliares: não presumir licença de fotos em `images/`.

## QA, riscos e critérios de aceite
Verificação de gravação GitHub e sintaxe JS não equivale a QA do navegador, execução do workflow, publicação implantada ou homologação.
Fluxos a testar: mês corrente/virada de mês, datas rápidas cruzando meses, agenda sem resultados, busca+categorias+regiões, falhas em JSON auxiliar, CDNs indisponíveis e retry, mapa com 0/1/múltiplos pontos, detalhe, compartilhamento, arquivo .ics e retorno ao mapa; mobile 360–390px + desktop, claro/escuro e teclado.
A versão pública permanece experimental até auditoria editorial, direitos, privacidade, fonte válida, QA e aceite expresso do cliente. A publicação automática técnica no Pages não representa lançamento comercial/beta.

## Decisões / dependências
A inclusão de melhorias leves no web MVP foi autorizada pelo Cliente. Não iniciar coleta automatizada de terceiros sem fonte e permissão verificadas; preservar ADR-014/016/017/021/023/024/025/026. Não implementar recomendações de eventos relacionados (ADR-020). Estratégia vigente: corrigir a stack estática, sem reescrita de framework, CI existente e controles proporcionais ao risco.
