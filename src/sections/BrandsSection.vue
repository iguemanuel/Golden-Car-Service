<script setup lang="ts">
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { brands } from '@/data/brands'
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
      <div class="brands-track flex w-max items-center gap-8">
        <div
          v-for="(brand, i) in [...brands, ...brands, ...brands]"
          :key="`${brand.name}-${i}`"
          class="flex h-16 w-32 shrink-0 items-center justify-center rounded-xl bg-neutral-100 px-5 shadow-sm"
        >
          <!--
            Chip claro por tras de cada logo: a maioria dos SVGs (Honda,
            Volkswagen, Nissan, Mercedes, Audi, Jeep, Toyota...) e desenhada
            em preto/tom escuro para fundo claro — sobre o ink-900 do site
            ficariam com contraste baixissimo ou invisiveis. Confirmado
            olhando o fill de cada arquivo antes de escrever este componente,
            nao por tentativa e erro.
          -->
          <img
            :src="brand.logo"
            :alt="brand.name"
            class="h-8 w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
            loading="lazy"
            width="96"
            height="32"
          />
        </div>
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
