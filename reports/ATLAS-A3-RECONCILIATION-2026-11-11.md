# ATLAS A3 v0.3 — reconciliação visual (11/11/2026)

**Estado:** correção técnica experimental em branch; sem aceite visual, integração à main ou publicação autorizados.

## Referência e limites de evidência

- Referência posterior ao site publicado: **PartiuFloripa-Wireframes-HighFi-ATLAS-A3-v0.3.pdf**.
- Evidência disponível nesta sessão: capturas fornecidas pelo Cliente das pranchas PF-01 (Home/Agenda), PF-05 (Lugares) e PF-06 (Detalhes do evento), lado a lado com o portal público.
- O PDF de 8 páginas não pôde ser obtido integralmente pela URL privada; portanto esta alteração **não** se declara aderência pixel-perfect nem reconciliação das oito pranchas.
- Decisões existentes preservadas: ADR-026 (página profunda de evento), ADR-034/035 (identidade Horizonte Noturno), ADR-038 (Vitrine Noturna), ADR-033 (semântica de Lugares), mapa e dados documentados.

## Correções delimitadas

1. **Agenda desktop:** remove limitação de 780 px na composição principal a partir de 800 px; destaque do evento passa a horizontal com imagem lateral; listagem tem duas colunas quando há largura útil. Mobile permanece em coluna.
2. **Lugares:** reduz padding, tipografia e alturas dos cards, sem retirar informações nem mascarar estados. Fotografias são usadas **somente** pelo resolvedor de mídia licenciada existente; locais restantes continuam com iniciais.
3. **Detalhes:** adiciona modal acessível como melhoria progressiva para clique normal em card. Links profundos de evento permanecem acessíveis diretamente, por teclado modificador e na própria janela; página dedicada, SEO, ICS e origem editorial são preservados.
4. **QA:** amplia o teste em navegador 390/1280 px para direção do layout, largura, imagem, preservação de links, modal e densidade visual.

## Riscos e pendências

- O PDF integral e as pranchas PF-02/03/04/07/08 devem ser recuperados e comparados antes de declarar o ATLAS integralmente implementado.
- Navegador real / Android / comparação de capturas antes/depois requerem validação; teste automatizado é gate técnico, não aceite visual.
- O modal mantém aviso de registro experimental; fonte editorial não é automaticamente tratada como bilheteria oficial.
- Datas, horários, imagens, disponibilidade, heatmap, fonte e direitos continuam regidos pelos validadores e ADRs existentes. Nenhum dado de terceiro foi acrescentado.
- Publicação: somente por workflow_dispatch autorizado, após revisão técnica e aceite humano da direção visual.
