<script setup lang="ts">
import seloCab from '@/assets/selo-cab.webp'

/**
 * Selo da CAB — Cambio Automatico do Brasil, a rede de oficinas de
 * transmissao automatica.
 *
 * DUAS DECISOES QUE NAO SAO ESTETICAS:
 *
 * 1. A placa clara atras do logo e obrigatoria, nao enfeite. O selo e
 *    verde/amarelo/azul-marinho; sobre ink-950/ink-900 a linha "DO BRASIL"
 *    (#002060) e o contorno do mapa praticamente somem — conferido
 *    compondo o arquivo sobre #121212 antes de escrever isto. E a mesma
 *    mitigacao que a Peugeot ja usa no carrossel de marcas (`brand.chip`
 *    em src/data/brands.ts): logo colorido de baixo contraste sobre fundo
 *    escuro mantem a cor original dentro de um chip claro.
 *
 * 2. A afirmacao vai em TEXTO HTML, nao no raster. O arquivo e um lockup
 *    largo (360x166) e, na altura em que aparece aqui, as tres linhas de
 *    texto dentro dele ficam com ~7px — ilegiveis. O logo entra como
 *    marca reconhecivel; quem carrega a mensagem e o texto ao lado.
 *
 * PENDENTE: "Oficina credenciada" e uma afirmacao de credenciamento
 * formal junto a rede. Confirmar com a Erica antes de publicar — se for
 * parceria informal, trocar por "Membro da rede" (uma string, aqui).
 */
const props = withDefaults(defineProps<{ variant?: 'inline' | 'stamp' | 'hero' }>(), {
  variant: 'inline',
})

/**
 * `hero` é o selo grande abaixo do rótulo do início. `stamp` é o carimbo
 * pequeno da seção de câmbio. `inline` é o tamanho da coluna no celular.
 */
const styles = {
  stamp: {
    root: 'gap-2 bg-ink-900/90 p-1.5 pr-3 shadow-lg shadow-black/50',
    chip: 'px-1.5 py-1',
    mark: 'h-6',
    title: 'text-[10px]',
    subtitle: 'text-[10px]',
  },
  hero: {
    root: 'gap-4 bg-ink-900/80 py-3 pr-5 pl-3 shadow-lg shadow-black/40',
    chip: 'px-3 py-2',
    mark: 'h-12',
    title: 'text-sm',
    subtitle: 'text-sm',
  },
  inline: {
    root: 'gap-3 bg-ink-900/70 py-2 pr-4 pl-2',
    chip: 'px-2 py-1.5',
    mark: 'h-7',
    title: 'text-[11px]',
    subtitle: 'text-xs',
  },
} as const
</script>

<template>
  <div
    class="inline-flex items-center rounded-xl border border-hairline-gold backdrop-blur-sm"
    :class="styles[props.variant].root"
  >
    <span
      class="flex shrink-0 items-center rounded-lg bg-neutral-100"
      :class="styles[props.variant].chip"
    >
      <img
        :src="seloCab"
        alt="Câmbio Automático do Brasil"
        class="w-auto"
        :class="styles[props.variant].mark"
        width="360"
        height="166"
        loading="lazy"
      />
    </span>

    <span class="text-left">
      <span
        class="block font-display font-bold tracking-[0.14em] text-gold-400 uppercase"
        :class="styles[props.variant].title"
      >
        Oficina credenciada
      </span>
      <span class="block text-neutral-400" :class="styles[props.variant].subtitle">
        Câmbio Automático do Brasil
      </span>
    </span>
  </div>
</template>
