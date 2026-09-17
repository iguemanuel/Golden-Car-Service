<script setup lang="ts">
/**
 * FASE 5 — contato no ar. Falta o FAQ (entra depois, entre avaliacoes e
 * contato, sem depender de nada que ja existe).
 */
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat.vue'
import HeroSection from '@/sections/HeroSection.vue'
import TransmissionSection from '@/sections/TransmissionSection.vue'
import ServicesSection from '@/sections/ServicesSection.vue'
import BrandsSection from '@/sections/BrandsSection.vue'
import ReviewsSection from '@/sections/ReviewsSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
</script>

<template>
  <TheNavbar />

  <main>
    <HeroSection />
    <TransmissionSection />
    <ServicesSection />
    <BrandsSection />
    <ReviewsSection />
    <ContactSection />
  </main>

  <TheFooter />
  <WhatsAppFloat />
</template>
