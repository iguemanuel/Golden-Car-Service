import { onMounted, onUnmounted, ref } from 'vue'

/**
 * True quando a pagina rolou alem de `threshold` pixels.
 *
 * TheNavbar.vue e WhatsAppFloat.vue cada um tinha seu proprio listener de
 * `scroll` cru, sem throttle — cada scroll de verdade dispara dezenas de
 * eventos por segundo, e cada um rodava sua propria comparacao e escrita de
 * ref. Aqui o handler so agenda um `requestAnimationFrame`; se varios
 * eventos de scroll chegarem antes do proximo frame (o normal), so o
 * ultimo valor de scrollY e lido, entao no maximo uma leitura/escrita por
 * frame de tela, nao uma por evento.
 */
export function useScrolled(threshold: number) {
  const scrolled = ref(false)
  let ticking = false

  function update() {
    scrolled.value = window.scrollY > threshold
    ticking = false
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { scrolled }
}
