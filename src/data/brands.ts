import volkswagen from '@/assets/imgs/brands/volkswagen.svg'
import chevrolet from '@/assets/imgs/brands/chevrolet.svg'
import fiat from '@/assets/imgs/brands/fiat.svg'
import ford from '@/assets/imgs/brands/ford.svg'
import toyota from '@/assets/imgs/brands/toyota.svg'
import honda from '@/assets/imgs/brands/honda.svg'
import hyundai from '@/assets/imgs/brands/hyundai.svg'
import renault from '@/assets/imgs/brands/renault.svg'
import nissan from '@/assets/imgs/brands/nissan.svg'
import bmw from '@/assets/imgs/brands/BMW.svg'
import mercedes from '@/assets/imgs/brands/mercedes.svg'
import audi from '@/assets/imgs/brands/audi.svg'
import jeep from '@/assets/imgs/brands/jeep.svg'
import mitsubishi from '@/assets/imgs/brands/mitsubishi.svg'

/**
 * Marcas atendidas, com o logo de cada uma.
 *
 * Uso nominativo ("atendemos esta marca"), pratica comum e aceita em
 * oficina multimarca — nao e diferente de mostrar o logo em texto, so
 * mais reconhecivel.
 *
 * `width` e a largura do logo na altura fixa de 2.5rem do carrossel.
 * Emblemas redondos ficam ~quadrados; wordmarks (Audi, Jeep, Ford,
 * Chevrolet) ganham a proporcao do SVG para nao parecerem esmagados.
 *
 * `naturalWidth`/`naturalHeight` sao o viewBox real de cada SVG (conferido
 * com `magick identify`) — vao nos atributos HTML width/height da <img>,
 * nao no CSS. Servem so para o navegador calcular a proporcao e reservar
 * o espaco antes do arquivo carregar (evita CLS); quem controla o tamanho
 * exibido continua sendo `width` (CSS) + a altura fixa do carrossel.
 */
export interface Brand {
  name: string
  logo: string
  width: string
  naturalWidth: number
  naturalHeight: number
}

export const brands: Brand[] = [
  { name: 'Volkswagen', logo: volkswagen, width: '2.5rem', naturalWidth: 32, naturalHeight: 32 },
  { name: 'Chevrolet', logo: chevrolet, width: '6.5rem', naturalWidth: 24, naturalHeight: 8 },
  { name: 'Fiat', logo: fiat, width: '2.5rem', naturalWidth: 32, naturalHeight: 32 },
  { name: 'Ford', logo: ford, width: '6.5rem', naturalWidth: 63, naturalHeight: 24 },
  { name: 'Toyota', logo: toyota, width: '3.75rem', naturalWidth: 32, naturalHeight: 21 },
  { name: 'Honda', logo: honda, width: '3.25rem', naturalWidth: 18, naturalHeight: 14 },
  { name: 'Hyundai', logo: hyundai, width: '4.5rem', naturalWidth: 32, naturalHeight: 17 },
  { name: 'Renault', logo: renault, width: '2rem', naturalWidth: 1900, naturalHeight: 2500 },
  { name: 'Nissan', logo: nissan, width: '2.75rem', naturalWidth: 32, naturalHeight: 27 },
  { name: 'BMW', logo: bmw, width: '2.5rem', naturalWidth: 24, naturalHeight: 24 },
  { name: 'Mercedes-Benz', logo: mercedes, width: '2.5rem', naturalWidth: 32, naturalHeight: 32 },
  { name: 'Audi', logo: audi, width: '7rem', naturalWidth: 91, naturalHeight: 32 },
  { name: 'Jeep', logo: jeep, width: '6rem', naturalWidth: 32, naturalHeight: 13 },
  { name: 'Mitsubishi', logo: mitsubishi, width: '2.75rem', naturalWidth: 32, naturalHeight: 28 },
]
