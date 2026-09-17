/**
 * ATENCAO — NUMEROS PROVISORIOS, NAO CONFIRMADOS PELO CLIENTE.
 *
 * Os valores abaixo foram inventados para dar forma ao layout. Eles sao
 * afirmacoes sobre um negocio real (tempo de mercado, nota, volume de
 * atendimento) e NAO PODEM IR AO AR sem a Erica confirmar cada um.
 *
 * Antes do deploy: confirmar os quatro valores ou remover o bloco inteiro do
 * hero. Publicar numero inventado sobre empresa real engana o consumidor e
 * expoe o cliente.
 */
export const highlightsPending = true

export interface Highlight {
  value: string
  label: string
}

export const highlights: Highlight[] = [
  { value: '10+', label: 'anos de estrada' },
  { value: '4.9', label: 'nota no Google' },
  { value: '2.000+', label: 'veículos atendidos' },
  { value: '90 dias', label: 'de garantia' },
]
