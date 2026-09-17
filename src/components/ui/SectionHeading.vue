<script setup lang="ts">
/**
 * Cabecalho padrao das secoes: sobretitulo em dourado, titulo em display e
 * um subtitulo opcional. Mantem o ritmo vertical igual em toda a pagina.
 */
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
  }>(),
  { align: 'center' },
)
</script>

<template>
  <header
    class="flex max-w-2xl flex-col gap-3"
    :class="align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left'"
  >
    <p
      v-if="eyebrow"
      class="font-display text-xs font-bold tracking-[0.2em] text-gold-500 uppercase"
    >
      {{ eyebrow }}
    </p>

    <h2 class="text-3xl sm:text-4xl">
      {{ title }}
    </h2>

    <!-- Filete dourado: o mesmo separador que o logo usa embaixo de "CAPM" -->
    <div class="h-0.5 w-14 rounded-full bg-gold-500"></div>

    <p v-if="subtitle" class="text-neutral-400">
      {{ subtitle }}
    </p>
  </header>
</template>
