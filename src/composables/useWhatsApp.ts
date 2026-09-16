import { site } from '@/data/site'
import { trackContactClick } from '@/utils/tracking'

/**
 * Monta e abre conversas no WhatsApp.
 *
 * Todo CTA da pagina passa por aqui. O parametro `source` vai junto para o
 * tracking e tambem entra na mensagem, entao da para saber de qual secao o
 * lead veio so de olhar a conversa.
 */
export function useWhatsApp() {
  function buildUrl(message: string) {
    return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`
  }

  function open(message: string, source: string) {
    trackContactClick(source)
    window.open(buildUrl(message), '_blank', 'noopener,noreferrer')
  }

  /** Mensagem generica dos CTAs de secao. */
  function openDefault(source: string) {
    open(
      `Olá! Vim pelo site da ${site.name} e gostaria de fazer um orçamento.`,
      source,
    )
  }

  /** Mensagem de um servico especifico, vinda dos cards. */
  function openForService(serviceName: string, source: string) {
    open(
      `Olá! Vim pelo site da ${site.name} e gostaria de saber mais sobre: ${serviceName}.`,
      source,
    )
  }

  return { buildUrl, open, openDefault, openForService }
}
