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
- [ ] Verificar execução do CI no commit final, comprovar implantação e realizar QA com navegador em Android/desktop, incluindo acessibilidade.
- [ ] Verificar domínio real do GitHub Pages após transferência antes de alterar `canonical` e outros vínculos.
- [ ] Auditar registros e direitos individuais; zero eventos com status `verified` no snapshot de 02/11.
- [ ] Configurar descoberta/atualização editorial **somente após** fontes permitidas e regras de exceção documentadas (ADR-014). Não ativar scraping.
- [ ] Aceite do beta web pelo Cliente após evidência, sem tratar deploy como homologação.

**Sem mudança de stack, backend, pagamento, app, funcionalidades sociais, publicidade ou prospecção.** Resultado de CI/QA pendente não deve ser marcado concluído.
