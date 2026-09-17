import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Marca um elemento como visivel na primeira vez que ele entra na viewport.
 *
 * Usa IntersectionObserver e para de observar apos o primeiro disparo — a
 * animacao de entrada acontece uma vez so, e nao a cada scroll de volta.
 */
export function useReveal(target: Ref<HTMLElement | null>, threshold = 0.15) {
  const revealed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // Sem suporte a IntersectionObserver, mostra o conteudo direto em vez de
    // deixar a secao invisivel para sempre.
    if (!target.value || typeof IntersectionObserver === 'undefined') {
      revealed.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealed.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { revealed }
}
