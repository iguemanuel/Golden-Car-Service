import engrenagens from '@/assets/imgs/hero-engrenagens.webp'
import diagnostico from '@/assets/imgs/hero-diagnostico.webp'
import freios from '@/assets/imgs/hero-freios.webp'
import oficina from '@/assets/imgs/hero-oficina.webp'

/**
 * Fotos que se alternam no fundo do hero.
 *
 * Todas passam pelo duotone dourado (.photo-gold), entao nao precisam ter a
 * mesma temperatura de cor na origem — e justamente o que permite misturar
 * uma foto em neon com uma em preto e branco sem quebrar a paleta.
 *
 * Criterio para entrar aqui: ser escura, ter assunto reconhecivel num relance
 * e manter o interesse na METADE DIREITA do quadro — a esquerda fica atras da
 * coluna de texto depois do recorte diagonal no desktop. Uma foto de faiscas
 * de esmerilhadeira foi descartada por exatamente isso: o unico ponto de
 * interesse dela caia na parte coberta.
 *
 * As quatro sao normalizadas na mesma media de luminancia no passo de build
 * (ver docs/imagens.md). Sem isso a rotacao pisca: a foto de origem mais
 * escura tinha media 18 contra 48 da mais clara, e o filtro CSS e unico.
 *
 * Origem: Pexels (licenca livre para uso comercial, sem atribuicao exigida).
 * Substituir por fotos reais da oficina assim que o cliente enviar.
 */
export const heroSlides = [
  { src: engrenagens, label: 'Engrenagens de câmbio' },
  { src: diagnostico, label: 'Diagnóstico sob o veículo' },
  { src: freios, label: 'Sistema de freios' },
  { src: oficina, label: 'Oficina' },
]
