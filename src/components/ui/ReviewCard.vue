<script setup lang="ts">
import { Star } from 'lucide-vue-next'

import type { Review } from '@/data/reviews'
import { formatRelativePast } from '@/utils/relativeDate'

defineProps<{
  review: Review
}>()
</script>

<template>
  <article
    class="flex h-full flex-col gap-4 rounded-xl border border-hairline-gold bg-ink-800 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg hover:shadow-black/30"
  >
    <header class="flex items-center gap-3">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10 font-display text-sm font-bold tracking-wide text-gold-400 ring-1 ring-gold-500/30"
        aria-hidden="true"
      >
        {{ review.initials }}
      </span>
      <div class="min-w-0">
        <p class="truncate font-display text-sm font-semibold text-white">{{ review.name }}</p>
        <time class="text-xs text-neutral-500" :datetime="review.postedAt">{{
          formatRelativePast(review.postedAt)
        }}</time>
      </div>
    </header>

    <p class="flex gap-0.5" :aria-label="`${review.rating} de 5 estrelas`">
      <Star
        v-for="n in review.rating"
        :key="n"
        :size="14"
        class="fill-gold-500 text-gold-500"
        aria-hidden="true"
      />
    </p>

    <p class="text-sm leading-relaxed text-neutral-300">“{{ review.text }}”</p>
  </article>
</template>
