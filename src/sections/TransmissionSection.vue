<script setup lang="ts">
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import CabBadge from '@/components/ui/CabBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TransmissionCard from '@/components/ui/TransmissionCard.vue'
import { transmissionItems, transmissionWarranty } from '@/data/transmission'
import { site } from '@/data/site'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { STAGGER_STEP } from '@/utils/motion'

import cambioCutaway from '@/assets/imgs/cambio-cutaway.webp'

const { buildUrl } = useWhatsApp()
const whatsappUrl = buildUrl(
  `Olá! Vim pelo site da ${site.name} e gostaria de fazer um orçamento para o câmbio automático.`,
)
</script>

<template>
  <section id="cambio" class="scroll-mt-24 bg-ink-900 px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="A especialidade da casa"
          title="Reparo completo de câmbio automático"
          subtitle="Somos especialistas em transmissão automática."
        />
      </RevealOnScroll>

      <!--
        A garantia vive no CABECALHO, nao na lista. Ela nao tem foto: dentro
        da lista ficava com um icone de 40px ao lado de itens de foto grande
        e lia como um item menor, pela metade. Como pill centralizada sob o
        titulo ela vira o que de fato e — o selo de confianca da secao — e
        usa o mesmo pill do rotulo do inicio (HeroSection.vue).
      -->
      <RevealOnScroll :delay="STAGGER_STEP">
        <div class="mt-8 flex justify-center">
          <p
            class="inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-ink-900/70 px-5 py-3 text-left backdrop-blur-sm"
          >
            <ShieldCheck :size="20" class="shrink-0 text-gold-500" aria-hidden="true" />
            <span>
              <span class="font-semibold text-white">{{ transmissionWarranty.title }}</span>
              <span class="mx-2 hidden text-ink-600 sm:inline" aria-hidden="true">·</span>
              <span class="block text-sm text-neutral-400 sm:inline">
                {{ transmissionWarranty.description }}
              </span>
            </span>
          </p>
        </div>
      </RevealOnScroll>

      <!--
        Desktop: lista de cards a esquerda, foto a direita. `items-start` em
        vez de esticar as duas colunas: a foto e bem mais baixa que a pilha
        de quatro cards, e deixar as alturas casadas na marra era o que
        abria o vao vertical gigante embaixo dela.
      -->
      <div class="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16">
        <ul class="flex flex-col gap-5">
          <RevealOnScroll
            v-for="(item, i) in transmissionItems"
            :key="item.title"
            :delay="i * STAGGER_STEP"
          >
            <li class="h-full">
              <TransmissionCard
                :title="item.title"
                :description="item.description"
                :image="item.image"
                :image-alt="item.imageAlt"
                :image-position="item.imagePosition"
              />
            </li>
          </RevealOnScroll>
        </ul>

        <!--
          A foto do cutaway veio com fundo branco de estande de feira — em vez
          de esconder isso, a moldura escura com filete dourado assume o fundo
          branco como uma "placa tecnica" intencional, em vez de brigar com o
          resto da pagina como full-bleed.

          `lg:sticky` faz a foto acompanhar a rolagem dos cards, em vez de
          terminar no meio da coluna e deixar o resto vazio. `lg:h-auto`
          nao e opcional: RevealOnScroll aplica h-full na raiz, e um item de
          grid com altura cheia preenche a linha inteira — sticky nunca
          gruda. O sticky fica no PROPRIO elemento animado (nenhum ancestral
          tem transform), entao o `transform: translateY(0)` que a keyframe
          `reveal` deixa aplicado com `forwards` nao vira containing block
          no caminho.
        -->
        <RevealOnScroll :delay="STAGGER_STEP" class="lg:sticky lg:top-28 lg:h-auto lg:self-start">
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

      <!--
        Os dois CTAs fecham a secao numa linha so, fora do grid. Antes cada
        um era o rodape da sua coluna, grudado no fundo por mt-auto — como as
        colunas tem alturas bem diferentes, o da CAB ficava boiando a uns
        200px da foto.
      -->
      <RevealOnScroll :delay="STAGGER_STEP * 2">
        <div class="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <BaseButton :href="whatsappUrl" external size="lg" class="group">
            Falar sobre meu câmbio
            <ArrowRight
              :size="18"
              class="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </BaseButton>

          <BaseButton :href="site.cabUrl" external variant="outline" size="lg">
            Somos associados à CAB
            <ExternalLink :size="18" aria-hidden="true" />
          </BaseButton>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
