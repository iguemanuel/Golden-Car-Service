import trocaOleo from '@/assets/imgs/transmission/troca-oleo.webp'
import diagnostico from '@/assets/imgs/transmission/diagnostico.webp'
import reparo from '@/assets/insta/oficina-cambio-cavalete.webp'
import tipos from '@/assets/insta/oficina-bancada.webp'

/**
 * Itens do destaque de câmbio automático — a especialidade da casa, em
 * evidência ANTES do grid genérico de serviços (ver TransmissionSection.vue).
 *
 * `image` é a miniatura ao lado do texto.
 * `imagePosition` é o object-position do recorte quadrado.
 * A garantia não entra aqui: fica abaixo da foto, em `transmissionWarranty`.
 */
export interface TransmissionItem {
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
}

export const transmissionItems: TransmissionItem[] = [
  {
    title: 'Troca de óleo com equipamento de fluxo',
    description:
      'O fluido é trocado por completo, não apenas drenado pelo cárter — o câmbio sai com óleo novo do início ao fim do circuito.',
    image: trocaOleo,
    imageAlt: 'Máquina de troca de fluido de câmbio automático ao lado de um carro',
    imagePosition: '72% center',
  },
  {
    title: 'Diagnóstico eletrônico computadorizado',
    description:
      'Leitura das centrais eletrônicas para identificar a causa real do problema antes de qualquer desmontagem.',
    image: diagnostico,
    imageAlt: 'Scanner automotivo conectado no painel do carro',
    imagePosition: 'center 70%',
  },
  {
    title: 'Reparo e reforma completa',
    description:
      'Desmontagem, troca de componentes internos e remontagem com os ajustes de fábrica do câmbio automático.',
    image: reparo,
    imageAlt: 'Câmbio automático aberto, apoiado num cavalete na oficina',
    imagePosition: 'center 32%',
  },
  {
    title: 'Automático, CVT, DSG e robotizados',
    description: 'Atendemos câmbio automático, CVT, DSG, Dualogic, I-Motion e os demais modelos.',
    image: tipos,
    imageAlt: 'Corpo de válvulas e componentes de câmbio desmontados na bancada',
    imagePosition: 'center 62%',
  },
]

/** Fica abaixo da foto do câmbio, com ícone — não na lista de miniaturas. */
export const transmissionWarranty = {
  title: 'Garantia de 1 ano',
  description: 'Cobre os serviços realizados em transmissão.',
}
