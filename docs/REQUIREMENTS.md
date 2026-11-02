# Requisitos e aceite

Status: protÃ³tipo tÃ©cnico, nÃ£o catÃ¡logo auditado.

| ID | Requisito | Estado | Aceite |
|---|---|---|---|
| RF-01 | Agenda | Implementado | Data, horÃ¡rio, tÃ­tulo, casa, categoria, fonte legÃ­veis |
| RF-02 | Busca e filtros | Implementado; QA pendente | CombinaÃ§Ãµes funcionam e reset recupera agenda |
| RF-03 | Carrossel touch | Implementado; QA pendente | Desliza no mobile sem setas |
| RF-04 | Tema do sistema | Implementado; QA pendente | Claro/escuro respeitam preferÃªncia |
| RF-05 | Casa em destaque | Implementado | Casa precede tÃ­tulo nos cards |
| RF-06 | Mapa com layer Esri | Implementado; QA pendente | Tiles carregam, atribuicao/licenca verificada, agenda acessivel se o mapa falhar |
| RF-07 | Heatmap de eventos noturnos | Implementado; QA pendente | Halo discreto com um evento mapeado, marcador clicavel e sem calor com zero eventos; nao representa pessoas |
| RF-08 | Card abre detalhe interno; CTA externo | Implementado; QA/auditoria pendente | Card inteiro abre evento interno por toque/Enter; apenas CTA abre a fonte oficial correspondente |
| RF-09 | Dados verificados | Pendente | 100% dos eventos publicados conferidos |
| RF-10 | Direitos/proveniÃªncia | Pendente | Fonte, data de checagem e licenÃ§a de imagem registradas |
| RF-11 | SEO | Pendente | Metadados e indexaÃ§Ã£o revisados |
| RF-12 | Analytics/privacidade | Pendente | MÃ©tricas e aviso adequado ao tratamento real |
| RF-13 | Contato e polÃ­tica | Pendente | Canal de correÃ§Ã£o/retirada e polÃ­tica publicados |
| RF-14 | AdSense | Futuro | Elegibilidade e aprovaÃ§Ã£o confirmadas |
| RF-15 | Afiliados | Adiado | Nova decisÃ£o apÃ³s traÃ§Ã£o |

**NÃ£o funcionais:** responsivo, rÃ¡pido em rede mÃ³vel, acessÃ­vel via teclado, sem segredos no cliente, agenda funcional quando mapa falhar, datas locais consistentes, dependÃªncias externas identificadas.

**Gates:** publicaÃ§Ã£o tÃ©cnica exige JSON/JS vÃ¡lidos e navegaÃ§Ã£o funcional; beta exige auditoria editorial/direitos, QA, contato e privacidade; anÃºncios exigem conformidade e aprovaÃ§Ã£o.

**RF-16 — Identificação visual da categoria (implementado; QA mobile pendente):** todo card, com ou sem imagem, exibe ícone e nome legível da categoria; filtro de categoria usa os mesmos símbolos. Ícones não substituem texto.


**RF-17 — Fallback visual em cards (implementado; QA visual pendente):** sempre exibir capa, priorizando imagem do evento, depois imagem da casa com identificação explícita, senão arte de categoria; preservar legibilidade, acessibilidade e evitar foto genérica enganosa.


## Expansão de MVP autorizada em 2026-11-02 — aceitação técnica ainda pendente
| ID | Requisito | Implementação | Critério verificável |
|---|---|---|---|
| RF-18 | Meses dinâmicos | Código implementado; QA pendente | Abrir no mês atual com registros, incluindo meses futuros sem editar HTML/JS |
| RF-19 | Datas rápidas | Código implementado; QA pendente | Hoje, Amanhã e Fim de semana combinam com filtros; datas atravessando meses funcionam |
| RF-20 | Compartilhar evento | Código implementado; QA pendente | Compartilhamento nativo quando possível, cópia do link quando não; sem conta |
| RF-21 | Exportar calendário | Código implementado; QA pendente | .ics com título, início America/Sao_Paulo, local e URL; ausência de horário impede exportação; mostrar aviso de conferência |
| RF-22 | Transparência editorial | Código parcialmente implementado; dados pendentes | Fonte reconhecível, data de checagem quando existente e distinção explícita entre registro experimental e verificado |
| RF-23 | Diferenciar precisão geográfica | Código implementado; QA pendente | Marcador regional distinto; popup acessível identifica aproximação e não representa lotação |
| RF-24 | Catálogo disponível sem JSON auxiliar | Código implementado; QA pendente | Falha de registros auxiliares não interrompe agenda; arte neutra de fallback |
| RF-25 | Recuperação do mapa | Código implementado; QA pendente | Erro de rede mostra tentar novamente; lista continua utilizável |
| RF-26 | Atualização editorial assistida | Escopo aprovado, execução pendente | Fonte/método/permite uso verificados, exceções humanas, sem scraping indevido |
| RF-27 | Compatibilidade e regressão | Sintaxe e teste Node adicionados; navegador pendente | Sem Object.groupBy; teste mobile, desktop, teclado, 0/1/muitos eventos no mapa |
| RF-28 | Validação editorial por estágio | Código implementado; QA CI pendente | `validate-events.cjs` valida integridade no protótipo, `--beta` exige revisão individual/evidências, sem proclamar beta |

**Observação:** nenhuma das linhas marcadas "código implementado" equivale a aceite visual/produção/beta. O ambiente público existente é experimental. A aprovação de escopo pelo cliente não dispensa verificações, direitos nem aprovação final do beta.

### Evidência proporcional do ciclo (02/11/2026)
Os testes Node existentes e novos passaram em clone temporário; smoke de Chromium headless cobriu mobile 390×844, desktop 1280×800, 33 cards futuros, datas rápidas, detalhe, exportação real de .ics, mapa com evento e falha isolada de JSON auxiliar sem perder agenda. GitHub Actions do commit 3ed4c2d concluiu com sucesso; versão final e páginas geradas devem ser verificadas após a correção de canonical. **QA de share nativo/clipboard, retry de CDN, inspeção visual e aparelho Android físico pendentes**, portanto manter RF-18 a RF-28 sem aceite visual final. A URL de Pages confirmada é `https://archersland.github.io/partiufloripa/`.
