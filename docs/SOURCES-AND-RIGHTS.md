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
