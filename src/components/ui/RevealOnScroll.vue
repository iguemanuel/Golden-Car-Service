<script setup lang="ts">
import { ref } from 'vue'

import { useReveal } from '@/composables/useReveal'

/**
 * Envolve um bloco e o faz surgir quando entra na viewport.
 *
 * `delay` escalona itens de uma mesma grade. A animacao em si e neutralizada
 * pelo prefers-reduced-motion definido em styles/index.css.
 *
 * Expoe `revealed` via slot escopado para quem precisa do MESMO sinal de
 * "entrou perto da viewport" para outra coisa alem de animar — ex.:
 * ContactSection.vue usa para so atribuir o `src` do video do Instagram
 * quando a secao aparece, em vez de criar um segundo IntersectionObserver
 * so para isso.
 */
withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

const el = ref<HTMLElement | null>(null)
const { revealed } = useReveal(el)
</script>

<template>
  <div
    ref="el"
    class="h-full"
    :class="revealed ? 'animate-reveal' : 'opacity-0'"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <slot :revealed="revealed" />
  </div>
</template>
