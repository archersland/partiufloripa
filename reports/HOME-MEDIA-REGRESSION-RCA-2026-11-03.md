# Incidente — recursos visuais da Home e Lugares (03/11/2026)

## Relato e causa verificada
O Cliente reportou ausência da imagem do cabeçalho, eventos com fotos genéricas e locais sem imagens de perfil após a mudança para **Vitrine Noturna** (ADR-038). A comparação com o commit anterior `ab8f22d` mostrou que a última alteração apenas mudou o HTML/CSS dos cards da lista: **a declaração inválida do fundo, o renderer de Lugares com `⌖` e o fallback ilustrativo dos eventos já existiam antes.** O CI aprovava tokens/CSS por presença textual, sem confirmar se a declaração `background` era semanticamente aceita pelo navegador; o teste HTTP também não validava imagens carregadas.

- **Fundo:** CSS original `background:#08252d linear-gradient(...),url(...) center 44%/cover no-repeat` mistura uma cor de fundo na primeira camada de múltiplos backgrounds, invalidando a declaração. O WebP original continua embutido; a correção usa `background-color`, `background-image`, `background-position`, `background-size` e `background-repeat` separados.
- **Lugares:** os 39 registros eram exibidos como listas com símbolo estático; 14 têm mapeamento de **fotos ilustrativas genéricas licenciadas**, mas o renderer não as consumia. Não existem direitos comprovados de fotos reais de perfil das 39 casas. A correção reabilita imagens ilustrativas **rotuladas**, apenas para os 14 mapeamentos explicitamente aprovados, com monogramas neutros nos outros 25. É incorreto chamar essas ilustrações de fotos reais das casas.
- **Eventos:** `media-selection.js` continua selecionando quatro fotos aprovadas de arquivo de artistas, mais fallback com fotos ilustrativas por casa/categoria. Doze cartazes históricos estão `rightsStatus: pending`; não restaurar publicamente esses cartazes sem documentação de direitos. A seleção atual não foi revertida por defeito de lógica do commit ADR-038. Recuperar cartazes genuínos é trabalho editorial com autorização de uso, separado do reparo de interface.

## Ações e proteção de regressão
1. Corrigir a sintaxe CSS do cabeçalho sem trocar a imagem embutida.
2. Expor o seletor de fotografias licenciadas dos lugares e renderizar as 14 ilustrações permitidas, identificadas como tal; fallback neutro nos demais.
3. Endurecer `test-ui-baseline.cjs`, `test-media-selection.cjs` e adicionar `test-visual-assets.cjs` (WebP + direitos + cenário negativo).
4. Adicionar smoke real de Chromium (mobile 390 e desktop 1280) ao CI: `backgroundImage` computado, carregamento `naturalWidth` das 14 imagens, 25 fallbacks, legenda e ausência de overflow.
5. No pós-deploy, exigir CSS com declaração válida e comprovar integridade HTTP/WebP de imagem licenciada. Testes unitários, deploy e experiência visual humana continuam gates diferentes.

## Limites
A seleção de **Vitrine Noturna** e o guia visual Horizonte Noturno v0.4 permanecem aprovados e não sofrem rollback. Fotos ilustrativas não são imagens reais das casas/eventos. Capturas humanas e QA Android precisam ser confirmados após o deploy. Publicação e CI só podem ser declarados concluídos após readback do destino correspondente.