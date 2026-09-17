<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { highlights } from '@/data/highlights'
import { site } from '@/data/site'
import { useWhatsApp } from '@/composables/useWhatsApp'

import heroImage from '@/assets/imgs/hero-engrenagens.webp'

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
      <img
        :src="heroImage"
        alt=""
        class="h-full w-full object-cover"
        width="1400"
        height="1050"
        fetchpriority="high"
      />
    </div>

    <!--
      Escurecimento do texto. No mobile cobre tudo; no desktop precisa terminar
      ANTES da diagonal (que comeca em 40%), senao o preto opaco cobre o filete
      dourado — os dois estao em -z-10 e quem vem depois no DOM pinta por cima.
    -->
    <div
      class="absolute inset-0 -z-10 bg-ink-950/75 lg:bg-[linear-gradient(100deg,var(--color-ink-950)_0%,var(--color-ink-950)_26%,transparent_44%)]"
      aria-hidden="true"
    ></div>

    <!-- Brilho dourado radial -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_20%_10%,rgba(212,175,55,0.14),transparent_70%)]"
      aria-hidden="true"
    ></div>

    <!--
      Filete dourado sobre a diagonal. Fica por ULTIMO de proposito: e o unico
      jeito de ele ficar visivel acima do scrim e do brilho.
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
