import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Marca um elemento como visivel na primeira vez que ele chega perto da viewport.
 *
 * Usa IntersectionObserver e para de observar apos o primeiro disparo — a
 * animacao de entrada acontece uma vez so, e nao a cada scroll de volta.
 *
 * Dispara 15% da altura da tela ANTES de o bloco entrar: com threshold de
 * visibilidade, blocos altos (formulario, grade de avaliacoes) ficavam
 * vazios na tela ate rolar um bom pedaco, e o site parecia atrasado.
 */
export function useReveal(target: Ref<HTMLElement | null>) {
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
      { rootMargin: '0px 0px 15% 0px', threshold: 0 },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { revealed }
}
