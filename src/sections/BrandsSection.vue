<script setup lang="ts">
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { brands } from '@/data/brands'
</script>

<template>
  <section class="border-y border-ink-700/60 bg-ink-900 px-4 py-14 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <RevealOnScroll>
        <p
          class="mb-8 text-center font-display text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase"
        >
          Atendemos todas as marcas
        </p>

        <ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <li
            v-for="brand in brands"
            :key="brand"
            class="font-display text-base font-bold text-neutral-500 transition-colors hover:text-gold-500 sm:text-lg"
          >
            {{ brand }}
          </li>
        </ul>
      </RevealOnScroll>
    </div>
  </section>
</template>
