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
      Filtro SVG que tinge qualquer logo do dourado exato da marca
      (--color-gold-500, #D4AF37), preservando o alfa original (entao a
      borda anti-aliased do PNG/SVG continua suave, nao serrilhada).

      feColorMatrix com esta forma zera R/G/B e poe uma CONSTANTE em cada
      canal (0.831, 0.686, 0.216 = 212/255, 175/255, 55/255) — sai #D4AF37
      exato em qualquer pixel que tinha alguma opacidade, sem depender da
      cor de origem. O ultimo 0 mantem o alfa original (nao mexe nele).

      Por que nao um filter: CSS generico (brightness/sepia/hue-rotate):
      chegava perto, mas so por aproximacao — girar o matiz a partir de
      preto nao alcanca qualquer RGB alvo com exatidao, sobrava sempre um
      canal alguns pontos fora (testado por amostragem de pixel real).
      feColorMatrix calcula a cor exata, sem tentativa e erro.

      Limitacao conhecida: por ser baseado em ALFA (nao em cor), qualquer
      area opaca vira dourado igual, nao importa a cor original — entao um
      logo cujo detalhe interno e so COR (sem transparencia de verdade
      naquele ponto) perde esse detalhe. Confirmado em 3 dos 14:
      - Fiat e BMW: o emblema original e um disco cromado fotorrealista,
        opaco por inteiro (o "brilho" e feito com gradiente de cor, nao com
        transparencia) — vira um circulo solido
      - Ford: o texto cursivo e desenhado em tinta BRANCA OPACA por cima do
        oval AZUL OPACO (nao um vazado de verdade) — os dois tem alfa=1
        igual, entao ficam indistinguiveis e viram um oval solido
      Diferente da Volkswagen/Audi/Toyota, que desenham o "buraco" como
      transparencia de verdade (fill-rule ou stroke) — essas mantiveram o
      detalhe perfeitamente. Corrigir Fiat/Ford/BMW exigiria redesenhar o
      vetor (operacao booleana), desproporcional para uma faixa de marcas;
      o circulo/oval solido ainda le como selo estilizado, nao como erro.
    -->
    <svg width="0" height="0" aria-hidden="true" style="position: absolute">
      <filter id="gold-tint" color-interpolation-filters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.8314  0 0 0 0 0.6863  0 0 0 0 0.2157  0 0 0 1 0"
        />
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
          class="brand-logo h-9 w-28 shrink-0 object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
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

.brand-logo {
  filter: url(#gold-tint);
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
