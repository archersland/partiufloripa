# Proposta de produto — aba “Lugares” (Discovery, 03/11/2026)

**Estado atualizado (03/11/2026):** o Cliente autorizou e a implementação técnica da aba Lugares foi realizada na main; a proposta original abaixo permanece como contexto de design. QA mobile/visual, horário das demais casas e aceite do Cliente continuam pendentes. ADR-033 documenta a semântica aprovada para implementação. A origem é a percepção de que muitos bares, pubs e casas culturais são destinos relevantes mesmo quando não têm um evento específico cadastrado. Preservar o web MVP estático, sem pagamentos, recursos sociais, login, GPS de pessoas ou heatmap de ocupação real.

## Problema e solução
Hoje o portal responde “o que acontece em tal data?”. Uma casa como o Chopp do Gus, ORI Boteco ou Kibelândia pode ter valor na descoberta independentemente de show. Se o portal só listar ocorrências, esses lugares somem da navegação em dias sem atrações confirmadas.

**Direção proposta:** três destinos de navegação de primeiro nível, preservando o layout existente:
- **Agenda:** eventos com data, hora quando comprovada, fonte, status editorial e filtros rápidos. Não converter “bar aberto” em evento.
- **Mapa:** mapa temporal de eventos e suas regras do potencial de público (ADRs 029–032). Um seletor separado **Eventos | Lugares** poderá, se aprovado, mostrar pins de casas sem calcular calor nem público a partir da simples existência de um bar.
- **Lugares:** diretório independente de data, com busca por nome/área e filtros editoriais como **Bares e botecos**, **Pistas e baladas**, **Música ao vivo**, **Arte e cultura**. Categorias podem se sobrepor, precisam de revisão humana e fonte.

## Card de lugar (conceito)
**Nome e bairro** → etiquetas sobre tipo de experiência apenas quando documentadas → endereço textual verificado → fonte/perfil oficial → ação **Ver lugar**. Se existir evento futuro individualmente revisado e vinculado por ID, mostrar “Próxima atração” opcional e sua data; caso contrário, dizer **“Confira a programação da casa”**, nunca “Sem eventos hoje” como se calendário de terceiros estivesse completo.

Detalhe da casa: localização/endereço com grau de precisão, canal oficial (não copiar mídia sem licença), informações públicas documentadas, eventos disponíveis no catálogo se houver. Não publicar horário de funcionamento, preços, disponibilidade em tempo real ou acessibilidade sem fonte e atualização. Um bar sem agenda entra normalmente; não cria ocorrência fictícia.

## Dados e arquitetura
- Manter `events.json` (ocorrências) e `data/venues.json` (lugares) **independentes**. IDs estáveis no segundo arquivo, nomes/aliases, região, endereço, `locationEvidence`, `reviewedAt` e ressalvas são a base atual. O diretório agora tem **39 registros**, dos quais **16** foram acrescentados neste ciclo com pesquisa pública.
- Antes de implementar a aba, projetar campos opcionais de apresentação como `experienceTags`, `website`, `instagram`, `editorialStatus` e `lastCheckedAt` com definição de proveniência, sem inferi-los de publicações genéricas nem duplicar campos legados. Distinguir **existência da casa**, **endereço de rua**, **ponto exato da entrada**, **funcionamento atual** e **programação específica**.
- No mapa, usar ponto somente após fonte e coordenadas de acesso autorizadas; se não houver, manter bairro/endereço como texto e não inventar pins. Não acrescentar casas ao heatmap de eventos nem à escala de pessoas da ADR-029.
- Preservar regras de imagens: não reutilizar logos, fotos do Instagram, cartazes ou imagens de terceiros sem direito verificado. Caso contrário, usar ícone neutro da categoria.
- A coleta periódica ou scraping ainda depende de política e autorização por fonte (ADR-014). Pesquisa pontual pública não autoriza ingestão automática.

## Critérios de aceitação propostos (a confirmar)
1. Uma casa com **zero eventos** aparece em Lugares; não aparece na Agenda nem injeta calor no mapa.
2. Uma casa com eventos futuros auditados aparece uma vez em Lugares e os eventos aparecem separadamente na Agenda, vinculados por ID.
3. Casas fora do centro regional conhecido não recebem geocoordenadas falsas; exibir endereço textual e grau de precisão.
4. Busca e filtros de Lugares funcionam em mobile 360–390px e teclado, com estado vazio compreensível.
5. Ao abrir casa, ver origem e data da checagem, sem inventar “aberto agora”, atração, horário ou popularidade.
6. Links externos são validados e não há mídias reutilizadas sem direitos.
7. Testes unitários para vínculo evento↔casa, ausência de evento, sem coordenadas e status editorial; navegador e CI validados antes de qualquer aceite.

## Pesquisa do Centro-Leste e da Ponte (03/11/2026)
Acrescentados **16 registros** em `data/venues.json`, com fonte e endereço textual: No Class, Bohô Bar & Pista, Vodu Arte Bar, Boteco do Maicão Centro, Teodoro Bar, SELVA Bar Floripa, Opium Bar, Ateliê 389, Desgosto Bar, ORI Boteco Centro, Botequim Floripa, Scuna Bar Club, Bar do Noel, Boteco do Alemão, Kibelândia Chopperia e Barra Cô Drinks e Shots. Já cadastrados na rodada anterior: Bugio Centro, Berlin Floripa, Galeria Lama, Franz Cabaret e outros.

**Exclusão cautelosa:** Haôma Baixo Centro não foi incluído como ativo porque sua despedida no dia 10/05/2026 foi noticiada em https://underfloripa.com.br/musica/haoma-baixo-centro-ultimo-ato-show-gratuito-florianopolis/ . Poderá constar em registro histórico, ou ter nova situação apenas após verificação.

**Atualização:** UI Agenda/Lugares/Mapa implementada, com calendário comum e listagem em três estados; a existência de 39 casas não implica que horário ou funcionamento tenham sido verificados para todas. O Cliente mantém aceite visual e editorial. Não houve novos eventos adicionados.
