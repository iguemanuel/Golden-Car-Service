import oficinaInterior from '@/assets/insta/oficina-interior.webp'
import oficinaElevador from '@/assets/insta/oficina-elevador.webp'
import heroMotor from '@/assets/imgs/hero-motor.webp'
import scannerPerformance from '@/assets/imgs/servico-performance.webp'
import heroFreio from '@/assets/imgs/hero-freio.webp'
import heroOleo from '@/assets/imgs/hero-oleo.webp'

/**
 * Serviços do grid geral (ver ServicesSection.vue). O destaque de câmbio
 * automático fica em transmission.ts — este arquivo é o restante do
 * catálogo, o que a Golden faz além da especialidade.
 *
 * `image` fica na direita do card. `imagePosition` é o object-position:
 * no recorte estreito, o assunto tem que continuar reconhecível.
 */
export interface Service {
  icon: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
}

export const services: Service[] = [
  {
    icon: 'Wrench',
    title: 'Mecânica Geral',
    description:
      'Diagnóstico e manutenção completa, reparos especializados no motor e nos componentes essenciais do veículo.',
    image: oficinaInterior,
    imageAlt: 'Interior da oficina, com um carro de capô aberto em manutenção',
    imagePosition: '18% center',
  },
  {
    icon: 'Waves',
    title: 'Suspensão',
    description:
      'Manutenção e reparo do sistema de suspensão para uma condução estável, segura e confortável.',
    image: oficinaElevador,
    imageAlt: 'Coluna do elevador ao lado do carro, onde a suspensão é trabalhada',
    imagePosition: 'left center',
  },
  {
    icon: 'Cog',
    title: 'Motor',
    description:
      'Manutenção preventiva e corretiva, com peças de qualidade e mão de obra especializada.',
    image: heroMotor,
    imageAlt: 'Motor do carro visto de perto, com o compartimento aberto',
    imagePosition: '40% center',
  },
  {
    icon: 'Disc',
    title: 'Freios',
    description:
      'Segurança em primeiro lugar: manutenção preventiva e corretiva de discos, pastilhas e todo o sistema de freio.',
    image: heroFreio,
    imageAlt: 'Disco de freio ventilado, visto de perto no cubo da roda',
    imagePosition: 'right center',
  },
  {
    icon: 'Zap',
    title: 'Performance',
    description:
      'Ajustes para quem quer mais do carro — sem abrir mão da confiabilidade no dia a dia.',
    image: scannerPerformance,
    imageAlt: 'Scanner automotivo nas mãos do mecânico, sobre o motor aberto',
    imagePosition: '62% center',
  },
  {
    icon: 'Droplet',
    title: 'Troca de Óleo',
    description:
      'Manutenção vital do motor com óleos de alta qualidade, recomendados para cada veículo.',
    image: heroOleo,
    imageAlt: 'Óleo do motor sendo abastecido no compartimento',
    imagePosition: '58% center',
  },
]

/** Opcoes do seletor no formulario de contato — especialidade primeiro. */
export const contactServiceOptions = [
  'Câmbio automático',
  ...services.map((service) => service.title),
  'Outro',
] as const
