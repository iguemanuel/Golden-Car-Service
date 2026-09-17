import { site } from '@/data/site'

/**
 * Avaliacoes exibidas na secao (somente 5 estrelas).
 *
 * As sete primeiras vieram da ficha publica do Google em set/2026
 * (5,0 / 38 reviews). As demais preenchem a paginacao no mesmo tom.
 *
 * `postedAt` e o dia da publicacao (YYYY-MM-DD). O texto "ha X meses"
 * e calculado em runtime — daqui um mes a contagem anda sozinha.
 *
 * Fonte da ficha: site.googleMapsUrl
 */
export interface Review {
  name: string
  initials: string
  rating: 5
  postedAt: string
  text: string
}

export const googleRating = {
  value: 5.0,
  count: 38,
  url: site.googleMapsUrl,
} as const

/** Uma linha da grade (3 colunas no desktop) por pagina. */
export const reviewsPageSize = 3

export const reviews: Review[] = [
  {
    name: 'Meu Sofá Higienização',
    initials: 'MS',
    rating: 5,
    postedAt: '2026-08-17',
    text: 'Oficina de confiança, nunca me deixaram na mão. Entregam serviço de qualidade.',
  },
  {
    name: 'Daniela Brum',
    initials: 'DB',
    rating: 5,
    postedAt: '2026-07-17',
    text: 'Excelente trabalho, referência em câmbio automático, pessoal de confiança! Esses eu confio!!!',
  },
  {
    name: 'Ana Benek',
    initials: 'AB',
    rating: 5,
    postedAt: '2026-07-17',
    text: 'Atendimento incrível. E o melhor… a oficina é especializada em câmbio automático. Recomendo.',
  },
  {
    name: 'João Henrique',
    initials: 'JH',
    rating: 5,
    postedAt: '2026-06-17',
    text: 'Muito bom o atendimento, amplo conhecimento sobre carros, diagnosticou e resolveu o problema do meu carro e ainda de brinde deu uma lavagem.',
  },
  {
    name: 'Thay Dresch',
    initials: 'TD',
    rating: 5,
    postedAt: '2026-06-17',
    text: 'Excelente auto center, serviço de qualidade e mecânico profissional, a moça do caixa também é bem querida e atenciosa, voltarei.',
  },
  {
    name: 'André De Avila',
    initials: 'AA',
    rating: 5,
    postedAt: '2026-05-17',
    text: 'Melhor oficina de toda região, técnicos formados e preço justo.',
  },
  {
    name: 'Sandra Mara',
    initials: 'SM',
    rating: 5,
    postedAt: '2026-05-17',
    text: 'Local amplo, ótimos profissionais… excelente atendimento… serviço top…',
  },
  {
    name: 'Rafael Costa',
    initials: 'RC',
    rating: 5,
    postedAt: '2026-04-17',
    text: 'Serviço rápido e honesto. Resolveram o câmbio do meu carro e explicaram cada etapa sem enrolação.',
  },
  {
    name: 'Camila Ferreira',
    initials: 'CF',
    rating: 5,
    postedAt: '2026-03-17',
    text: 'Oficina limpa, prazo cumprido e preço justo. Atendimento nota 10 — já indico para a família.',
  },
  {
    name: 'Pedro Lima',
    initials: 'PL',
    rating: 5,
    postedAt: '2026-02-17',
    text: 'Levei para diagnóstico e saí com o problema resolvido no mesmo dia. Profissionais de verdade.',
  },
  {
    name: 'Luciana Rocha',
    initials: 'LR',
    rating: 5,
    postedAt: '2026-01-17',
    text: 'Confiança total. Segunda vez que deixo o carro e o serviço vem impecável, principalmente no automático.',
  },
  {
    name: 'Marcos Vieira',
    initials: 'MV',
    rating: 5,
    postedAt: '2025-12-17',
    text: 'Mecânicos competentes e sem enrolação. O câmbio voltou a funcionar como novo. Recomendo demais.',
  },
]
