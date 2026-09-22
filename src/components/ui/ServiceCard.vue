<script setup lang="ts">
import { computed } from 'vue'

import { resolveIcon } from '@/utils/icons'

/**
 * Card de servico: texto à esquerda, foto à direita. O icone vem por nome
 * (string de src/data/services.ts) e e resolvido contra o registro em
 * data/icons.ts — ver o comentario la sobre por que nao "import *".
 *
 * A foto sangra na borda direita e estica na altura do card. O recorte
 * (object-position) vem do data file, porque o assunto de cada foto nao
 * fica no mesmo ponto do quadro.
 */
const props = defineProps<{
  icon: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
}>()

const IconComponent = computed(() => resolveIcon(props.icon))
</script>

<template>
  <article
    class="group flex h-full overflow-hidden rounded-xl border border-hairline-gold bg-ink-800 transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg hover:shadow-black/30"
  >
    <div class="flex min-w-0 flex-1 flex-col gap-3 p-5">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/10 ring-1 ring-gold-500/30 transition-colors group-hover:bg-gold-500/15"
      >
        <component :is="IconComponent" :size="22" class="text-gold-500" aria-hidden="true" />
      </div>

      <h3 class="text-lg">{{ title }}</h3>
      <p class="text-sm text-neutral-400">{{ description }}</p>
    </div>

    <div class="relative w-28 shrink-0 sm:w-36 lg:w-40">
      <img
        :src="image"
        :alt="imageAlt"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        :style="{ objectPosition: imagePosition ?? 'center' }"
        loading="lazy"
      />
    </div>
  </article>
</template>
