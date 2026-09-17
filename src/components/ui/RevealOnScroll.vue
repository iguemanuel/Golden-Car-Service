<script setup lang="ts">
import { ref } from 'vue'

import { useReveal } from '@/composables/useReveal'

/**
 * Envolve um bloco e o faz surgir quando entra na viewport.
 *
 * `delay` escalona itens de uma mesma grade. A animacao em si e neutralizada
 * pelo prefers-reduced-motion definido em styles/index.css.
 */
withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

const el = ref<HTMLElement | null>(null)
const { revealed } = useReveal(el)
</script>

<template>
  <div
    ref="el"
    :class="revealed ? 'animate-reveal' : 'opacity-0'"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>
