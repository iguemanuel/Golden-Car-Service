import { site } from '@/data/site'

/**
 * Injeta o JSON-LD schema.org/AutoRepair no <head>.
 *
 * Feito em JS (nao hardcoded em index.html) porque os dados sensiveis
 * (endereco, telefone, horario) ainda estao com `pending: true` em
 * site.ts — assim que a Erica confirmar e o arquivo for atualizado, o
 * structured data acompanha sozinho, sem precisar editar HTML.
 */
export function injectStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: site.name,
    description: site.description,
    image: `${site.url}/og-image.jpg`,
    url: site.url,
    telephone: `+55${site.contact.phone}`,
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '12:00',
      },
    ],
    sameAs: [site.contact.instagramUrl, site.contact.facebookUrl],
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
