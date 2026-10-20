/**
 * Nota e total de avaliacoes da ficha do Google (Places API New).
 *
 * Roda como funcao serverless da Vercel. A resposta fica 24h no cache
 * da CDN, entao o Google e chamado poucas vezes por dia — bem dentro
 * da cota gratuita.
 *
 * Variaveis de ambiente (Vercel > Settings > Environment Variables):
 *   GOOGLE_PLACES_API_KEY  chave com a "Places API (New)" ativada
 *   GOOGLE_PLACE_ID        Place ID da ficha (ChIJ...)
 */
const ONE_DAY = 60 * 60 * 24

export async function GET(): Promise<Response> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return json({ error: 'not-configured' }, 500, 0)

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
    })
    if (!res.ok) return json({ error: `google-${res.status}` }, 502, 300)

    const data = (await res.json()) as { rating?: number; userRatingCount?: number }
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') {
      return json({ error: 'missing-fields' }, 502, 300)
    }
    return json({ rating: data.rating, count: data.userRatingCount }, 200, ONE_DAY)
  } catch {
    return json({ error: 'fetch-failed' }, 502, 300)
  }
}

function json(body: unknown, status: number, maxAge: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // Cache so na CDN da Vercel; erros ficam 5 min para nao martelar o Google.
      'Cache-Control': maxAge
        ? `public, s-maxage=${maxAge}, stale-while-revalidate=${ONE_DAY * 7}`
        : 'no-store',
    },
  })
}
