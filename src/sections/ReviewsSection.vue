<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import ReviewCard from '@/components/ui/ReviewCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { googleRating, reviews, reviewsPageSize } from '@/data/reviews'
import { STAGGER_STEP } from '@/utils/motion'

const page = ref(1)
const direction = ref<'next' | 'prev'>('next')
const totalPages = computed(() => Math.ceil(reviews.length / reviewsPageSize))
const pageReviews = computed(() => {
  const start = (page.value - 1) * reviewsPageSize
  return reviews.slice(start, start + reviewsPageSize)
})
const transitionName = computed(() =>
  direction.value === 'next' ? 'reviews-next' : 'reviews-prev',
)

function goTo(next: number) {
  const clamped = Math.min(totalPages.value, Math.max(1, next))
  if (clamped === page.value) return
  direction.value = clamped > page.value ? 'next' : 'prev'
  page.value = clamped
  document.getElementById('avaliacoes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section id="avaliacoes" class="scroll-mt-20 bg-ink-900 px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Quem já passou por aqui"
          title="Avaliações"
          subtitle="O que os clientes escrevem na ficha do Google — nota 5,0 em 38 avaliações."
        />
      </RevealOnScroll>

      <RevealOnScroll :delay="STAGGER_STEP">
        <div
          class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8"
        >
          <p class="flex items-baseline gap-2">
            <span class="font-display text-5xl font-extrabold text-gradient-gold">{{
              googleRating.value.toFixed(1).replace('.', ',')
            }}</span>
            <span class="flex gap-0.5" aria-hidden="true">
              <Star
                v-for="n in 5"
                :key="n"
                :size="16"
                class="fill-gold-500 text-gold-500"
              />
            </span>
          </p>
          <p class="text-sm text-neutral-400">
            {{ googleRating.count }} avaliações no Google
          </p>
        </div>
      </RevealOnScroll>

      <!--
        UM SO RevealOnScroll pro bloco inteiro (entrada quando a secao
        aparece no scroll) — antes cada card tinha o seu proprio, dentro do
        v-for. Como o grid troca de `:key="page"` a cada clique de
        paginacao, cada RevealOnScroll individual remontava do zero e
        tocava a animacao de entrada de novo, ao mesmo tempo que o
        <Transition> do proprio grid — duas animacoes sobrepostas a cada
        pagina. Agora so o <Transition> (o slide lateral) anima a troca de
        pagina; a entrada com fade continua so na primeira vez que a secao
        aparece.
      -->
      <RevealOnScroll :delay="STAGGER_STEP * 2" class="mt-12">
        <div class="relative min-h-64 overflow-hidden">
          <Transition :name="transitionName" mode="out-in">
            <div
              :key="page"
              class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <ReviewCard v-for="review in pageReviews" :key="review.name" :review="review" />
            </div>
          </Transition>
        </div>
      </RevealOnScroll>

      <nav
        v-if="totalPages > 1"
        class="mt-10 flex items-center justify-center gap-2"
        aria-label="Paginação das avaliações"
      >
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 text-neutral-300 transition-colors hover:border-gold-500 hover:text-gold-500 disabled:pointer-events-none disabled:opacity-40"
          :disabled="page === 1"
          aria-label="Página anterior"
          @click="goTo(page - 1)"
        >
          <ChevronLeft :size="18" aria-hidden="true" />
        </button>

        <button
          v-for="n in totalPages"
          :key="n"
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-bold transition-colors"
          :class="
            n === page
              ? 'bg-gold-500 text-ink-950'
              : 'border border-ink-600 text-neutral-300 hover:border-gold-500 hover:text-gold-500'
          "
          :aria-label="`Página ${n}`"
          :aria-current="n === page ? 'page' : undefined"
          @click="goTo(n)"
        >
          {{ n }}
        </button>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 text-neutral-300 transition-colors hover:border-gold-500 hover:text-gold-500 disabled:pointer-events-none disabled:opacity-40"
          :disabled="page === totalPages"
          aria-label="Próxima página"
          @click="goTo(page + 1)"
        >
          <ChevronRight :size="18" aria-hidden="true" />
        </button>
      </nav>

      <RevealOnScroll :delay="STAGGER_STEP * 3">
        <div class="mt-10 flex justify-center">
          <BaseButton :href="googleRating.url" external variant="outline">
            Ver todas no Google
            <ArrowUpRight :size="16" aria-hidden="true" />
          </BaseButton>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
