/**
 * Serviços do grid geral (ver ServicesSection.vue). O destaque de câmbio
 * automático fica em transmission.ts — este arquivo é o restante do
 * catálogo, o que a Golden faz além da especialidade.
 */
export interface Service {
  icon: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: 'Wrench',
    title: 'Mecânica Geral',
    description:
      'Diagnóstico e manutenção completa, reparos especializados no motor e nos componentes essenciais do veículo.',
  },
  {
    icon: 'Waves',
    title: 'Suspensão',
    description:
      'Manutenção e reparo do sistema de suspensão para uma condução estável, segura e confortável.',
  },
  {
    icon: 'Cog',
    title: 'Motor',
    description:
      'Manutenção preventiva e corretiva, com peças de qualidade e mão de obra especializada.',
  },
  {
    icon: 'Disc',
    title: 'Freios',
    description:
      'Segurança em primeiro lugar: manutenção preventiva e corretiva de discos, pastilhas e todo o sistema de freio.',
  },
  {
    icon: 'Zap',
    title: 'Performance',
    description:
      'Ajustes para quem quer mais do carro — sem abrir mão da confiabilidade no dia a dia.',
  },
  {
    icon: 'Droplet',
    title: 'Troca de Óleo',
    description:
      'Manutenção vital do motor com óleos de alta qualidade, recomendados para cada veículo.',
  },
]

/** Opcoes do seletor no formulario de contato — especialidade primeiro. */
export const contactServiceOptions = [
  'Câmbio automático',
  ...services.map((service) => service.title),
  'Outro',
] as const
