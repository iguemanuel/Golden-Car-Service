<script setup lang="ts">
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import { services } from '@/data/services'
import { STAGGER_STEP } from '@/utils/motion'
</script>

<template>
  <section id="servicos" class="scroll-mt-20 bg-ink-950 px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Serviços"
          subtitle="Além da especialidade em câmbio automático, cuidamos do carro inteiro."
        />
      </RevealOnScroll>

      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <RevealOnScroll
          v-for="(service, i) in services"
          :key="service.title"
          :delay="i * STAGGER_STEP"
        >
          <ServiceCard
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
          />
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>
