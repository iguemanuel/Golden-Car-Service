<script setup lang="ts">
import { site } from '@/data/site'

import logo from '@/assets/logo.webp'

/**
 * Wordmark da Golden Car Service — imagem real (o cliente enviou em alta
 * resolucao, com o brilho dourado da placa fisica da oficina).
 *
 * O arquivo veio com uma vinheta de brilho bem larga e difusa em volta das
 * letras (alfa medio, ~60%) — colada direto numa navbar pequena, essa faixa
 * lia como uma "placa" retangular clara em vez de se misturar ao fundo
 * escuro do site. Corrigido levantando o contraste so do CANAL ALFA
 * (`magick -channel A -level 60%,85%`): o brilho difuso (alfa ~0.6) cai pra
 * quase transparente, as letras (alfa ~0.97) ficam solidas — confirmado
 * compondo sobre #0a0a0a antes de finalizar, nao so olhando a previa (que
 * renderiza transparencia sobre fundo escuro, mascarando o problema).
 *
 * Substitui a reconstrucao em CSS que existia antes (texto + gradiente),
 * usada so porque o arquivo original estava em baixa resolucao.
 */
withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' })
</script>

<template>
  <img
    :src="logo"
    :alt="site.name"
    :class="size === 'sm' ? 'h-6' : 'h-8 sm:h-9'"
    class="w-auto object-contain"
    width="700"
    height="173"
  />
</template>
