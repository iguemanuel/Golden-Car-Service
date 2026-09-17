/**
 * Constantes e helpers de motion compartilhados entre secoes — para nao
 * espalhar numeros magicos de delay nem reimplementar a checagem de
 * prefers-reduced-motion em cada composable/componente que anima algo
 * sozinho (useSlideshow.ts e BrandsSection.vue faziam isso cada um por si).
 */

/**
 * Passo de escalonamento (ms) entre itens de uma mesma lista/grid quando
 * revelados via <RevealOnScroll :delay="i * STAGGER_STEP">. Um valor unico
 * para o site inteiro — antes cada secao tinha o seu (80 no Hero/Transmission,
 * 60 no Services, saltos ad-hoc no Reviews/Contact).
 */
export const STAGGER_STEP = 80

/**
 * True se o usuario pediu menos movimento no sistema operacional/navegador.
 * Centraliza a checagem que useSlideshow.ts e BrandsSection.vue faziam cada
 * um com sua propria funcao — mesmo resultado, uma fonte so.
 */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}
