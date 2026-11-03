# Fontes, scraping, direitos e privacidade

**Esta é uma política operacional preliminar, não parecer jurídico.**

1. Preferir agendas oficiais, APIs/feeds autorizados e submissão voluntária de eventos.
2. Nunca contornar login, CAPTCHA, paywall, bloqueios, filas ou rate limits.
3. `robots.txt` não é licença comercial nem permissão de copiar conteúdo.
4. Respeitar termos; não automatizar onde há proibição sem autorização.
5. Registrar URL original, método de obtenção, data da conferência e evidência de licença.
6. Não copiar/hospedar cartazes, fotos ou textos extensos sem fundamento de uso documentado. Card textual é alternativa.
7. Não inferir direito de imagem de um HTTP 200.
8. Corrigir/remover dados cancelados, contestados ou desatualizados.
9. Links comissionados exigem autorização e identificação publicitária aplicável.

| Fonte | Observação preliminar em out/2026 | Regra provisória |
|---|---|---|
| Sympla | Termos com restrição a crawlers não autorizados | Sem scraping |
| Pensa no Evento | robots geral permissivo, não licença | Rever termos e pedir autorização para uso recorrente |
| Music Park | robots sem bloqueio geral observado | Auditar direitos; preferir agenda oficial |
| Ouviram | robots restringe /api/ e /buscar | Respeitar rotas e direitos de matérias |
| Shotgun | Programa de promoters identificado | Somente mediante adesão e regras do produtor |

**Pendência crítica:** auditar 56 eventos e 14 imagens locais, conferindo origem, evento correspondente, horário, link e direito de reprodução. Não declarar operação plenamente regular sem essa análise.

**Privacidade:** definir o que é efetivamente coletado antes de publicar política. Analytics e anúncios futuros podem introduzir cookies/identificadores e novas obrigações.

## Auditoria preliminar — 2026-10-28
Ver [inventário de eventos/imagens](../reports/CATALOG-AUDIT.md) e [checagem técnica de URLs](../reports/LINK-CHECK.md). Resposta HTTP 200 não confirma evento, data ou licença. Dois arquivos binariamente idênticos de logo do Espartano foram removidos dos 13 cards onde eram usados como se fossem cartazes de eventos. As demais imagens continuam pendentes de auditoria de direitos e correspondência.

## Estado dos registros de mídia — 2026-11-02
Separar **arte de evento** de **foto ilustrativa licenciada**:
- `data/image-rights.json`: 12 associações históricas de imagens de evento com `rightsStatus: pending`; não usar como cartazes públicos sem evidência.
- `data/licensed-category-photos.json`: 11 fotos ilustrativas com `rightsStatus: approved`, Pexels License, origem/autor/checagem e hash registrados; elas **não** retratam necessariamente a casa ou o evento.
- `data/event-artist-photos.json`: 2 ativos de arquivo de artistas, com licença CC BY 4.0/CC0, evidências, créditos e hashes; associados a quatro ocorrências. A legenda explicita que não são imagens da apresentação futura.
- `data/venue-media.json`: 14 associações de casas a fotos genéricas licenciadas, marcadas como **não** representando a casa real.
O seletor `scripts/media-selection.js` só aprova imagens específicas quando há registro individual de direitos. A auditoria dos 56 eventos e imagens históricas permanece pendente. Não reverter a fallback de categoria para imagens sem licença.

## Auditoria com Firecrawl — 03/11/2026
Realizada pesquisa pontual de fontes abertas por Firecrawl Search/Scrape e páginas oficiais acessíveis, sem raspar Sympla, Instagram protegido ou outros serviços com restrição. Resultado e rastreabilidade dos **56 registros** estão em [VENUE-AND-EVENT-AUDIT-2026-11-03.md](../reports/VENUE-AND-EVENT-AUDIT-2026-11-03.md). Foram examinadas identidades/endereços de **14 locais existentes** e **9 novas casas** e cadastradas fontes públicas em `data/venues.json`.

**Alerta de inconsistência:** o título salvo de `evt-362d49fca53d` não corresponde ao título atualmente encontrado no link público Pensa no Evento; para `evt-628f76d5f85e`, o operador Music Park identifica o setor como Indoor enquanto a bilheteria informa Stage. Permanecem pendências de horário, fonte específica e direitos de imagem. Pesquisa pontual e link HTTP acessível não conferem licença para coleta periódica, republicação de cartazes ou homologação de evento. Não alterar o status editorial em lote.

## Rastreamento de origem e afiliados — diretriz homologada (03/11/2026)

Para o Growth B2B, **`event.source` comprova origem editorial, não é automaticamente página de ingresso**. A identificação de origem por UTMs ou `ref` só pode ser implantada após confirmação técnica de compatibilidade, respeito a parâmetros e códigos existentes, termos e direitos; acesso HTTP não prova rastreamento em banco. **Programa de promoter/afiliado, código arbitrário e direito a comissão são coisas diferentes.** Sympla exige convite para afiliados; PensaNoEvento/Shotgun suportam ferramentas de promoter operadas pelo produtor; Evvnt documenta `ref` sem cadastro, mas não remuneração automática. “Evento Amigo” da Sympla foi encontrado indexado com R$50 por novo organizador, porém a página oficial retornou 404 na consulta direta e o programa ativo não foi confirmado.

Privacidade: antes de medir, classificar finalidade, dados tratados, fornecedor, retenção, legítimo interesse/consentimento conforme o caso; ANPD recomenda transparência e minimização (https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-orientativo-201ccookies-e-protecao-de-dados-pessoais201d). Sem coleta ativa ou participação em afiliação neste registro. Consultar [pesquisa v0.2](OUTBOUND-ATTRIBUTION-AND-CLICK-METRICS.md).
