# Inventário de mídia real — revisão privada 03/11/2026

**Estado:** proposta visual em prévia Tailscale; NÃO é catálogo licenciado, deploy comercial ou aprovação editorial.

## Resultado e contrato
- Layout desktop ampliado para 1190–1250 px, destaque editorial horizontal, lista de próximos dias em duas colunas, Lugares em três; mobile preservado.
- Política pública do seletor: imagem do **evento específico** só com direito evidenciado. Foto/logo de **casa real** apenas se vinculada à própria casa; nunca emprestar logo da casa como poster de evento. Sem correspondência: estado vazio textual, não fotografia stock ou SVG genérico.
- Revisão privada: arquivo `data/media-review.local.json` e diretório `assets/venue-review/` existem só na prévia local, estão protegidos por `.gitignore`. Permite mostrar arquivos `pending` ao Cliente para avaliar visualmente sem colocá-los no GitHub público ou publicar no Pages.
- 56 eventos catalogados: **12** associações a posters/imagens históricas já armazenadas em `images/`, todas `rightsStatus: pending`; **44** ainda sem imagem específica associada. Não afirmar que as 12 continuam válidas ou que são autorizadas; conferência de evento/capa e licença pendente.
- 39 casas: **8** arquivos de mídia real identificável para revisão privada (3 anexos do Cliente, 5 fotografias/logos encontrados em páginas públicas); **31** ainda sem imagem específica segura. Localização/identidade dos estabelecimentos não equivale a licença de imagem.
- A fonte, a data e o titular dos oito arquivos precisam de confirmação para publicar; copiar marca de site oficial ou receber referência do Cliente não confere licença de reprodução comercial. **Não fazer merge/publicação de imagens sem novo gate documental.**
- Pesquisa pontual em fontes públicas e no acervo local: não houve scraping da Sympla, prospecção ou contato comercial.

## Casas — cobertura total

| Casa (ID) | Situação de mídia | Referência / origem identificada |
|---|---|---|
| Floripa Comedy Club (`floripa-comedy-club`) | Em prévia privada: logo fornecido pelo Cliente | Anexo enviado 03/11/2026 |
| Teatro Ademir Rosa (`teatro-ademir-rosa`) | Pendente: sem foto real selecionada | https://www.mostradecinemainfantil.com.br/feriadao-do-dia-das-criancas-mostra-ira-exibir-filmes-premiados-e-historias-para-toda-a-familia/ |
| Cinema Gilberto Gerlach (`cinema-gilberto-gerlach`) | Pendente: sem foto real selecionada | https://www.mostradecinemainfantil.com.br/feriadao-do-dia-das-criancas-mostra-ira-exibir-filmes-premiados-e-historias-para-toda-a-familia/ |
| Bar do Espartano (`bar-do-espartano`) | Em prévia privada: logo fornecido pelo Cliente | Anexo enviado 03/11/2026 |
| Stage Music Park (`stage-music-park`) | Pendente: sem foto real selecionada | https://musicpark.com.br/agenda/ |
| Terraza Music Park (`terraza-music-park`) | Pendente: sem foto real selecionada | https://terrazamusicpark.com.br/ |
| MIS/SC (`mis-sc`) | Pendente: sem foto real selecionada | https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 |
| Teatro Pedro Ivo (`teatro-pedro-ivo`) | Pendente: sem foto real selecionada | https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 |
| Teatro Álvaro de Carvalho (`teatro-alvaro-de-carvalho`) | Pendente: sem foto real selecionada | https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 |
| Passarela Nego Quirido (`passarela-nego-quirido`) | Pendente: sem foto real selecionada | https://www.pmf.sc.gov.br/entidades/cultura/index.php?cms=passarela+nego+quirido&menu=9&submenuid=2107 |
| Delfino 146 (`delfino-146`) | Pendente: sem foto real selecionada | https://delfino146.com.br/ |
| Balbúrdia Florianópolis (`balburdia-florianopolis`) | Pendente: sem foto real selecionada | https://www.pensanoevento.com.br/locais/1790/balburdia-cervejeira-florianopolis |
| P12 Jurerê (`p12-jurere`) | Em prévia privada: logo de perfil oficial | https://x.com/P12Jurere |
| UNDR Florianópolis (`undr-florianopolis`) | Pendente: sem foto real selecionada | https://undr.com.br/eventos/halloween-festa-a-fantasia-open-bar-2/ |
| Célula Showcase (`celula-showcase`) | Pendente: sem foto real selecionada | https://www.instagram.com/celulashowcase/ |
| ETC. Casa de Vinhos e Artes (`etc-casa-de-vinhos`) | Em prévia privada: marca fornecida pelo Cliente | Anexo enviado 03/11/2026 |
| Chopp do Gus (`chopp-do-gus-corrego-grande`) | Em prévia privada: fotografia histórica de porta-copos da casa | https://www.tripadvisor.com/Restaurant_Review-g303576-d7381620-Reviews-Chopp_Do_Gus-Florianopolis_State_of_Santa_Catarina.html |
| John Bull Floripa (`john-bull-floripa`) | Em prévia privada: marca em site oficial | https://johnbullfloripa.com.br/wp-content/uploads/2019/03/jb-capa.jpg |
| Bugio Centro (`bugio-centro`) | Pendente: sem foto real selecionada | https://www.cervejariabugio.com.br/ |
| Bugio Trindade (`bugio-trindade`) | Pendente: sem foto real selecionada | https://www.cervejariabugio.com.br/ |
| Berlin Floripa (`berlin-floripa`) | Pendente: sem foto real selecionada | https://berlinfloripa.com.br/ |
| Galeria Lama (`galeria-lama`) | Pendente: sem foto real selecionada | https://www.galerialama.com.br/ |
| Franz Cabaret (`franz-cabaret`) | Em prévia privada: logo em site oficial | https://www.franzcabaret.com/ |
| No Class (`no-class`) | Pendente: sem foto real selecionada | https://www.pensanoevento.com.br/locais/394/no-class |
| Bohô Bar & Pista (`boho-bar-pista`) | Pendente: sem foto real selecionada | https://tocaonde.com.br/events/190239-polly-jinx-sur-boho-bar-pista-florianopolis |
| Vodu Arte Bar (`vodu-arte-bar`) | Pendente: sem foto real selecionada | https://www.instagram.com/p/DesNiKajwaL/ |
| Boteco do Maicão Centro (`boteco-do-maicao-centro`) | Pendente: sem foto real selecionada | https://www.instagram.com/botecodomaicaocentro/ |
| Teodoro Bar (`teodoro-bar`) | Pendente: sem foto real selecionada | https://www.instagram.com/p/DTbjlsfkUkD/ |
| SELVA Bar Floripa (`selva-bar-floripa`) | Pendente: sem foto real selecionada | https://www.instagram.com/reel/DaeVKDeMLIQ/ |
| Opium Bar (`opium-bar`) | Pendente: sem foto real selecionada | https://floripa.lgbt/cultura/arte-drag/quarta-edicao-do-drag-battle-promete-espetaculos-imperdiveis-no-opium-bar/ |
| Ateliê 389 (`atelie-389`) | Pendente: sem foto real selecionada | https://www.pensanoevento.com.br/locais/2550/atelie-389 |
| Desgosto Bar (`desgosto-bar`) | Pendente: sem foto real selecionada | https://underfloripa.com.br/agenda/ploho/ |
| ORI Boteco Centro (`ori-boteco-centro`) | Em prévia privada: fotografia histórica do letreiro ORI | https://www.tripadvisor.com.br/Restaurant_Review-g303576-d10324407-Reviews-Mercearia_Ori-Florianopolis_State_of_Santa_Catarina.html |
| Botequim Floripa (`botequim-floripa`) | Pendente: sem foto real selecionada | https://ilovefloripa.com.br/lugar/botequim-floripa |
| Scuna Bar Club (`scuna-bar-club`) | Pendente: sem foto real selecionada | https://scunabar.com.br/ |
| Bar do Noel (`bar-do-noel`) | Pendente: sem foto real selecionada | https://tocaonde.com.br/venues/1007441-bar-do-noel-florianopolis |
| Boteco do Alemão (`boteco-do-alemao`) | Pendente: sem foto real selecionada | https://www.instagram.com/bardoalemaofloripa/ |
| Kibelândia Chopperia (`kibelandia-chopperia`) | Pendente: sem foto real selecionada | https://www.instagram.com/kibelandiafloripa/ |
| Barra Cô Drinks e Shots (`barra-co`) | Pendente: sem foto real selecionada | https://floripa.lgbt/vida-noturna/bares-lgbt-em-florianopolis/ |

## Eventos — 12 arquivos existentes em revisão

| Evento | Data | ID | Arquivo já presente | Fonte cadastrada |
|---|---|---|---|---|
| NA ONDA convida: atração a confirmar | 2026-11-14 | `evt-362d49fca53d` | `./images/d9f1bf5a34da234e.webp` | https://www.pensanoevento.com.br/eventos/108084/na-onda-convida-rj |
| Brow Malaquias e Felipe Pansolin — Os Folgados | 2026-10-27 | `evt-860906acdacb` | `./images/185e5b932c71e5bb.webp` | https://www.pensanoevento.com.br/eventos/108712/brow-malaquias-e-felipe-pansolin-os-folgados-21h |
| Luã Lima — Devaneios de um Manezinho | 2026-10-28 | `evt-8cb45e74aaa8` | `./images/c73b2d20916be4f1.webp` | https://www.pensanoevento.com.br/eventos/109308/lua-lima-devaneios-de-um-manezinho-21h |
| Daniel Duncan | 2026-10-29 | `evt-3ebafd721fc1` | `./images/4f84cc1149ea1873.webp` | https://www.pensanoevento.com.br/eventos/107475/daniel-duncan-21h |
| Fábio Güere — Inutilidade Pública | 2026-10-30 | `evt-5eb7218d6443` | `./images/adb7f6f444e66ace.webp` | https://www.pensanoevento.com.br/eventos/107476/fabio-guere-panico-inutilidade-publica-21h |
| Cícero Viana — Aqui Tem Preparo! | 2026-10-31 | `evt-af92d277b7ec` | `./images/1cf64fbc6b68de90.webp` | https://www.pensanoevento.com.br/eventos/107477/cicero-viana-aqui-tem-preparo-21h |
| Nathi Gaiteira — Amor, Humor e Modão | 2026-11-01 | `evt-37afcce322db` | `./images/7cafd24516e7c909.webp` | https://www.pensanoevento.com.br/eventos/109171/nathi-gaiteira-amor-humor-e-modao-21h |
| Humor & Huana — Bob Rodrigues | 2026-11-03 | `evt-401f1a110051` | `./images/08412e3f79fdfe56.webp` | https://www.pensanoevento.com.br/eventos/110727/humor-huana-reducao-de-danos-com-bob-rodrigues-21h |
| Arianna Nutt — De Repente 40 | 2026-11-04 | `evt-76f759a2b51c` | `./images/c44cc3c865ffdb06.webp` | https://www.pensanoevento.com.br/eventos/109494/arianna-nutt-de-repente-40-21h |
| Festival Open Mic | 2026-11-05 | `evt-56db956570ff` | `./images/cdd2ad02849c05a6.webp` | https://www.pensanoevento.com.br/eventos/111512/festival-open-mic-o-melhor-voce-escolhe-21h |
| Irineu Nicoletti — Meio Tanso | 2026-11-06 | `evt-59cedc637478` | `./images/297ef980f8820632.webp` | https://www.pensanoevento.com.br/eventos/109496/irineu-nicoletti-meio-tanso-21h |
| Marcio Donato (4 Amigos) | 2026-11-07 | `evt-b8678d2f037d` | `./images/7d33525eefce8e4d.webp` | https://www.pensanoevento.com.br/eventos/105680/marcio-donato-4-amigos-21h |

## Pendências objetivas para sair da prévia

1. **31 casas** sem imagem própria selecionada: localizar foto ou logotipo contemporâneo da casa correta, registrar URL original, autoria/titular, conferência de identidade e permissão de uso.
2. **44 eventos** sem poster/foto do próprio evento: obter material específico e revisar individualmente com a fonte. Arquivos de artista de outras apresentações NÃO substituem poster do evento.
3. **12 arquivos históricos existentes**: confirmar título/edição da imagem, data, qualidade e direitos. O evento `evt-362d49fca53d` já tinha divergência de título registrada; não inferir correspondência definitiva.
4. **8 arquivos em prévia**: validação visual do Cliente e autorização do titular para publicação, antes de migração à árvore pública. Fotos antigas do ORI e Chopp precisam de conferência adicional de atualidade.
5. Reavaliar performance de imagens, altura da hero desktop e legibilidade dos estados sem foto em navegador/Android. CI e URL da prévia não representam homologação.

**Portas:** implementado em branch ≠ testado ≠ publicado ≠ homologado. Nada de novas imagens potencialmente protegidas deve ir para `main` sem evidência de direitos e aceite do Cliente.

## Atualização da prévia local — conciliação de mídia, 03/11/2026

Uma segunda revisão de material visual ampliou a **prévia privada** para **13 casas com imagem candidata** e **26 casas sem imagem selecionada**. O número inicial de oito imagens acima é preservado como fotografia da primeira etapa, não como situação final. A atualização foi conciliada sem apagar entradas que haviam sido acrescentadas paralelamente na prévia. O registro local e arquivos continuam excluídos do Git público.

Adições desde a primeira revisão:

| Casa | Material de revisão | Referência |
|---|---|---|
| Teatro Ademir Rosa | Foto da entrada/identificação do teatro | https://www.guiadasemana.com.br/florianopolis/arte/estabelecimento/teatro-ademir-rosa-cic |
| Galeria Lama | Foto de ambiente/fachada com identificação | https://restaurantguru.com.br/Galeria-Lama-Florianopolis |
| Berlin Floripa | Foto com letreiro do estabelecimento | https://restaurantguru.com.br/Berlin-by-Cite-Florianopolis |
| Terraza Music Park | Imagem encontrada em material de divulgação | https://d2hnilqqbw3vnf.cloudfront.net/images/imagens/full/MJ1qtEPSxQ3Z1MrOa5WoLJP0iOn1uIVYeJ6xHZfU.jpeg |
| Stage Music Park | Mídia encontrada em fonte de ingressos; correspondência ainda a revisar | https://www.gbingressos.com.br/ |

**Eventos:** 12 arquivos históricos com associação registrada no Git, porém apenas **11 imagens ativadas na prévia privada**. A associação do evento `evt-362d49fca53d` não foi ativada porque o registro já apresentava divergência entre título catalogado e fonte. Assim, **45 eventos não recebem imagem** na prévia (44 sem arquivo associado e um bloqueado para revisão).

**Escopo da evidência:** associação e aparência específicas devem ser confirmadas individualmente. Acessibilidade do link não é licença; fotos históricas podem não refletir o estado atual da casa. Todos os treze materiais continuam com status jurídico **pending**. Nenhum dos conteúdos de terceiros nem as imagens fornecidas pelo Cliente foram incorporados à distribuição pública do repositório.
