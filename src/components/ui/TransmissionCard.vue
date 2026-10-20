<script setup lang="ts">
/**
 * Card de um item da especialidade em cambio automatico: foto à esquerda,
 * texto à direita. E o irmao do ServiceCard — mesmo card, mesma borda,
 * mesmo hover — com duas diferencas: nao tem icone (quem identifica o item
 * e a propria foto) e a foto fica do lado ESQUERDO, que e a leitura que a
 * secao ja tinha antes.
 *
 * A foto sangra a altura inteira do card em vez do quadrado de 96px de
 * antes: recorte de foto de oficina em 96x96 virava mancha escura e nao
 * comunicava o servico. O recorte (object-position) vem do data file,
 * porque o assunto de cada foto nao fica no mesmo ponto do quadro.
 */
defineProps<{
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
}>()
</script>

<template>
  <article
    class="group flex h-full overflow-hidden rounded-xl border border-hairline-gold bg-ink-800 transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg hover:shadow-black/30"
  >
    <div class="relative w-28 shrink-0 sm:w-32">
      <img
        :src="image"
        :alt="imageAlt"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        :style="{ objectPosition: imagePosition ?? 'center' }"
        loading="lazy"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col gap-2 p-5">
      <h3 class="text-base font-semibold text-white">{{ title }}</h3>
      <p class="text-sm text-neutral-400">{{ description }}</p>
    </div>
  </article>
</template>
