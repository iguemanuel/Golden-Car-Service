import { site } from '@/data/site'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Dispara a conversao de contato no Google Ads e no Meta Pixel.
 *
 * Diferente da versao do Valdeci, os IDs nao sao hardcoded: saem de site.ts e
 * comecam vazios. Se o cliente ainda nao mandou os IDs, a funcao nao faz nada —
 * nada quebra e nada e enviado para lugar nenhum.
 */
export function trackContactClick(source: string) {
  const { googleAdsId, googleAdsConversionLabel, metaPixelId } = site.tracking

  if (googleAdsId && googleAdsConversionLabel && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
      value: 1.0,
      currency: 'BRL',
    })
  }

  if (metaPixelId && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: source })
  }
}
