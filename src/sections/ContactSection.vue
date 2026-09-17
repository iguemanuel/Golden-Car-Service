<script setup lang="ts">
import { ref } from 'vue'
import { Clock, Instagram, Mail, MapPin, Phone, Send } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { fullAddress, site } from '@/data/site'
import { instagramMedia } from '@/data/instagramMedia'
import { useWhatsApp } from '@/composables/useWhatsApp'

const { open, buildUrl } = useWhatsApp()

const name = ref('')
const vehicle = ref('')
const message = ref('')

/**
 * Monta a mensagem a partir do formulario e abre o WhatsApp — sem
 * backend, sem servico externo. Validacao nativa do HTML (required nos
 * campos) cobre o essencial; o resto e so montar texto.
 */
function submit() {
  const parts = [
    `Olá! Me chamo ${name.value} e vim pelo site da ${site.name}.`,
    `Veículo: ${vehicle.value}.`,
  ]
  if (message.value.trim()) parts.push(message.value.trim())

  open(parts.join(' '), 'contact-form')
}

/** Embed sem API key, a partir das mesmas coordenadas de site.googleMapsUrl. */
const mapEmbedSrc =
  'https://www.google.com/maps?q=Golden+Car+Service,-25.3593592,-51.4648012&z=15&output=embed'
</script>

<template>
  <section id="contato" class="scroll-mt-20 bg-ink-950 px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Fale com a gente"
          title="Contato"
          subtitle="Conte o problema do seu veículo — respondemos direto pelo WhatsApp."
        />
      </RevealOnScroll>

      <div class="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- Formulario -->
        <RevealOnScroll>
          <form class="flex flex-col gap-5" @submit.prevent="submit">
            <div class="flex flex-col gap-1.5">
              <label for="contact-name" class="text-sm font-medium text-neutral-300">Nome</label>
              <input
                id="contact-name"
                v-model="name"
                type="text"
                required
                placeholder="Seu nome"
                class="rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="contact-vehicle" class="text-sm font-medium text-neutral-300">
                Veículo e ano
              </label>
              <input
                id="contact-vehicle"
                v-model="vehicle"
                type="text"
                required
                placeholder="Ex.: Corolla 2019, câmbio automático"
                class="rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="contact-message" class="text-sm font-medium text-neutral-300">
                Conte o que está acontecendo
              </label>
              <textarea
                id="contact-message"
                v-model="message"
                rows="4"
                placeholder="Ex.: câmbio está trocando de marcha com solavanco"
                class="resize-none rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500 focus:outline-none"
              ></textarea>
            </div>

            <BaseButton size="lg" class="group justify-center">
              Enviar no WhatsApp
              <Send
                :size="18"
                class="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </BaseButton>
          </form>
        </RevealOnScroll>

        <!-- Dados de contato + mapa -->
        <RevealOnScroll :delay="120">
          <div class="flex flex-col gap-8">
            <ul class="flex flex-col gap-4 text-neutral-300">
              <li>
                <a
                  :href="`tel:+55${site.contact.phone}`"
                  class="flex items-center gap-3 transition-colors hover:text-gold-500"
                >
                  <Phone :size="18" class="shrink-0 text-gold-500" aria-hidden="true" />
                  {{ site.contact.phoneDisplay }}
                </a>
              </li>
              <li>
                <a
                  :href="`mailto:${site.contact.email}`"
                  class="flex items-center gap-3 transition-colors hover:text-gold-500"
                >
                  <Mail :size="18" class="shrink-0 text-gold-500" aria-hidden="true" />
                  {{ site.contact.email }}
                </a>
              </li>
              <li>
                <a
                  :href="site.contact.instagramUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 transition-colors hover:text-gold-500"
                >
                  <Instagram :size="18" class="shrink-0 text-gold-500" aria-hidden="true" />
                  &#64;{{ site.contact.instagram }}
                </a>
              </li>
              <li class="flex items-start gap-3">
                <MapPin :size="18" class="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{{ fullAddress }}</span>
              </li>
              <li class="flex items-start gap-3">
                <Clock :size="18" class="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
                <span>
                  {{ site.hours.weekdays }}<br />
                  {{ site.hours.saturday }}
                </span>
              </li>
            </ul>

            <!-- Mapa: sem API key, embed a partir das coordenadas da ficha real -->
            <div
              class="aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink-700 sm:aspect-video"
            >
              <iframe
                :src="mapEmbedSrc"
                title="Localização da Golden Car Service no Google Maps"
                class="h-full w-full grayscale-[40%] invert-[92%] contrast-[90%]"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <!--
        Video + fotos do Instagram — mesmo padrao do Guará Motors Racing
        (Web-Motors, github.com/iguemanuel): video autohospedado, nao embed
        do Instagram. Some sozinha enquanto instagramMedia estiver vazio
        (ver o comentario em src/data/instagramMedia.ts).
      -->
      <RevealOnScroll v-if="instagramMedia.length > 0" :delay="200">
        <div class="mt-20 border-t border-ink-700/60 pt-16">
          <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="font-display text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
                Instagram
              </p>
              <h3 class="mt-2 text-2xl">Bastidores da oficina</h3>
            </div>
            <BaseButton :href="site.contact.instagramUrl" external variant="outline">
              <Instagram :size="16" aria-hidden="true" />
              Seguir &#64;{{ site.contact.instagram }}
            </BaseButton>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-rows-2 sm:[grid-auto-flow:column]">
            <div
              v-for="item in instagramMedia"
              :key="item.src"
              class="overflow-hidden rounded-xl border border-ink-700 bg-ink-900"
              :class="
                item.kind === 'video'
                  ? 'col-span-2 aspect-video sm:col-span-1 sm:row-span-2 sm:aspect-auto'
                  : 'aspect-square'
              "
            >
              <video
                v-if="item.kind === 'video'"
                :src="item.src"
                autoplay
                muted
                loop
                playsinline
                controls
                class="h-full w-full object-cover"
              ></video>
              <img
                v-else
                :src="item.src"
                :alt="item.alt"
                loading="lazy"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
