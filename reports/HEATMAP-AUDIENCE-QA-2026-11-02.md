# Potencial de público — evidências de implementação

Regra v1: `docs/HEATMAP-BUSINESS-RULES.md`; decisão ADR-029. Solicitação do Cliente em 02/11/2026: documentar e implementar no site para validação. Aceite visual do Cliente permanece pendente.

## Implementado
- Previsão com fonte prevalece sobre capacidade pesquisada; escala fixa de 10 mil, sem normalização diária.
- Registro de 14 casas: três referências utilizáveis, duas em disputa e nove pendentes. Capacidade desconhecida não recebe peso inventado.
- Deduplicação, sobreposição de sessões com término conhecido e fallback conservador para duração desconhecida.
- Popup com referência, fonte e data; legenda de potencial, sem alegar medição de público.
- UI privada Editorial Noturno preservada; alteração cirúrgica do bundle com backup anterior, separada do HTML legado do main.
- Vínculo regional documentado de Teatro Ademir Rosa e Cinema Gilberto Gerlach ao CIC/Agronômica; continua ponto aproximado, sem fabricar entrada exata.

## Verificações executadas
- Node: cálculo de capacidade/previsão, zero, evidência ausente, limites, deduplicação, intervalos adjacentes, sobreposição e virada de meia-noite; todos passaram.
- Sintaxe do bundle privado após o patch e readback do arquivo gravado.
- Navegador Chrome headless, viewports 390×900 e 1440×900: 03/11 (capacidade desconhecida, marcador sem calor), 10/11 (calor e popup com 906 e fonte) e 09/11 (estado vazio). Sem erros JS ou overflow horizontal. Data preservada ao retornar a Eventos.
- HTTPS privado respondeu 200 com a revisão incorporada. Capturas e log permanecem no dispositivo em `AgentBrowser/partiu-audience-*`; não é teste em Android físico.
- CI existente: [run 97](https://github.com/archersland/partiufloripa/actions/runs/41512617665), commit `32f690e`: validação, todos os testes do workflow e deploy concluíram com sucesso. A correção regional posterior tem commit/run próprios; consultar Actions pelo SHA atual.

## Limitações
O snapshot textual usado em scratch não inclui os binários de imagens: o validador local completo acusou 12 caminhos de imagem ausentes. No checkout completo do CI, `validate-events.cjs` e os testes de imagens passaram; não foram criados placeholders nem relaxadas verificações. Permanecem avisos editoriais do catálogo experimental, sem homologação dos eventos. Não há previsão específica de público verificada no catálogo; o caminho está implementado e coberto por fixtures de teste que não são publicadas como eventos reais. Stage/Terraza aguardam esclarecimento das capacidades divergentes.

Rollback privado: restaurar o HTML `.before-audience-v1` preservado junto à prévia; módulos/documentação podem ser revertidos por commit. Não alterar serviço, acesso Tailscale ou outros sites.
