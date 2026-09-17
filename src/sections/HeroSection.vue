<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { highlights } from '@/data/highlights'
import { site } from '@/data/site'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { useSlideshow } from '@/composables/useSlideshow'
import { heroSlides } from '@/data/heroSlides'

const { current, allowed, goTo } = useSlideshow(heroSlides.length)

const { buildUrl } = useWhatsApp()
const whatsappUrl = buildUrl(
  `Olá! Vim pelo site da ${site.name} e gostaria de fazer um orçamento.`,
)

/** Palavras-chave sob o CTA, no lugar de uma frase corrida. */
const keywords = ['Câmbio automático', 'Mecânica geral', 'Performance']
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-ink-950 pt-20">
    <!--
      Foto de fundo com duotone dourado (ver .photo-gold em styles/index.css).

      Mobile: cobre o hero inteiro e o texto fica sobre ela, com um degrade
      escuro garantindo contraste.
      Desktop (lg+): o clip-path recorta a foto em diagonal e ela ocupa so a
      metade direita, deixando o texto na esquerda sobre fundo limpo.
    -->
    <div
      class="photo-gold absolute inset-0 -z-10 lg:[clip-path:polygon(50%_0,100%_0,100%_100%,40%_100%)]"
      aria-hidden="true"
    >
      <!--
        As fotos ficam empilhadas e trocam por opacidade. Somente as liberadas
        por `allowed` sao montadas: a primeira entra na hora (e o LCP), as
        outras so depois, para nao disputar banda com ela.
      -->
      <img
        v-for="(slide, i) in heroSlides.slice(0, allowed)"
        :key="slide.src"
        :src="slide.src"
        alt=""
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
        :class="i === current ? 'opacity-100' : 'opacity-0'"
        width="1280"
        height="960"
        :fetchpriority="i === 0 ? 'high' : 'low'"
        :loading="i === 0 ? 'eager' : 'lazy'"
      />
    </div>

    <!--
      Painel esquerdo OPACO, recortado no complemento exato da diagonal da foto.
      Antes aqui havia um degrade escuro, que deixava a foto vazar por baixo e
      criava uma faixa suja na transicao. Solido resolve: preto limpo a
      esquerda, filete dourado, foto a direita.
      So no desktop — no mobile a foto e full-bleed atras do texto.
    -->
    <div
      class="absolute inset-0 -z-10 hidden bg-ink-950 lg:block lg:[clip-path:polygon(0_0,50%_0,40%_100%,0_100%)]"
      aria-hidden="true"
    ></div>

    <!-- Escurecimento do texto no mobile, onde a foto fica atras dele -->
    <div class="absolute inset-0 -z-10 bg-ink-950/75 lg:hidden" aria-hidden="true"></div>

    <!-- Brilho dourado radial, para o painel solido nao ficar chapado -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_18%_12%,rgba(212,175,55,0.10),transparent_70%)]"
      aria-hidden="true"
    ></div>

    <!--
      Escurecimento no topo, atras da navbar. Com o painel esquerdo opaco a
      foto passou a aparecer em brilho cheio, e os links da navbar que caem
      sobre ela perdiam contraste.
    -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,var(--color-ink-950)_0%,transparent_100%)] opacity-85"
      aria-hidden="true"
    ></div>

    <!--
      Filete dourado sobre a diagonal. Fica por ULTIMO de proposito: e o unico
      jeito de ele ficar visivel acima dos demais planos.
    -->
    <div
      class="absolute inset-0 -z-10 hidden bg-gold-500 lg:block lg:[clip-path:polygon(50%_0,50.2%_0,40.2%_100%,40%_100%)]"
      aria-hidden="true"
    ></div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-7 py-20 text-center lg:max-w-lg lg:items-start lg:text-left"
      >
        <!-- Pill de categoria, como na referencia -->
        <RevealOnScroll>
          <p
            class="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/70 px-4 py-1.5 backdrop-blur-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-gold-500"></span>
            <span class="font-display text-[11px] font-bold tracking-[0.18em] text-gold-400 uppercase">
              {{ site.tagline }}
            </span>
          </p>
        </RevealOnScroll>

        <RevealOnScroll :delay="80">
          <h1 class="text-4xl leading-[1.02] sm:text-5xl lg:text-[4rem]">
            Seu câmbio automático
            <span class="block text-gradient-gold">em boas mãos</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll :delay="160">
          <p class="max-w-lg text-base text-neutral-300 sm:text-lg">
            Troca de óleo com equipamento de fluxo, diagnóstico eletrônico e reparo completo de
            câmbio — além de mecânica em geral, suspensão, motor, freios e performance.
          </p>
        </RevealOnScroll>

        <RevealOnScroll :delay="240">
          <BaseButton :href="whatsappUrl" external size="lg" class="group">
            Fazer orçamento
            <ArrowRight
              :size="18"
              class="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </BaseButton>
        </RevealOnScroll>

        <!-- Lista de palavras-chave, no lugar da frase corrida -->
        <RevealOnScroll :delay="320">
          <ul
            class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-ink-700/60 pt-5 lg:justify-start"
          >
            <li
              v-for="word in keywords"
              :key="word"
              class="flex items-center gap-2 font-display text-[11px] font-bold tracking-[0.14em] text-neutral-400 uppercase"
            >
              <span class="h-1 w-1 rounded-full bg-gold-500"></span>
              {{ word }}
            </li>
          </ul>
        </RevealOnScroll>
      </div>
    </div>

    <!--
      Indicadores da rotacao. Somente no desktop: no mobile a foto fica atras
      do texto e os pontos so competiriam com a leitura.
    -->
    <div
      class="absolute right-8 bottom-36 z-10 hidden items-center gap-2.5 lg:flex"
      role="group"
      aria-label="Trocar foto de fundo"
    >
      <button
        v-for="(slide, i) in heroSlides"
        :key="slide.src"
        type="button"
        class="h-1.5 cursor-pointer rounded-full transition-all duration-300"
        :class="i === current ? 'w-7 bg-gold-500' : 'w-1.5 bg-white/30 hover:bg-white/60'"
        :aria-label="slide.label"
        :aria-current="i === current"
        @click="goTo(i)"
      ></button>
    </div>

    <!-- Faixa de numeros, encostada na base do hero -->
    <RevealOnScroll :delay="400">
      <div class="relative border-t border-ink-700/70 bg-ink-950/80 backdrop-blur-sm">
        <dl class="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-4">
          <div
            v-for="item in highlights"
            :key="item.label"
            class="flex flex-col items-center gap-1 px-4 py-7"
          >
            <dt class="sr-only">{{ item.label }}</dt>
            <dd class="flex flex-col items-center gap-1">
              <span class="text-gradient-gold font-display text-3xl font-extrabold sm:text-4xl">
                {{ item.value }}
              </span>
              <span class="text-xs tracking-wide text-neutral-500 uppercase">
                {{ item.label }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </RevealOnScroll>
  </section>
</template>
