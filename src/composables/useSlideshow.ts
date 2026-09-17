import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Avanca um indice em intervalo fixo, para fundos que alternam entre fotos.
 *
 * Tres cuidados que o setInterval cru nao tem:
 *
 * - `prefers-reduced-motion`: nao rotaciona. Conteudo que se move sozinho e
 *   justamente o que essa preferencia pede para evitar.
 * - aba oculta: pausa. Evita timer rodando em background sem ninguem olhando.
 * - `deferred`: so libera o carregamento das fotos 2..n depois de um tempo,
 *   para nao competir com a primeira imagem — que e o LCP da pagina.
 */
export function useSlideshow(total: number, intervalMs = 6000) {
  const current = ref(0)
  /** Quais slides ja podem ter o <img> carregado. */
  const allowed = ref(1)

  let timer: ReturnType<typeof setInterval> | null = null
  let deferTimer: ReturnType<typeof setTimeout> | null = null

  const reduced = () =>
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

  function start() {
    if (timer || total < 2 || reduced()) return
    timer = setInterval(() => {
      current.value = (current.value + 1) % total
    }, intervalMs)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function onVisibilityChange() {
    if (document.hidden) stop()
    else start()
  }

  onMounted(() => {
    // Libera as fotos restantes depois do LCP e so entao comeca a girar.
    deferTimer = setTimeout(() => {
      allowed.value = total
      start()
    }, 1500)

    document.addEventListener('visibilitychange', onVisibilityChange)
  })

  onUnmounted(() => {
    stop()
    if (deferTimer) clearTimeout(deferTimer)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })

  function goTo(index: number) {
    current.value = index
    // Um clique manual reinicia a contagem, senao a troca seguinte vem torta.
    stop()
    start()
  }

  return { current, allowed, goTo }
}
