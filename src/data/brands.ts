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
 * Marcas atendidas, com o logo oficial de cada uma.
 *
 * Uso nominativo ("atendemos esta marca"), pratica comum e aceita em
 * oficina multimarca — nao e diferente de mostrar o logo em texto, so
 * mais reconhecivel. Mesmos arquivos SVG do Valdeci Auto Center
 * (github.com/iguemanuel/Valdeci-Auto-Center), projeto anterior do mesmo
 * autor, ja publicados e em uso num site real.
 */
export interface Brand {
  name: string
  logo: string
}

export const brands: Brand[] = [
  { name: 'Volkswagen', logo: volkswagen },
  { name: 'Chevrolet', logo: chevrolet },
  { name: 'Fiat', logo: fiat },
  { name: 'Ford', logo: ford },
  { name: 'Toyota', logo: toyota },
  { name: 'Honda', logo: honda },
  { name: 'Hyundai', logo: hyundai },
  { name: 'Renault', logo: renault },
  { name: 'Nissan', logo: nissan },
  { name: 'BMW', logo: bmw },
  { name: 'Mercedes-Benz', logo: mercedes },
  { name: 'Audi', logo: audi },
  { name: 'Jeep', logo: jeep },
  { name: 'Mitsubishi', logo: mitsubishi },
]
