/**
 * Links de navegacao da pagina unica.
 *
 * Navbar e footer leem daqui, entao adicionar uma secao e mudar so este array.
 * Cada `href` precisa bater com o id da <section> correspondente em App.vue.
 */
export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Câmbio automático', href: '#cambio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
]
