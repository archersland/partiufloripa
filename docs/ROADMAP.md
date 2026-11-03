# Roadmap — fases e gates

## F0 Fundação (agora)
- [x] Portal técnico publicado no GitHub Pages
- [x] Agenda, busca/filtros, carrossel, mapa experimental
- [x] Harness e documentação inicial versionados
- [ ] Auditar 56 eventos e 14 imagens; retirar conteúdo sem direitos demonstrados
- [ ] Conferir links, horários, cancelamentos e expiração
- [ ] QA mobile, navegadores, mapa, acessibilidade
- [ ] Contato, política de privacidade, atribuições e SEO básico

**Gate:** catálogo e UX suficientemente confiáveis para beta.

## F1 Beta e validação
- [ ] Métricas mínimas com privacidade
- [ ] Feedback, correções, cobertura editorial sustentável
- [ ] Medir descoberta, saída para bilheteria e retorno
- [ ] Avaliar domínio próprio; GitHub Pages pode hospedar domínio personalizado

**Gate:** sinais reais de utilidade, retenção e operação viável.

## F2 Monetização leve
- [ ] Rever elegibilidade AdSense para site
- [ ] Preparar posições de anúncio sem degradar UX
- [ ] Solicitar aprovação e medir impacto

**Gate:** anúncios compatíveis com experiência, regras e audiência.

## F3 Comercial (adiado)
- [ ] Só após decisão explícita: afiliados, patrocínio, destaques, contatos com casas
- [ ] Revisar obrigações fiscais/contratuais conforme modelo adotado

**Futuro condicional:** app e social apenas após tração web. Sem datas artificiais.

## Resultado de QA/auditoria em 2026-10-28
- [x] Substituir mapa esquemático defeituoso por base pronta e validar captura em Chrome mobile emulado.
- [x] Inventariar 56 eventos, 14 arquivos de imagem e 34 URLs distintas; registrar pendências.
- [x] Remover 13 associações de logo genérico como cartaz de evento.
- [ ] Revisar editorialmente os 56 registros e as 12 imagens ainda usadas.
- [ ] Validar direitos de imagem, horários ausentes, regiões genéricas e condições de uso da base Esri.
- [ ] Validar no Android físico, além da emulação.

## Ciclo autorizado — 2026-11-02 (MVP web)
Revisão detalhada: [OPT-01 a OPT-14](../reports/BUILD-WEB-APPS-REVIEW-2026-11-02.md).

- [x] Registrar as oportunidades e adicionar ao escopo do MVP filtros rápidos, compartilhar, calendário .ics, transparência editorial e distinção de precisão cartográfica.
- [x] Implementar início do mês dinâmico, evitar `Object.groupBy`, remover filtro fixo de outubro/novembro e oferecer atalhos de datas.
- [x] Implementar fallback de registros auxiliares, botão de retry do mapa e marcador regional distinto.
- [x] Implementar compartilhamento e exportação .ics com aviso de confirmação; mostrar fonte e situação editorial no detalhe.
- [x] Separar validação estrutural experimental do gate `--beta` e adicionar teste Node a workflow existente.
- [x] Atualizar documentação arquitetural, de produto, requisitos, decisões e operações.
- [x] Verificar CI e implantação técnica: Actions do commit dc30e879 concluído com sucesso; URL archersland.github.io e canonical de evento responderam HTTP 200; smoke headless mobile/desktop passou.
- [ ] Inspeção visual das capturas, QA de compartilhamento nativo, acessibilidade, importação de .ics em calendário externo e teste Android físico antes do aceite.
- [x] Corrigir `canonical` das páginas legíveis para `https://archersland.github.io/partiufloripa/` após observar 404 no endereço histórico.
- [ ] Auditar registros e direitos individuais; zero eventos com status `verified` no snapshot de 02/11.
- [ ] Configurar descoberta/atualização editorial **somente após** fontes permitidas e regras de exceção documentadas (ADR-014). Não ativar scraping.
- [ ] Aceite do beta web pelo Cliente após evidência, sem tratar deploy como homologação.

**Sem mudança de stack, backend, pagamento, app, funcionalidades sociais, publicidade ou prospecção.** Resultado de CI/QA pendente não deve ser marcado concluído.

## Auditoria Firecrawl de eventos e casas — 03/11/2026
- [x] Inventariar **56 ocorrências** e **14 locais físicos** existentes; registrar situação individual e fontes em [auditoria de novembro](../reports/VENUE-AND-EVENT-AUDIT-2026-11-03.md).
- [x] Incluir no diretório **9 novas casas**, a começar por Célula Showcase, ETC. Casa de Vinhos e Artes e Chopp do Gus; endereços textuais com evidência, sem coordenadas presumidas.
- [x] Completar metadados dos 14 locais que já apareciam nos eventos (total **23 registros** de locais no diretório, com as 3 entradas anteriores preservadas).
- [x] Acrescentar testes de cobertura e integridade do diretório ao teste existente, reaproveitando GitHub Actions.
- [ ] Resolver os conflitos **BACKWASH/NA ONDA** e **MUNDO M: Stage/Indoor**; conferir horários de Folianópolis e vínculos genéricos de bilheteria.
- [ ] Concluir revisão editorial individual, fonte primária por sessão, direitos de cartaz e acesso; não publicar novos eventos ou declarar `verified` automaticamente.
- [ ] Geocodificar entradas de casas somente mediante evidência verificável; endereços textuais não são coordenadas nem marcam automaticamente no mapa.
- [x] Validar CI de integridade do diretório: Actions run [41580131613](https://github.com/archersland/partiufloripa/actions/runs/41580131613) no commit `6a17575` terminou `success`; validação visual de novos locais sem eventos permanece fora do escopo (não há novos pins).

## Pesquisa de Centro-Leste e Ponte — 03/11/2026
- [x] Acrescentar 16 bares/casas com endereços e fontes ao `data/venues.json`: No Class, Bohô, Vodu, Boteco do Maicão Centro, Teodoro, SELVA, Opium, Ateliê 389, Desgosto, ORI Centro, Botequim Floripa, Scuna, Bar do Noel, Boteco do Alemão, Kibelândia e Barra Cô. **Total: 39 locais no registro.**
- [x] Adicionar asserções para as 16 novas casas e não existência de coordenadas inventadas em `scripts/test-venue-location.cjs`.
- [x] Registrar [proposta “Lugares”](PLACES-DISCOVERY-PROPOSAL.md) para exibir bares sem atrações, preservando agenda e heatmap.
- [ ] **Decisão de produto aberta:** aceitar ou ajustar a terceira aba “Lugares” e seu escopo antes de implementar a UI.
- [ ] Caso aprovada, modelar tipos de experiências, fontes/perfis, vínculo `event.venue`↔`venue.id`, estados sem eventos e filtros acessíveis; executar QA e CI.
- [ ] Revalidar situação de casas com sinais de fechamento; **Haôma Baixo Centro excluído** por anúncio de despedida em maio de 2026.
