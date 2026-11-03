# PartiuFloripa — Registro histórico: estudo da UI legada (v0.1)

**Registro:** PF-UX-HIST-001  
**Data do estudo:** 03/11/2026  
**Classificação:** HISTÓRICO / SUPERADO COMO BASE PARA O DESIGN ATUAL  
**Produto:** PartiuFloripa (portal web)  
**Tipo:** inventário reverso, wireframes interpretativos de alta fidelidade e UI Style Guide ilustrativo  
**Aceite do Cliente:** NÃO APROVADO COMO REPRESENTAÇÃO DA UI MAIS RECENTE  
**Escopo deste registro:** preservar a tentativa anterior; não altera a interface, a navegação ou decisões de produto.

## 1. Contexto e origem

Este pacote foi produzido a partir da leitura de `archersland/partiufloripa@main` (`index.html`, `evento.html`, `creditos.html`) e documentos do repositório, sem confrontar a **última versão noturna desenvolvida no servidor privado** com uma captura real. A branch `main` consultada estava no commit `2afaf4c64b6471269d745913675a3a641d6b044b` durante a revisão posterior.

O estudo foi inicialmente apresentado como levantamento da interface existente. O Cliente rejeitou essa premissa: o visual representado estava várias versões atrás da referência que ele pretendia, embora a análise tivesse detectado uma aba **Lugares** no código consultado. Portanto, a apresentação anterior **não é um documento de aprovação visual, não substitui a referência mais recente e não deve orientar implementação atual**.

O erro metodológico foi tratar a implementação pública no GitHub como versão visual canônica sem localizar e verificar o artefato privado mais recente. Os mockups são reconstruções do estudo, **não screenshots autênticos do site em produção**.

## 2. Telas contempladas na tentativa

| ID | Tela / experiência | Elementos representados | Observação |
| --- | --- | --- | --- |
| PF-H01 | Agenda | busca, datas rápidas, carrossel, meses, filtros e cards horizontais | estudo da UI legada; não corresponde à última diagramação noturna aprovada |
| PF-H02 | Lugares | busca, bairro, funcionamento habitual, grupos e cards de locais | derivado do `index.html` consultado; não comprova a aparência da versão privada mais recente |
| PF-H03 | Mapa | calendário, visualização de eventos, marcadores e legenda de potencial de público | mapa desenhado no mockup, não captura do Leaflet/Esri em execução |
| PF-H04 | Detalhe do evento | hero editorial, dados, CTA de fonte e ações de compartilhar/calendário | referência à direção Editorial Noturno da ADR-026; reconstrução interpretativa |
| PF-H05 | Créditos | mídia de arquivo/ilustrativa, atribuições e fontes | página auxiliar de transparência |

**Subestados representados ou inventariados:** filtros, busca vazia, funcionamento habitual desconhecido, avisos editoriais, mídia fallback, erros de carregamento e retry, incerteza de localização/dados. Presença no estudo **não é QA do runtime**.

## 3. Arquivos preservados (acervo visual v0.1)

Todos os arquivos indicados abaixo são **artefatos da tentativa rejeitada**, não referências aprovadas. Os originais produzidos nesta conversa foram copiados para o acervo pessoal do projeto no ChatGPT Library, na pasta `PartiuFloripa/Arquivo-historico-UI-legada-2026-11-03`.

| Arquivo | Função | SHA-256 |
| --- | --- | --- |
| `partiufloripa-wireframes-hifi.html` | Apresentação navegável com cinco telas | `b7158a2ee64e2b67573b2902b75c4e56029cfbe562022c5af0116c642a1fd200` |
| `partiufloripa-ui-style-guide.html` | Guia ilustrativo, dez pranchas | `8bb2b9dddab35be474a5793f210fca3adc8404a865e56dcee3c78c5be39e9b63` |
| `partiufloripa-ui-style-guide-v0.1.pdf` | Exportação do guia, dez páginas | `149fe12d99c3146ed57d514dc89ff88c1d0081ddaa8f2364f2c0127e7602245b` |
| `wireframes-contato.png` | Galeria de telas | `17987c78a7a3f4bb973992477e611f21fad63f262284cd7b215565503f3d0792` |
| `guia-paginas-contato.png` | Galeria das pranchas | `e764efb252d971b23e35ace0057250a44914a6beac33cbd8516e1d6f1396bdf1` |
| `levantamento-telas-partiufloripa-v0.1.md` | Inventário original tal como entregue | cópia preservada, sujeita à presente retificação de status |

Renderizações individuais complementares: `wireframe-agenda-completo.png`, `wireframe-places-completo.png`, `wireframe-map-completo.png`, `wireframe-detail-completo.png`, `wireframe-credits-completo.png`. Identificadores históricos **PF-H01 a PF-H05** não substituem IDs de telas atuais.

## 4. O que permanece como fato vs. o que foi rejeitado

- **Fato do código consultado:** a branch `main` continha as abas Agenda, Lugares e Mapa, além da página de detalhe e créditos. Isso é apenas evidência daquela revisão do repositório, não um inventário definitivo da versão privada.
- **Fato das diretrizes:** Archersland Design v0.3 RELEASED e Diretriz de UI Style Guides v0.4 RELEASED orientam formato e clareza do material, **não** aprovam automaticamente a estética aplicada.
- **Direções anteriores do projeto:** a preferência do Cliente era por uma proposta **noturna** mais recente, com seção de eventos do dia separada dos próximos e cards horizontais com miniaturas. O estudo rejeitado não demonstrou fidelidade a essa referência.
- **Incerteza pendente:** não há nesta evidência uma captura verificada da versão privada final nem endereço/commit que permita apontá-la como fonte visual canônica.
- **Dados ilustrativos:** eventos, horários, público, estados e imagens usados nas pranchas não são um catálogo editorial auditado. Nenhuma métrica ou movimentação real de pessoas foi medida.

## 5. Estado, autoridade e próximos passos

**Estado final deste pacote:** ARQUIVADO / LEGADO / NÃO APROVADO PARA IMPLEMENTAÇÃO.

**O que esta ação autoriza:** conservar a tentativa e seu inventário para rastreabilidade. **O que não autoriza:** reverter a UI atual, publicar arquivos de estudo como produto, homologar a tela Lugares, reescrever ADRs existentes ou presumir fontes/licenças.

**Próxima entrega, em tarefa separada:** localizar a última versão noturna aprovada no ambiente privado; verificar identidade, acesso e persistência; capturar Agenda, Lugares, Mapa, Detalhe e telas auxiliares reais; reconstruir wireframes fiéis; produzir novo UI Style Guide conforme os padrões Archersland; apresentar provas de comparação visual, QA e pendências ao Cliente. **Não usar os mockups deste acervo como referência primária.**

**Publicação:** este registro está destinado a branch documental separada, pois alterações em `main` disparam o GitHub Pages. Não foi autorizado deploy.

## 6. Fontes para auditoria

- [Repositório do PartiuFloripa](https://github.com/archersland/partiufloripa)
- [Guia de cards A1.10](https://github.com/archersland/partiufloripa/blob/main/docs/UI-CARDS-A1.10.md)
- [Decisões do projeto](https://github.com/archersland/partiufloripa/blob/main/docs/DECISIONS.md)
- [Diretriz de Design v0.3 da Archersland](https://github.com/archersland/archersland-governance/blob/main/ORGANIZATION/DEPARTMENTS/DESIGN-UX/DIRETRIZ-DE-DESIGN.md)
- [Diretriz de Produção de UI Style Guides v0.4 da Archersland](https://github.com/archersland/archersland-governance/blob/main/ORGANIZATION/DEPARTMENTS/DESIGN-UX/REFERENCIA-UI-STYLE-GUIDES.md)