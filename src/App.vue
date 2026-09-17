<script setup lang="ts">
/**
 * FASE 1 — casca da pagina.
 *
 * Navbar, footer e botao flutuante estao prontos. As <section> abaixo sao
 * placeholders que existem para (a) validar a navegacao por ancora com a
 * navbar fixa e (b) dar altura suficiente para testar o comportamento de
 * scroll. Cada uma sera substituida pelo componente real nas fases 2 a 5.
 */
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { site } from '@/data/site'
import { useWhatsApp } from '@/composables/useWhatsApp'

const { buildUrl } = useWhatsApp()
const whatsappUrl = buildUrl(`Olá! Vim pelo site da ${site.name} e gostaria de fazer um orçamento.`)

const placeholders = [
  { id: 'cambio', eyebrow: 'Fase 3', title: 'Câmbio automático', tone: 'bg-ink-900' },
  { id: 'servicos', eyebrow: 'Fase 3', title: 'Serviços', tone: 'bg-ink-950' },
  { id: 'avaliacoes', eyebrow: 'Fase 4', title: 'Avaliações', tone: 'bg-ink-900' },
  { id: 'contato', eyebrow: 'Fase 5', title: 'Contato', tone: 'bg-ink-950' },
]
</script>

<template>
  <TheNavbar />

  <main>
    <!-- Placeholder do hero (fase 2). pt-20 compensa a navbar fixa. -->
    <section
      id="inicio"
      class="flex min-h-screen items-center bg-ink-950 px-4 pt-20 sm:px-6 lg:px-8"
    >
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <p class="font-display text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
          {{ site.tagline }}
        </p>
        <h1 class="text-4xl leading-[1.05] sm:text-6xl">
          Seu câmbio automático nas mãos de
          <span class="text-gradient-gold">quem é especialista</span>
        </h1>
        <p class="max-w-xl text-base text-neutral-400 sm:text-lg">
          {{ site.description }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <BaseButton :href="whatsappUrl" external size="lg">Fazer orçamento</BaseButton>
          <BaseButton href="#servicos" variant="outline" size="lg">Ver serviços</BaseButton>
        </div>
        <p class="mt-4 text-xs text-neutral-600">
          Hero provisório — a versão final vem na fase 2.
        </p>
      </div>
    </section>

    <section
      v-for="s in placeholders"
      :id="s.id"
      :key="s.id"
      class="flex min-h-[70vh] items-center px-4 py-20 sm:px-6 lg:px-8"
      :class="s.tone"
    >
      <div class="mx-auto w-full max-w-7xl">
        <SectionHeading
          :eyebrow="s.eyebrow"
          :title="s.title"
          subtitle="Seção reservada — o conteúdo entra na fase indicada acima."
        />
      </div>
    </section>
  </main>

  <TheFooter />
  <WhatsAppFloat />
</template>
