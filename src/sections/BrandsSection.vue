<script setup lang="ts">
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { brands } from '@/data/brands'
</script>

<template>
  <section class="border-y border-ink-700/60 bg-ink-900 py-14" aria-label="Marcas atendidas">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <h2
          class="mb-8 text-center font-display text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase"
        >
          Atendemos todas as marcas
        </h2>
      </RevealOnScroll>
    </div>

    <!--
      Marquee 100% CSS: a lista de logos e triplicada lado a lado e a
      animacao desloca exatamente 1/3 da largura — como os tres blocos sao
      identicos, o ciclo fecha sem nenhum salto visivel. Sem JS, sem lib.

      mask-image esmaece as pontas para a cor do fundo, para os logos nao
      aparecerem/sumirem de forma abrupta na borda da secao.

      brightness-0 invert transforma qualquer SVG (preto, vermelho, azul)
      numa silhueta branca — mesma tecnica de logo cloud em fundo escuro,
      sem filtro SVG por marca. Excecao: `brand.chip` (Peugeot, ver
      src/data/brands.ts) — um crachá de duas cores opacas onde esse filtro
      fundiria tudo numa mancha solida, entao mantem a cor original dentro
      de um chip claro.
    -->
    <div
      class="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div class="brands-track flex w-max items-center gap-12 sm:gap-14">
        <img
          v-for="(brand, i) in [...brands, ...brands, ...brands]"
          :key="`${brand.name}-${i}`"
          :src="brand.logo"
          :alt="brand.name"
          :width="brand.naturalWidth"
          :height="brand.naturalHeight"
          :style="{ width: brand.width }"
          :class="
            brand.chip
              ? 'h-10 shrink-0 rounded-full bg-neutral-100 object-contain p-1 opacity-80 transition-opacity duration-300 hover:opacity-100'
              : 'h-10 shrink-0 object-contain opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100'
          "
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

.group:hover .brands-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .brands-track {
    animation: none;
  }
}
</style>
