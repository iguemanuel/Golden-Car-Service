import { onMounted, ref } from 'vue'

import { googleRating } from '@/data/reviews'

/** 63 -> "60+". Abaixo de 10 mostra o numero exato. */
export function formatReviewCount(count: number): string {
  return count < 10 ? String(count) : `${Math.floor(count / 10) * 10}+`
}

/**
 * Nota e total vindos de /api/google-rating. Comeca com o valor fixo de
 * data/reviews.ts e so troca se a API responder — se falhar (ou no
 * `npm run dev`, onde a funcao nao existe), o site segue com o fixo.
 */
export function useGoogleRating() {
  const value = ref<number>(googleRating.value)
  const count = ref<string>(googleRating.count)

  onMounted(async () => {
    try {
      const res = await fetch('/api/google-rating')
      if (!res.ok) return
      const data = (await res.json()) as { rating?: unknown; count?: unknown }
      if (typeof data.rating === 'number') value.value = data.rating
      if (typeof data.count === 'number') count.value = formatReviewCount(data.count)
    } catch {
      // mantem o valor fixo
    }
  })

  return { value, count }
}
