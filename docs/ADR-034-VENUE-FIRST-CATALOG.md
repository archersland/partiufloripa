# ADR-034 — Catálogo centrado em locais e hierarquia de espaços (03/11/2026)

**Estado:** direção de produto solicitada pelo Cliente; desenho proposto neste documento, implementação e aceite técnico pendentes.
**Origem:** revisão de `venues.json`, `events.json`, ADR-033 e nova pesquisa de programação em 03/11/2026.
**Escopo:** discovery/MVP web. Não autoriza coleta automatizada de fonte não liberada, uso de fotografias sem licença, publicação, gastos ou contato com terceiros.

## Contexto
A aba Lugares já mostra 39 locais sem depender da presença de evento, mas o catálogo experimental possui 56 ocorrências e a chave da casa em `events.json` é uma string `venue`. Não há `venueId` obrigatório, registro confiável de cobertura da agenda por local nem hierarquia entre complexos e casas. `data/venue-media.json` contém 14 associações a fotos licenciadas **genéricas**, não fotos reais dos locais. Sem agenda registrada **não significa** sem programação pública.

## Decisão de produto
1. **Lugares é o cadastro mestre de entidades físicas.** Listar locais com e sem eventos, conservando a distinção entre existência do lugar, situação operacional, informação de horário, cobertura de agenda e ocorrência publicada.
2. **Agenda é uma projeção das ocorrências associadas por `venueId`.** Eventos com local incerto permanecem em revisão e nunca criam automaticamente um lugar chamado “Local a confirmar”.
3. **Hierarquia:** `placeType: "complex" | "venue"`, `parentVenueId: null | id` e IDs estáveis. Um complexo agrega casas; cada evento pertence ao espaço físico mais específico comprovado. A agenda de um complexo poderá exibir a união dos eventos publicados de seus descendentes, rotulados pela casa real. Não duplicar as ocorrências no agregado.
4. **Music Park, não Stage, é o complexo.** O operador documenta Stage, Terraza, Posh, Indoor e Garden como cinco casas. Adicionar a entidade `music-park` como pai; cadastrar `indoor-music-park`, `posh-music-park`, `garden-music-park` somente após checagem de identidade; preservar IDs existentes `stage-music-park` e `terraza-music-park`. Fonte: https://musicpark.com.br/sobre/ .
5. **CIC é outro complexo:** agrupa Teatro Ademir Rosa, Cinema Gilberto Gerlach, MIS/SC e MASC, entre outros; não confundir programação do complexo com a de cada sala. Fonte institucional indireta: https://ouviram.com.br/agenda/shows-e-eventos-em-florianopolis-outubro-novembro-2026 .
6. **Cobertura editorial não equivale a situação da casa:** cada venue deve indicar `scheduleCoverage: "not_researched" | "source_found" | "source_approved" | "monitored" | "review_needed"` (ou equivalente melhor definido) e `lastScheduleCheckedAt`. Esses valores **não** estabelecem autorização técnica de coleta.
7. **Direitos por mídia:** separar foto real e comprovadamente licenciada, foto específica sob análise, ilustração genérica licenciada e ausência de imagem. Não reproduzir fotos de sites/Instagram/bilhetereiras por serem publicamente acessíveis.

## Contrato mínimo proposto (exemplo, não migração aplicada)
```json
{
  "venues": [{
    "id": "stage-music-park",
    "name": "Stage Music Park",
    "placeType": "venue",
    "parentVenueId": "music-park",
    "region": "Jurerê",
    "scheduleCoverage": "source_found",
    "scheduleSources": [
      {"url": "https://musicpark.com.br/agenda/", "role": "operator_official", "permission": "unverified", "lastCheckedAt": "2026-11-03"}
    ]
  }],
  "events": [{
    "id": "evt-exemplo-apenas-estrutura-nao-cadastrar",
    "venueId": "stage-music-park",
    "title": "Exemplo de estrutura: não é um evento",
    "date": null,
    "doorsAt": null,
    "startsAt": null,
    "source": null,
    "status": "draft"
  }]
}
```
**Atenção:** o exemplo acima é exclusivamente de schema, não dado a publicar. Preferir arquivos separados: `data/venues.json` como registro mestre e `events.json` como ocorrências com chave estrangeira `venueId`. Datas/horas locais em America/Sao_Paulo e `doorsAt` (abertura) distinto de `startsAt` (apresentação). Não presumir valores quando a fonte apresentar horário ambíguo. Fonte de programa e status de coleta pertencem a registro por fonte, com política **deny** por padrão; `data/source-registry.json` continua como gate.

## Migração incremental e reversível
1. **Inventário/deduplicação:** construir tabela de nomes/aliases antigos ↔ IDs existentes; isolar 5 ocorrências em quarentena com `Local a confirmar`. Preservar `id`, `slug`, URLs, proveniência e estados editoriais. Candidatos e conflitos não recebem vínculo fictício.
2. **Esquema e validação:** ampliar validador e testes para IDs existentes, rejeitar referências órfãs, ciclos de parentesco, parent igual a si, hierarquia duplicada e confusão entre grupo e espaço. Criar fixture para evento com espaço ambíguo.
3. **Dados de transição:** migrar eventos resolvidos para `venueId` mantendo `venue` legada enquanto houver consumidores antigos; registrar divergências individuais e não mudar a casa do evento em conflito sem revisão. Em particular, `evt-628f76d5f85e` (MUNDO M) tem Stage x Indoor nas fontes; não resolver por inferência.
4. **Interface:** Lugares exibe complexos e espaços, eventos futuros disponíveis vs cobertura desconhecida; detalhe de casa/complexo, link à fonte, imagens com licença e revisão. Agenda e mapa consomem IDs, sem contar o complexo como evento adicional e sem associar “lugar aberto” a calor de público.
5. **Pipeline:** para cada fonte preferir página oficial/agenda institucional, feed/API sob autorização e conferência individual. Instagram, Sympla, Pensa no Evento e demais plataformas não são autoautorizados. Candidatos ficam em fila e não são publicados automaticamente.
6. **Verificação:** executar `node scripts/validate-events.cjs`, testes de horário/casa/mapa, lint/sintaxe e fluxo 390/1280 px; conferir API de leitura da página de evento, compatibilidade de links antigos e ausência de registros órfãos. Acionar CI existente e avaliar resultado antes de pedir aceite. Sem deploy de risco antes dessa etapa.

## Critérios de aceitação
- Todos os 39 locais atuais continuam visíveis em Lugares, mesmo sem evento.
- Todo evento com casa auditada tem `venueId` válido; nomes legados continuam sendo resolvidos durante a transição.
- Music Park e CIC exibem hierarquia correta; Stage não agrega Posh, Indoor, Garden ou Terraza.
- A ocorrência MUNDO M fica sinalizada para revisão, sem associação definitiva por palpite.
- Agenda de complexo não duplica eventos e o heatmap usa apenas ocorrências publicáveis de espaços concretos.
- Sem fonte monitorada, a interface diz “programação ainda não acompanhada”; **não** afirma “sem eventos”.
- Sem direitos de foto validados, nenhuma imagem específica de terceiros entra no portal.
- QA/CI e aceite visual do Cliente são gates distintos; branch ou commit não equivalem a implantação/homologação.

## Alternativas e consequências
- Manter string de casa e tratar “Stage” como grupo: rejeitado por ambiguidade, erros de atribuição e impossibilidade de agrupar complexos.
- Migrar imediatamente toda a UI e todos os eventos: rejeitado por risco de regressão e pendências editoriais; preferida migração compatível por etapas.
- Base SQL/backend obrigatório: **não necessário no MVP**. Arquivos JSON normalizados + validação e CI atendem ao volume atual. Reavaliar por volume/operacional real; não criar custo fixo por antecipação.

**Documentação de evidência:** [matriz de fontes e fotos pesquisadas](../reports/VENUE-FIRST-SOURCES-AND-MEDIA-2026-11-03.md). Este ADR expande ADR-033; não substitui políticas de direitos ADR-014/017, exceções ADR-016/023 nem semântica do mapa ADR-029/031.
