<script setup lang="ts">
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { brands } from '@/data/brands'

/**
 * Logos desenhados em preto/quase-preto sobre fundo transparente — sem
 * cor propria que se destaque no ink-900 do site. Confirmado inspecionando
 * o fill/stroke de cada SVG e depois na tela renderizada (ver commits
 * anteriores). Ford, Hyundai, Fiat e Chevrolet tem cor propria e ficam
 * como estao; so estes recebem o filtro que os deixa em branco.
 */
const needsWhiteTint = new Set([
  'Toyota',
  'Honda',
  'Nissan',
  'Volkswagen',
  'Mercedes-Benz',
  'Audi',
  'Jeep',
  'Renault', // sem fill explicito no SVG — cai no preto padrao
  'BMW', // emblema cromado 100% opaco (mesma familia do Fiat) — vira
  // circulo solido branco em vez de preto invisivel
])
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
      Filtro SVG que tinge de BRANCO os logos sem cor propria (ver
      needsWhiteTint acima). Mesma tecnica feColorMatrix calibrada para o
      dourado antes (commit dd71a37): zera R/G/B e poe uma constante 1 em
      cada canal (branco puro), preservando o alfa original — bordas
      anti-aliased continuam suaves, e a cor sai exata, sem tentativa e
      erro. So os logos SEM cor propria recebem isso; Ford, Hyundai, Fiat
      e Chevrolet mantem a cor real da marca.
    -->
    <svg width="0" height="0" aria-hidden="true" style="position: absolute">
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
          :class="{ 'white-logo': needsWhiteTint.has(brand.name) }"
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
