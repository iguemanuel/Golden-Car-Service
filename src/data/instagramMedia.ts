import oficinaReel from '@/assets/insta/oficina-reel.mp4'
import oficinaFachada from '@/assets/insta/oficina-fachada.webp'
import fachada2 from '@/assets/insta/fachada-2.webp'
import oficinaInterior from '@/assets/insta/oficina-interior.webp'
import oficinaElevador from '@/assets/insta/oficina-elevador.webp'
import oficinaCambioCavalete from '@/assets/insta/oficina-cambio-cavalete.webp'
import oficinaMecatronicaDq200 from '@/assets/insta/oficina-mecatronica-dq200.webp'

/**
 * Video em destaque + 6 fotos da oficina na secao de contato.
 * Video autohospedado (nao embed do Instagram). ContactSection.vue
 * esconde o bloco quando este array esta vazio.
 *
 * As fotos extras convertidas (embreagem, bancada, maquina ATF, fachada-1)
 * ficam em src/assets/insta/ mas fora deste array — o grid 3x2 ao lado
 * do video precisa ficar compacto.
 *
 * `width`/`height` sao as dimensoes reais do arquivo (conferidas com
 * `magick identify`), usadas nas tags <video>/<img> para evitar CLS.
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
    width: 1080,
    height: 1920,
  },
  {
    src: oficinaFachada,
    kind: 'photo',
    alt: 'Fachada da Golden Car Service com letreiro, lista de serviços e veículos no box',
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
  {
    src: oficinaElevador,
    kind: 'photo',
    alt: 'Carro no elevador da oficina, com capô aberto em manutenção',
    width: 1000,
    height: 1333,
  },
  {
    src: oficinaCambioCavalete,
    kind: 'photo',
    alt: 'Câmbio automático no cavalete, com o veículo no elevador ao fundo',
    width: 1000,
    height: 1333,
  },
  {
    src: oficinaMecatronicaDq200,
    kind: 'photo',
    alt: 'Mecatrônica DQ200 com upgrades saindo da bancada da oficina',
    width: 1000,
    height: 1333,
  },
]
