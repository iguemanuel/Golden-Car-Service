<script setup lang="ts">
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { brands } from '@/data/brands'

/**
 * Cor oficial de cada marca, para os logos que nao tem cor propria
 * suficiente no SVG (a maioria vinha em preto/quase-preto, sem contraste
 * sobre o ink-900 do site). Hex pesquisados e conferidos por marca — nao
 * inventados — nas paginas oficiais/guias de marca de cada fabricante.
 *
 * Ford, Chevrolet, Hyundai e Mitsubishi ficam de fora: o proprio SVG ja
 * usa a cor certa (conferido contra a pesquisa) ou, no caso do Chevrolet,
 * o gradiente multi-tom nativo ja renderiza bem — aplicar um tingimento
 * solido so pioraria, achatando o efeito cromado numa cor chapada.
 * BMW fica de fora a pedido do cliente (mantem a cor original mesmo com
 * contraste baixo).
 */
const brandColors: Record<string, string> = {
  Toyota: '#EB0A1E',
  Honda: '#CC0000',
  Nissan: '#C3002F',
  Volkswagen: '#001E50',
  Renault: '#EFDF00',
  Fiat: '#C41E3A',
}

/**
 * Mercedes-Benz, Audi e Jeep NAO tem uma cor de marca solida de verdade —
 * o emblema oficial das tres e cromado/prata/preto; qualquer hex aqui
 * seria uma cor de marketing digital, nao do logo. Ficam em branco em vez
 * de uma cor inventada.
 */
const whiteTint = new Set(['Mercedes-Benz', 'Audi', 'Jeep'])

/** ids de elemento precisam ser validos e unicos — hifen e o unico caractere especial que sobra do nome da marca. */
function filterId(name: string) {
  return `tint-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

/** Converte #RRGGBB nas constantes 0..1 que o feColorMatrix espera. */
function colorMatrix(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return `0 0 0 0 ${r.toFixed(4)}  0 0 0 0 ${g.toFixed(4)}  0 0 0 0 ${b.toFixed(4)}  0 0 0 1 0`
}
</script>

<template>
  <section class="border-y border-ink-700/60 bg-ink-900 py-14" aria-label="Marcas atendidas">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <p
          class="mb-8 text-center font-display text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase"
        >
          Atendemos todas as marcas
        </p>
      </RevealOnScroll>
    </div>

    <!--
      Um filtro SVG por marca tingida (feColorMatrix zera R/G/B e poe a
      cor oficial como constante, preservando o alfa original — a mesma
      tecnica calibrada nos commits anteriores para o dourado e o branco,
      agora generalizada para qualquer hex). Cor exata, sem tentativa e
      erro, bordas anti-aliased continuam suaves.
    -->
    <svg width="0" height="0" aria-hidden="true" style="position: absolute">
      <filter
        v-for="(hex, name) in brandColors"
        :id="filterId(name)"
        :key="name"
        color-interpolation-filters="sRGB"
      >
        <feColorMatrix type="matrix" :values="colorMatrix(hex)" />
      </filter>
      <filter id="white-tint" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
      </filter>
    </svg>

    <!--
      Marquee 100% CSS (mesma tecnica do Valdeci Auto Center, projeto
      anterior do autor): a lista de logos e triplicada lado a lado e a
      animacao desloca exatamente 1/3 da largura — como os tres blocos sao
      identicos, o ciclo fecha sem nenhum salto visivel. Sem JS, sem lib.

      mask-image esmaece as pontas para a cor do fundo, para os logos nao
      aparecerem/sumirem de forma abrupta na borda da secao.
    -->
    <div
      class="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div class="brands-track flex w-max items-center gap-14">
        <img
          v-for="(brand, i) in [...brands, ...brands, ...brands]"
          :key="`${brand.name}-${i}`"
          :src="brand.logo"
          :alt="brand.name"
          class="h-9 w-28 shrink-0 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
          :class="{ 'white-logo': whiteTint.has(brand.name) }"
          :style="brandColors[brand.name] ? { filter: `url(#${filterId(brand.name)})` } : {}"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes brands-scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* Tres blocos identicos: andar 1/3 da largura total fecha o ciclo. */
    transform: translateX(calc(-100% / 3));
  }
}

.brands-track {
  animation: brands-scroll 36s linear infinite;
}

.white-logo {
  filter: url(#white-tint);
}

.group:hover .brands-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .brands-track {
    animation: none;
  }
}
</style>
