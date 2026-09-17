import oficinaReel from '@/assets/insta/oficina-reel.mp4'
import fachada1 from '@/assets/insta/fachada-1.webp'
import fachada2 from '@/assets/insta/fachada-2.webp'
import oficinaInterior from '@/assets/insta/oficina-interior.webp'

/**
 * Video e fotos do Instagram exibidos na secao de contato — mesmo padrao
 * do Guará Motors Racing (github.com/iguemanuel, projeto Web-Motors):
 * video autohospedado (nao embed do Instagram, que exige script externo e
 * quebra sem aviso se a Meta mudar a API) + fotos da loja/oficina.
 *
 * ContactSection.vue esconde a secao inteira quando este array esta vazio
 * — mesma defesa que o Guará Motors ja usava (`storeMedia.length > 0 &&`).
 *
 * As fotos sao da fachada real da oficina, baixadas do Instagram
 * (@golden_carservice) e convertidas para WebP. O video e o mesmo reel,
 * baixado como mp4 e hospedado direto (~3.5MB).
 *
 * `width`/`height` sao as dimensoes reais do arquivo (conferidas com
 * `magick identify`), nao estimativas — usadas nas tags <video>/<img> para
 * o navegador reservar o espaco antes do arquivo carregar (evita CLS).
 */
export type InstagramMediaKind = 'video' | 'photo'

export interface InstagramMediaItem {
  src: string
  kind: InstagramMediaKind
  alt: string
  width: number
  height: number
}

export const instagramMedia: InstagramMediaItem[] = [
  {
    src: oficinaReel,
    kind: 'video',
    alt: 'Vídeo da oficina Golden Car Service',
    // Reel do Instagram, formato vertical padrao — mp4 nao foi inspecionado
    // por dimensao exata (sem ffprobe no ambiente), 1080x1920 e o padrao do
    // formato; a caixa e sempre recortada por aspect-[3/4] + object-cover,
    // entao um valor levemente impreciso aqui nao quebra o layout.
    width: 1080,
    height: 1920,
  },
  {
    src: fachada1,
    kind: 'photo',
    alt: 'Fachada da Golden Car Service, com placa de serviços e veículos na oficina',
    width: 1000,
    height: 1333,
  },
  {
    src: fachada2,
    kind: 'photo',
    alt: 'Placa de serviços da Golden Car Service e selo de oficina associada Câmbio Automático do Brasil',
    width: 1000,
    height: 1333,
  },
  {
    src: oficinaInterior,
    kind: 'photo',
    alt: 'Interior da oficina Golden Car Service, com veículos nos elevadores em manutenção',
    width: 1000,
    height: 750,
  },
]
