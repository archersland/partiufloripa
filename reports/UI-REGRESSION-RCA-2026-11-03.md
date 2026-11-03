# Incidente — regressão de UI ao adicionar Lugares (03/11/2026)

**Produto:** PartiuFloripa. **Estado:** diagnóstico confirmado, correção implementada no `main` (CI/publicação e aceite precisam ser verificados separadamente).

## Sintoma e impacto
O Cliente observou que o portal voltou para a UI anterior depois da inclusão da aba Lugares. A interface antiga era o `index.html` do GitHub Pages (estrutura mais larga, carrossel de múltiplos destaques, modo claro ou escuro dependente do sistema, cards convencionais). A interface preferida havia sido escolhida numa demonstração privada chamada **Horizonte Noturno**, com hero ilustrado, títulos editoriais, destaque principal e próximos eventos em cards horizontais pequenos.

Não foi detectada perda dos 56 eventos, 39 locais ou da grade parcial de 5 casas; o defeito principal foi **seleção errada do artefato de referência e ausência de testes de adesão ao design escolhido**.

## Causa raiz
Em 03/11/2026 a aba Lugares foi implementada diretamente no `index.html` herdado, **sem comparar com a prévia noturna aprovada** e sem documentá-la como baseline obrigatório de produto. O CI existente verificava sintaxe, estrutura de eventos, mídia, mapa e horários, mas **não** verificava identidade visual/semântica e a distribuição editorial da home; portanto “success” não significava aderência ao design do Cliente. GitHub Pages e a prévia privada eram **destinos e versões diferentes**, e foram confundidos.

## Correção
1. Recuperada a prévia privada por leitura autorizada do arquivo local real (Desktop Commander **somente nesse recurso local**, não para GitHub/Drive/CI).
2. Portados tokens, imagem decorativa original, busca, tipografia, hierarquia de card principal / próximos e paleta para `styles/horizonte-noturno.css` e `index.html`, sem substituir rotinas de eventos/mapa/locais.
3. Extraída a projeção editorial pura `scripts/home-layout.js`, mantendo lista e destaque sem duplicações e protegendo estados vazios/selected date.
4. Harmonizadas páginas `evento.html` e `creditos.html`; preservados detalhes profundos, `.ics`, links e regras editoriais.
5. Adicionados testes de **UI, domínio e integração**, além de verificação pós-deploy. Novo gate de UI detectou uma **regressão interna durante esta própria correção** (remoção não intencional de funções de Lugares ao reescrever a home); primeiro CI [41711451421](https://github.com/archersland/partiufloripa/actions/runs/41711451421) falhou, e as funções foram recuperadas da revisão anterior no commit `87740055`. Essa falha é evidência do gate funcionando, não de que o deploy falhou em produção.
6. Regra operacional: consultar `docs/UI-BASELINE-HORIZONTE-NOTURNO.md` antes de novas mudanças visuais e não aceitar alterações que removam lógica de uma aba, mesmo que a aparência corresponda à referência.

## Evidências e limites
- UI de referência privada recuperada e lida; dados e contratos atuais relidos do `archersland/partiufloripa@main`.
- Scripts de regressão versionados e acionados pelo GitHub Actions antes do Pages; teste HTTP após o deploy realiza verificação separada da experiência publicada.
- O status de CI da versão final e screenshots mobile/desktop devem ser registrados após a execução. **Commit ≠ CI verde ≠ URL atualizada ≠ aceite visual no Android.**
- Não houve coleta indevida de fontes, reuso de cartazes sem licença, novos eventos inventados ou contatos externos.
