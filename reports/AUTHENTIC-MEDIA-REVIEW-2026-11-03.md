# Inventário de mídia real — revisão privada (03/11/2026)

**Escopo:** 39 locais e 56 eventos já cadastrados. Atualização visual em branch de revisão; nenhuma mídia de reprodução pendente foi adicionada ao repositório público ou à publicação de produção.

## Política operacional
- A interface não usa mais fotografias de banco, capas ilustrativas de categoria ou retratos de artistas de eventos passados como substitutos para o evento atual.
- Somente uma imagem com vínculo à edição exata do evento pode ocupar o espaço de evento. Somente logo/foto reconhecível da casa pode ocupar o espaço de local.
- Sem imagem real identificada, exibir estado de ausência, nunca substituto genérico enganoso.
- A prévia Tailscale, isolada da produção, pode carregar um **arquivo não versionado** `data/media-review.local.json` que associa candidatos `rightsStatus: pending` a imagens. Não confundir inspeção visual com licença, aprovação, homologação ou autorização de publicação.
- A versão pública só exibe imagens específicas quando houver direitos documentados em `data/image-rights.json`. Referências do cliente, presença em site oficial e HTTP 200 não constituem licença.

## Cobertura na prévia privada
| Tipo | Identificados | Sem imagem real apta à revisão nesta rodada | Direitos documentados para publicação? |
| --- | ---: | ---: | --- |
| Logotipos/fotos de casas | **6/39** | **33/39** | Não (pendentes) |
| Imagens vinculadas a eventos específicos | **11/56** | **45/56** | Não (pendentes) |

### Casas com mídia associada
- **Bar do Espartano** — símbolo enviado pelo cliente; amostra WebP reduzida na prévia privada.
- **Floripa Comedy Club** — logotipo vermelho enviado pelo cliente; amostra WebP reduzida na prévia privada.
- **ETC. Casa de Vinhos e Artes** — wordmark enviado pelo cliente; amostra WebP reduzida na prévia privada.
- **John Bull Floripa** — imagem com logotipo obtida em `https://johnbullfloripa.com.br/wp-content/uploads/2019/03/jb-capa.jpg`; fonte de primeira parte, direitos ainda não certificados.
- **Stage Music Park** — marca identificada em material público da GB Ingressos (`https://www.gbingressos.com.br/`); origem secundária, identidade e direitos ainda a confirmar.
- **Terraza Music Park** — marca encontrada no acervo público `https://d2hnilqqbw3vnf.cloudfront.net/images/imagens/full/MJ1qtEPSxQ3Z1MrOa5WoLJP0iOn1uIVYeJ6xHZfU.jpeg`; origem secundária, identidade e direitos ainda a confirmar.

As três imagens externas foram baixadas **apenas para o diretório local, isolado e ignorado pelo Git**, nunca incorporadas à branch GitHub. Os três anexos enviados pelo cliente estão em `data:` URI restrita ao JSON local.

### Eventos com arquivos históricos existentes
- Há **12** entradas em `data/image-rights.json` associadas a 12 WebPs legados em `images/`. Todos continuam `rightsStatus: pending`.
- A prévia conecta **11** desses arquivos às edições correspondentes, com indicação explícita de **revisão privada**.
- `evt-362d49fca53d` fica **de fora**: a auditoria anterior registrou inconsistência entre o título armazenado e o conteúdo atual da URL-fonte. Revalidar antes de habilitar.
- As fotografias CC de **Gregório Duvivier** e **Vitor Kley** são reais dos artistas, mas **não** da edição exata desses eventos em Florianópolis; foram propositalmente removidas como imagem do evento.

## Pendências para completar o acervo
1. **33 casas:** confirmar identidade/logo ou foto real, verificar fonte, obter autorização/condições de uso e registrar arquivo + metadados por casa.
2. **45 eventos:** procurar material da **edição exata**, conferindo título e data, e documentar origem e direito de reprodução por ocorrência (um único poster não representa todas as edições).
3. **11+6 imagens em revisão:** reconciliar autorização, dados de titularidade e direitos comerciais antes de qualquer publicação. As três imagens enviadas pelo cliente indicam preferência visual, não prova de cessão de direitos.
4. **Arquivo vago ou fonte divergente:** deixar o espaço sem foto até confirmar; nunca atribuir falsamente uma imagem a outro local ou evento.

## Evidências de implementação
- Seletor: `scripts/media-selection.js` com `reviewOnly` + `scope=private-preview`.
- Interface: `index.html`, `scripts/detail-dialog.js`, `scripts/map-popup.js`, `evento.html` e `styles/horizonte-noturno.css`.
- Desktop: contêiner até 1.250 px, destaque em duas colunas e agenda em grade dupla a partir de 1.024 px.
- Testes: `scripts/test-media-selection.cjs`, `scripts/test-map-popup.cjs` e browser E2E `scripts/test-browser-ui.cjs`.
- Prévia: `https://desktop-nha03dh.taild59512.ts.net:8553/` (somente tailnet). Dados em `data/media-review.local.json` **não versionados**; testes de rede e integridade de arquivos não substituem aprovação visual.
