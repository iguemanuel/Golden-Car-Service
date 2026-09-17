<script setup lang="ts">
import { site } from '@/data/site'

/**
 * Wordmark da Golden Car Service, reconstruido em texto.
 *
 * Por que texto e nao a imagem: o PNG que o cliente enviou esta em baixa
 * resolucao, e o wordmark aparece na navbar fixa (visivel o tempo todo) e no
 * footer. Em texto ele fica nitido em qualquer tela, pesa zero e continua
 * legivel para busca e leitor de tela.
 *
 * PARA TROCAR PELA IMAGEM quando o arquivo em alta chegar: salvar em
 * src/assets/logo.png, importar aqui e trocar o bloco do template por
 * <img :src="logo" :alt="site.name" />. Nenhum outro arquivo muda.
 */
withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' })
</script>

<template>
  <span class="inline-flex flex-col items-center leading-none" :aria-label="site.name" role="img">
    <span class="flex items-baseline gap-1.5" :class="size === 'sm' ? 'text-lg' : 'text-xl sm:text-2xl'">
      <!-- "Golden" em italico com o degrade dourado do logo original -->
      <span class="text-gradient-gold font-display font-extrabold italic">Golden</span>
      <span class="font-display font-medium tracking-tight text-white">Car Service</span>
    </span>

    <!-- Filete + CAPM, a assinatura embaixo do wordmark -->
    <span
      class="mt-1 flex w-full items-center gap-1.5"
      :class="size === 'sm' ? 'text-[7px]' : 'text-[8px]'"
    >
      <span class="h-px flex-1 bg-gold-600/60"></span>
      <span class="font-display font-bold tracking-[0.35em] text-gold-500">CAPM</span>
      <span class="h-px flex-1 bg-gold-600/60"></span>
    </span>
  </span>
</template>
