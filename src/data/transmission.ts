/**
 * Itens do destaque de câmbio automático — a especialidade da casa, em
 * evidência ANTES do grid genérico de serviços (ver TransmissionSection.vue).
 *
 * `icon` é o nome exportado por lucide-vue-next; o componente resolve a
 * string pelo nome, então adicionar um item aqui não exige tocar no .vue.
 */
export interface TransmissionItem {
  icon: string
  title: string
  description: string
}

export const transmissionItems: TransmissionItem[] = [
  {
    icon: 'Droplets',
    title: 'Troca de óleo com equipamento de fluxo',
    description:
      'O fluido é trocado por completo, não apenas drenado pelo cárter — o câmbio sai com óleo novo do início ao fim do circuito.',
  },
  {
    icon: 'ScanLine',
    title: 'Diagnóstico eletrônico computadorizado',
    description:
      'Leitura das centrais eletrônicas para identificar a causa real do problema antes de qualquer desmontagem.',
  },
  {
    icon: 'Cog',
    title: 'Reparo e retífica completa',
    description:
      'Desmontagem, troca de componentes internos e remontagem com os ajustes de fábrica do câmbio automático.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Garantia no serviço e nas peças',
    description: 'Todo reparo de câmbio sai com garantia — sem letra miúda.',
  },
]
