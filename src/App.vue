<script setup lang="ts">
/**
 * FASE 2 — hero pronto.
 *
 * As <section> restantes ainda sao placeholders rotulados com a fase em que
 * serao preenchidos.
 */
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import HeroSection from '@/sections/HeroSection.vue'

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
    <HeroSection />

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
