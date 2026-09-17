<script setup lang="ts">
import { computed } from 'vue'

/**
 * Botao unico da pagina, em tres variantes.
 *
 * Renderiza <a> quando recebe `href` e <button> caso contrario, para que os CTAs
 * que apontam para ancoras ou para o WhatsApp continuem sendo links de verdade —
 * abrem em nova aba com o botao do meio, aparecem no menu de contexto e sao
 * anunciados como link pelo leitor de tela.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'md' | 'lg'
    href?: string
    external?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'primary', size: 'md', external: false, type: 'button' },
)

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-display font-bold ' +
  'uppercase tracking-wide transition-colors duration-200 cursor-pointer ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary: 'bg-gold-500 text-ink-950 hover:bg-gold-400',
  outline: 'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-ink-950',
  ghost: 'border border-ink-600 text-neutral-300 hover:border-neutral-400 hover:text-white',
} as const

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm sm:text-base',
} as const

const classes = computed(() => [base, variants[props.variant], sizes[props.size]])

const linkAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <a v-if="href" :href="href" :class="classes" v-bind="linkAttrs">
    <slot />
  </a>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
