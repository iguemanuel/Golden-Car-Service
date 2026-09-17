<script setup lang="ts">
import { computed } from 'vue'

import { resolveIcon } from '@/utils/icons'

/**
 * Card de servico: icone + titulo + descricao. O icone vem por nome (string
 * de src/data/services.ts) e e resolvido contra o registro em data/icons.ts
 * — ver o comentario la sobre por que nao "import *".
 */
const props = defineProps<{
  icon: string
  title: string
  description: string
}>()

const IconComponent = computed(() => resolveIcon(props.icon))
</script>

<template>
  <article
    class="group flex h-full flex-col gap-4 rounded-xl border border-hairline-gold bg-ink-800 p-6 transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg hover:shadow-black/30"
  >
    <div
      class="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/10 ring-1 ring-gold-500/30 transition-colors group-hover:bg-gold-500/15"
    >
      <component :is="IconComponent" :size="22" class="text-gold-500" aria-hidden="true" />
    </div>

    <h3 class="text-lg">{{ title }}</h3>
    <p class="text-sm text-neutral-400">{{ description }}</p>
  </article>
</template>
