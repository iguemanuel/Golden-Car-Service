<script setup lang="ts">
/**
 * FASE 0 — pagina de validacao da fundacao visual.
 *
 * Isto NAO e o site: e um style tile para conferir paleta, tipografia e o
 * tratamento dos botoes antes de construir as secoes. Na fase 1 este arquivo
 * vira a composicao real (navbar + secoes + footer).
 */
import { site } from '@/data/site'
import { useWhatsApp } from '@/composables/useWhatsApp'

const { openDefault } = useWhatsApp()

const golds = [
  { token: 'gold-300', hex: '#f2dfa0', use: 'realce sutil' },
  { token: 'gold-400', hex: '#e8c46a', use: 'hover' },
  { token: 'gold-500', hex: '#d4af37', use: 'dourado principal' },
  { token: 'gold-600', hex: '#b8952b', use: 'bordas / pressionado' },
  { token: 'gold-700', hex: '#8f7320', use: 'degradê' },
]

const inks = [
  { token: 'ink-950', hex: '#0a0a0a', use: 'fundo da página' },
  { token: 'ink-900', hex: '#121212', use: 'seções alternadas' },
  { token: 'ink-850', hex: '#171717', use: 'superfícies' },
  { token: 'ink-800', hex: '#1c1c1c', use: 'cards' },
  { token: 'ink-700', hex: '#2a2a2a', use: 'bordas' },
  { token: 'ink-600', hex: '#3a3a3a', use: 'bordas em destaque' },
]
</script>

<template>
  <div class="min-h-screen bg-ink-950 px-4 py-16 sm:px-8">
    <div class="mx-auto flex max-w-5xl flex-col gap-16">
      <!-- Cabecalho: tipografia de display no tamanho de hero -->
      <header class="flex flex-col gap-4">
        <p class="font-display text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
          Fase 0 · Fundação visual
        </p>
        <h1 class="text-4xl leading-[1.05] sm:text-6xl">
          {{ site.name }}
          <span class="block text-gradient-gold">{{ site.tagline }}</span>
        </h1>
        <p class="max-w-2xl text-base text-neutral-400 sm:text-lg">
          {{ site.description }}
        </p>
      </header>

      <!-- Paleta -->
      <section class="flex flex-col gap-6">
        <h2 class="text-2xl">Paleta</h2>

        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-semibold tracking-wide text-neutral-500 uppercase">Dourado</h3>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div v-for="c in golds" :key="c.token" class="flex flex-col gap-2">
              <div class="h-20 rounded-lg" :style="{ backgroundColor: c.hex }"></div>
              <div>
                <p class="font-mono text-xs text-white">{{ c.token }}</p>
                <p class="font-mono text-xs text-neutral-500">{{ c.hex }}</p>
                <p class="mt-0.5 text-xs text-neutral-500">{{ c.use }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-semibold tracking-wide text-neutral-500 uppercase">Preto</h3>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-6">
            <div v-for="c in inks" :key="c.token" class="flex flex-col gap-2">
              <div
                class="h-20 rounded-lg border border-ink-700"
                :style="{ backgroundColor: c.hex }"
              ></div>
              <div>
                <p class="font-mono text-xs text-white">{{ c.token }}</p>
                <p class="font-mono text-xs text-neutral-500">{{ c.hex }}</p>
                <p class="mt-0.5 text-xs text-neutral-500">{{ c.use }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tipografia -->
      <section class="flex flex-col gap-6">
        <h2 class="text-2xl">Tipografia</h2>
        <div class="flex flex-col gap-5 rounded-xl border border-ink-700 bg-ink-900 p-6 sm:p-8">
          <div>
            <p class="mb-1 font-mono text-xs text-neutral-500">Archivo · display · h1</p>
            <p class="font-display text-4xl font-extrabold sm:text-5xl">Câmbio automático</p>
          </div>
          <div>
            <p class="mb-1 font-mono text-xs text-neutral-500">Archivo · display · h2</p>
            <p class="font-display text-2xl font-extrabold sm:text-3xl">Nossos serviços</p>
          </div>
          <div>
            <p class="mb-1 font-mono text-xs text-neutral-500">Inter · corpo</p>
            <p class="max-w-2xl text-neutral-300">
              Troca de óleo do câmbio automático com equipamento de fluxo, diagnóstico
              eletrônico e reparo completo. Atendimento para todas as marcas, com
              garantia no serviço e peças.
            </p>
          </div>
          <div>
            <p class="mb-1 font-mono text-xs text-neutral-500">Inter · apoio</p>
            <p class="text-sm text-neutral-500">
              Texto de apoio, legendas e informações secundárias.
            </p>
          </div>
        </div>
      </section>

      <!-- Botoes -->
      <section class="flex flex-col gap-6">
        <h2 class="text-2xl">Botões</h2>
        <div class="flex flex-wrap items-center gap-4">
          <button
            type="button"
            class="cursor-pointer rounded-lg bg-gold-500 px-6 py-3 font-display text-sm font-bold tracking-wide text-ink-950 uppercase transition-colors hover:bg-gold-400"
            @click="openDefault('style-tile')"
          >
            Falar no WhatsApp
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-lg border border-gold-500 px-6 py-3 font-display text-sm font-bold tracking-wide text-gold-500 uppercase transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            Ver serviços
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-lg border border-ink-600 px-6 py-3 font-display text-sm font-bold tracking-wide text-neutral-300 uppercase transition-colors hover:border-neutral-400 hover:text-white"
          >
            Secundário
          </button>
        </div>
        <p class="text-sm text-neutral-500">
          O botão dourado abre o WhatsApp
          <span class="font-mono text-neutral-400">{{ site.contact.whatsapp }}</span> — clique
          para conferir.
        </p>
      </section>

      <!-- Card, para ver o dourado como acento e nao como fundo -->
      <section class="flex flex-col gap-6">
        <h2 class="text-2xl">Card</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <article
            class="rounded-xl border border-hairline-gold bg-ink-800 p-6 transition-colors hover:border-gold-500"
          >
            <div class="mb-4 h-10 w-10 rounded-lg bg-gold-500/10 ring-1 ring-gold-500/30"></div>
            <h3 class="mb-2 text-lg">Troca de óleo do câmbio</h3>
            <p class="text-sm text-neutral-400">
              Procedimento com equipamento de fluxo, que troca o fluido por completo em vez
              de apenas drenar o cárter.
            </p>
          </article>
          <article
            class="rounded-xl border border-hairline-gold bg-ink-800 p-6 transition-colors hover:border-gold-500"
          >
            <div class="mb-4 h-10 w-10 rounded-lg bg-gold-500/10 ring-1 ring-gold-500/30"></div>
            <h3 class="mb-2 text-lg">Reparo de câmbio</h3>
            <p class="text-sm text-neutral-400">
              Diagnóstico eletrônico, desmontagem e reparo completo, com garantia no serviço
              e nas peças aplicadas.
            </p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
