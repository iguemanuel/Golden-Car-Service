<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import CabBadge from '@/components/ui/CabBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { transmissionItems } from '@/data/transmission'
import { site } from '@/data/site'
import { resolveIcon } from '@/utils/icons'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { STAGGER_STEP } from '@/utils/motion'

import cambioCutaway from '@/assets/imgs/cambio-cutaway.webp'

const { buildUrl } = useWhatsApp()
const whatsappUrl = buildUrl(
  `Olá! Vim pelo site da ${site.name} e gostaria de fazer um orçamento para o câmbio automático.`,
)
</script>

<template>
  <section id="cambio" class="scroll-mt-20 bg-ink-900 px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <!-- Texto: lista de itens da especialidade -->
      <div>
        <RevealOnScroll>
          <SectionHeading
            align="left"
            eyebrow="A especialidade da casa"
            title="Reparo e reformas de câmbio automático completo"
            subtitle="Somos especialistas em transmissão automática."
          />
        </RevealOnScroll>

        <ul class="mt-10 flex flex-col gap-6">
          <RevealOnScroll
            v-for="(item, i) in transmissionItems"
            :key="item.title"
            :delay="i * STAGGER_STEP"
          >
            <li class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 ring-1 ring-gold-500/30"
              >
                <component
                  :is="resolveIcon(item.icon)"
                  :size="20"
                  class="text-gold-500"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 class="text-base font-semibold text-white">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-neutral-400">{{ item.description }}</p>
              </div>
            </li>
          </RevealOnScroll>
        </ul>

        <RevealOnScroll :delay="transmissionItems.length * STAGGER_STEP">
          <BaseButton :href="whatsappUrl" external size="lg" class="group mt-10">
            Falar sobre meu câmbio
            <ArrowRight
              :size="18"
              class="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </BaseButton>
        </RevealOnScroll>
      </div>

      <!--
        A foto do cutaway veio com fundo branco de estande de feira — em vez
        de esconder isso, a moldura escura com filete dourado assume o fundo
        branco como uma "placa tecnica" intencional, em vez de brigar com o
        resto da pagina como full-bleed.
      -->
      <RevealOnScroll :delay="STAGGER_STEP">
        <div class="relative">
          <!--
            O inset acompanha o padding da <section> (px-4 sm:px-6) de
            proposito: no mobile, -inset-6 (24px) vazava 8px para fora da
            tela porque o padding da secao naquela largura e so 16px
            (px-4). Casando os dois, o brilho nunca ultrapassa o viewport.
          -->
          <div
            class="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gold-500/10 blur-2xl sm:-inset-6"
            aria-hidden="true"
          ></div>
          <div
            class="overflow-hidden rounded-2xl border border-hairline-gold bg-ink-800 p-3 shadow-2xl shadow-black/40"
          >
            <img
              :src="cambioCutaway"
              alt="Corte técnico de um câmbio automático, mostrando engrenagens e componentes internos"
              class="w-full rounded-lg"
              width="1200"
              height="800"
              loading="lazy"
            />
          </div>

          <!--
            Carimbo da CAB na borda INFERIOR da moldura, nao dentro dela: a
            metade de baixo da foto e um pedestal branco de estande, e uma
            placa clara ali sumiria. Encostado na borda, o selo fica metade
            sobre o ink-800 da moldura e metade sobre o ink-900 da secao —
            e dai que vem o contraste. Precisa ser irmao da <div> acima
            (que tem overflow-hidden), senao seria cortado.

            O transbordo horizontal so entra a partir de sm: pelo mesmo
            motivo do brilho logo acima — no mobile o padding da secao e
            px-4 (16px), entao -right-5 (20px) vazaria para fora da tela.
            Ate sm o carimbo fica dentro da largura da moldura e transborda
            so na vertical, que e seguro.
          -->
          <CabBadge
            variant="stamp"
            class="absolute right-4 -bottom-4 z-10 sm:-right-5 sm:-bottom-5"
          />
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
