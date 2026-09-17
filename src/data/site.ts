/**
 * Fonte unica de verdade dos dados da empresa.
 *
 * Nenhum componente deve escrever telefone, e-mail ou endereco direto no template —
 * tudo sai daqui. Quando a Erica mandar o material que falta, e este o unico arquivo
 * que precisa mudar.
 */

/** Campos marcados assim ainda estao pendentes de confirmacao com o cliente. */
const PENDENTE = true

export const site = {
  name: 'Golden Car Service',
  shortName: 'Golden Car',
  tagline: 'Especialista em câmbio automático',
  description:
    'Especialista em troca de óleo de câmbio automático, reparos no câmbio, ' +
    'mecânica em geral, suspensão, motor, freios e performance.',

  contact: {
    /** Numero cru, do jeito que o cliente informou. */
    phone: '42991654493',
    /** Formatado para exibicao. */
    phoneDisplay: '(42) 99165-4493',
    /** Formato internacional exigido pelo wa.me: 55 + DDD + numero. */
    whatsapp: '5542991654493',
    email: 'goldencarservice@outlook.com',
    instagram: 'golden_carservice',
    instagramUrl: 'https://instagram.com/golden_carservice',
  },

  /**
   * PENDENTE: endereco completo nao foi informado no briefing.
   * DDD 42 cobre a regiao de Ponta Grossa / Guarapuava (PR) — confirmar com o cliente.
   * Sem isso nao da para fechar o mapa nem o JSON-LD de negocio local.
   */
  address: {
    pending: PENDENTE,
    street: 'Rua a confirmar, 000',
    district: 'Bairro a confirmar',
    city: 'Ponta Grossa',
    state: 'PR',
    zip: '00000-000',
    /** Query usada no embed do Google Maps enquanto o endereco real nao chega. */
    mapsQuery: 'Ponta Grossa, PR',
  },

  /** PENDENTE: horario de funcionamento nao informado. */
  hours: {
    pending: PENDENTE,
    weekdays: 'Segunda a sexta, 8h às 18h',
    saturday: 'Sábado, 8h às 12h',
    sunday: 'Domingo, fechado',
  },

  /**
   * IDs de tracking. Ficam vazios ate o cliente informar — trackContactClick()
   * checa antes de disparar, entao string vazia simplesmente nao rastreia nada
   * em vez de quebrar a pagina.
   */
  tracking: {
    googleAdsId: '',
    googleAdsConversionLabel: '',
    metaPixelId: '',
  },

  /** Dominio pretendido, ainda nao registrado. Usado nas meta tags canonicas. */
  url: 'https://goldencarservice.com.br',

  /**
   * Ficha no Google Maps. O `!9m1!1b1` abre direto na aba de avaliacoes.
   * CID 0xf64678b9e55c0b55 — conferido na ficha publica da oficina.
   */
  googleMapsUrl:
    'https://www.google.com/maps/place/Golden+Car+Service/@-25.3593592,-51.4648012,17z/data=!4m8!3m7!1s0x94ef37ab873424f1:0xf64678b9e55c0b55!8m2!3d-25.3593592!4d-51.4648012!9m1!1b1',
} as const

/** Endereco em uma linha, para footer e meta tags. */
export const fullAddress = `${site.address.street} — ${site.address.district}, ${site.address.city}/${site.address.state}`
