import oleo from '@/assets/imgs/hero-oleo.webp'
import motor from '@/assets/imgs/hero-motor.webp'
import freio from '@/assets/imgs/hero-freio.webp'

/**
 * Fotos que se alternam no fundo do hero.
 *
 * Em cor natural (ver HeroSection.vue — sem o duotone .photo-gold, por
 * pedido do cliente com referencia visual). Como nao ha mais filtro
 * unificando a temperatura de cor, a normalizacao de luminancia no passo
 * de build (ver docs/imagens.md) e o que mantem a rotacao sem piscar.
 *
 * Criterio para entrar aqui: ter assunto reconhecivel num relance e manter
 * o interesse na METADE DIREITA do quadro — a esquerda fica atras do painel
 * opaco depois do recorte diagonal no desktop.
 *
 * Origem: fotos enviadas pelo cliente (Unsplash, licenca livre para uso
 * comercial). Duas delas tinham marca de fabricante em destaque —
 * "Mercedes-Benz" no frasco de oleo e "Audi ceramic" na pinca de freio —
 * o cliente revisou e autorizou o uso como esta.
 * Substituir por fotos reais da oficina assim que o cliente enviar.
 */
export const heroSlides = [
  { src: oleo, label: 'Troca de óleo' },
  { src: motor, label: 'Diagnóstico de motor' },
  { src: freio, label: 'Sistema de freios' },
]
