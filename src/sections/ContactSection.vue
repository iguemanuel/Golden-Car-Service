<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, ExternalLink, Instagram, Send } from 'lucide-vue-next'

import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { site } from '@/data/site'
import { contactServiceOptions } from '@/data/services'
import { brands } from '@/data/brands'
import { instagramMedia } from '@/data/instagramMedia'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { STAGGER_STEP } from '@/utils/motion'

const { open } = useWhatsApp()

const featuredVideo = computed(() => instagramMedia.find((item) => item.kind === 'video'))
const galleryPhotos = computed(() => instagramMedia.filter((item) => item.kind === 'photo'))

const fieldClass =
  'w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500 focus:outline-none'

const brandOptions = [...brands.map((item) => item.name), 'Outra']

/** Do ano atual ate 25 anos atras — cobre o parque de carros com cambio automatico. */
const currentYear = new Date().getFullYear()
const yearOptions = [
  ...Array.from({ length: 25 }, (_, i) => String(currentYear - i)),
  `Anterior a ${currentYear - 24}`,
]

const name = ref('')
const service = ref('')
const brand = ref('')
const model = ref('')
const year = ref('')
const message = ref('')

/**
 * Monta a mensagem a partir do formulario e abre o WhatsApp — sem
 * backend, sem servico externo. Validacao nativa do HTML (required nos
 * campos) cobre o essencial; o resto e so montar texto.
 */
function submit() {
  const vehicle = [brand.value, model.value.trim(), `(${year.value})`].filter(Boolean).join(' ')
  const parts = [
    `Olá! Me chamo ${name.value} e vim pelo site da ${site.name}.`,
    `Serviço: ${service.value}.`,
    `Veículo: ${vehicle}.`,
  ]
  if (message.value.trim()) parts.push(message.value.trim())

  open(parts.join('\n'), 'contact-form')
}

/**
 * Embed sem API key, a partir do ENDERECO em texto (site.address.mapsQuery),
 * nao de coordenadas fixas — o Google geocodifica ao vivo dentro do iframe.
 * Antes usava uma coordenada hardcoded para "Ponta Grossa", cidade errada
 * (o endereco real e em Guarapuava — ver o comentario em site.ts). Query
 * de texto elimina esse tipo de erro: se o endereco mudar, e so trocar
 * site.address, sem precisar regeocodificar nada a mao.
 */
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.name}, ${site.address.mapsQuery}`,
)}&z=16&output=embed`
</script>

<template>
  <section class="bg-ink-950 px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!--
        Video + fotos do Instagram — mesmo padrao do Guará Motors Racing
        (Web-Motors, github.com/iguemanuel): video autohospedado, nao embed
        do Instagram. Some sozinha enquanto instagramMedia estiver vazio
        (ver o comentario em src/data/instagramMedia.ts). Vem primeiro, como
        prova social, antes do convite "Fale com a gente" — que fica colado
        ao formulario que ele introduz, nao ao topo da secao.
      -->
      <RevealOnScroll v-if="instagramMedia.length > 0" v-slot="{ revealed }">
        <div>
          <div class="mb-6 flex flex-col items-center gap-4 text-center">
            <div>
              <p class="font-display text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
                Oficina
              </p>
              <h3 class="mt-2 text-2xl">Bastidores da oficina</h3>
            </div>
            <BaseButton :href="site.contact.instagramUrl" external variant="outline">
              <Instagram :size="16" aria-hidden="true" />
              Seguir &#64;{{ site.contact.instagram }}
            </BaseButton>
          </div>

          <!--
            Video em destaque + grade compacta de fotos. No desktop o
            reel ocupa a coluna esquerda, na mesma altura das 6 fotos
            (3x2) a direita. No mobile o video vem primeiro, com altura
            limitada, para o bloco nao virar um mural de 3 linhas.
          -->
          <div class="grid items-stretch gap-3 md:grid-cols-2">
            <div
              v-if="featuredVideo"
              class="relative h-72 overflow-hidden rounded-xl border border-ink-700 bg-ink-900 md:h-auto md:min-h-0"
            >
              <!--
                O video (3,5MB, ~77% do peso total do site) so ganha `src`
                quando `revealed` vira true — o MESMO sinal de
                IntersectionObserver que RevealOnScroll ja usa pra animar
                este bloco, reaproveitado via slot escopado em vez de um
                segundo observer. `preload="none"` antes disso garante que
                nem os metadados baixam cedo demais. Quem nunca rola ate o
                Contato nunca baixa o video.
              -->
              <video
                :src="revealed ? featuredVideo.src : undefined"
                preload="none"
                :width="featuredVideo.width"
                :height="featuredVideo.height"
                autoplay
                muted
                loop
                playsinline
                controls
                class="absolute inset-0 h-full w-full object-cover"
              ></video>
            </div>

            <div class="grid grid-cols-3 gap-2 sm:gap-3">
              <div
                v-for="item in galleryPhotos"
                :key="item.src"
                class="aspect-[3/4] overflow-hidden rounded-xl border border-ink-700 bg-ink-900"
              >
                <img
                  :src="item.src"
                  :alt="item.alt"
                  loading="lazy"
                  :width="item.width"
                  :height="item.height"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div id="contato" class="scroll-mt-20">
      <!--
        Heading "Contato" colado ao formulario que ele introduz — nao ao
        topo da secao, onde ficaria acima da Oficina sem relacao com ela.
      -->
      <RevealOnScroll :delay="STAGGER_STEP">
        <SectionHeading
          class="mt-16"
          eyebrow="Fale com a gente"
          title="Contato"
          subtitle="Conte o problema do seu veículo — respondemos direto pelo WhatsApp."
        />
      </RevealOnScroll>

      <!-- Mesma largura do mapa (max-w-7xl do container), sem coluna mais estreita. -->
      <div class="mt-14">
        <RevealOnScroll :delay="STAGGER_STEP * 2">
          <form
            class="flex flex-col gap-8 rounded-2xl border border-ink-700 bg-ink-900 p-6 sm:p-10 lg:p-12"
            @submit.prevent="submit"
          >
            <fieldset class="flex flex-col gap-5">
              <legend class="sr-only">Seus dados</legend>

              <div class="flex flex-col gap-1.5">
                <label for="contact-name" class="text-sm font-medium text-neutral-300">
                  Nome
                </label>
                <input
                  id="contact-name"
                  v-model="name"
                  type="text"
                  required
                  autocomplete="name"
                  placeholder="Seu nome"
                  :class="fieldClass"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="contact-service" class="text-sm font-medium text-neutral-300">
                  Tipo de serviço
                </label>
                <div class="relative">
                  <select
                    id="contact-service"
                    v-model="service"
                    required
                    :class="[fieldClass, 'appearance-none pr-11']"
                  >
                    <option value="" disabled>Selecione o serviço</option>
                    <option v-for="option in contactServiceOptions" :key="option" :value="option">
                      {{ option }}
                    </option>
                  </select>
                  <ChevronDown
                    :size="18"
                    class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset class="flex flex-col gap-5">
              <legend class="mb-1 text-sm font-medium text-neutral-300">Veículo</legend>

              <div class="grid gap-4 sm:grid-cols-3">
                <div class="flex flex-col gap-1.5">
                  <label for="contact-brand" class="text-sm text-neutral-400">Marca</label>
                  <div class="relative">
                    <select
                      id="contact-brand"
                      v-model="brand"
                      required
                      :class="[fieldClass, 'appearance-none pr-11']"
                    >
                      <option value="" disabled>Selecione</option>
                      <option v-for="option in brandOptions" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                    <ChevronDown
                      :size="18"
                      class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="contact-model" class="text-sm text-neutral-400">Modelo</label>
                  <input
                    id="contact-model"
                    v-model="model"
                    type="text"
                    required
                    placeholder="Ex.: Civic"
                    :class="fieldClass"
                  />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="contact-year" class="text-sm text-neutral-400">Ano</label>
                  <div class="relative">
                    <select
                      id="contact-year"
                      v-model="year"
                      required
                      :class="[fieldClass, 'appearance-none pr-11']"
                    >
                      <option value="" disabled>Selecione</option>
                      <option v-for="option in yearOptions" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                    <ChevronDown
                      :size="18"
                      class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <div class="flex flex-col gap-1.5">
              <label for="contact-message" class="text-sm font-medium text-neutral-300">
                Conte o que está acontecendo
              </label>
              <textarea
                id="contact-message"
                v-model="message"
                rows="5"
                placeholder="Ex.: câmbio está trocando de marcha com solavanco"
                :class="[fieldClass, 'resize-none']"
              ></textarea>
            </div>

            <BaseButton type="submit" size="lg" class="group justify-center">
              Enviar no WhatsApp
              <Send
                :size="18"
                class="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </BaseButton>
          </form>
        </RevealOnScroll>
      </div>
      </div>

      <!-- Mapa abaixo do formulario, mesma largura do card de contato. -->
      <RevealOnScroll :delay="STAGGER_STEP * 3">
        <div class="mt-16">
          <div class="mb-6 flex flex-col items-center gap-4 text-center">
            <div>
              <p class="font-display text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
                Localização
              </p>
              <h3 class="mt-2 text-2xl">Onde estamos</h3>
            </div>
            <BaseButton :href="site.googleMapsUrl" external variant="outline">
              <ExternalLink :size="16" aria-hidden="true" />
              Abrir no Google Maps
            </BaseButton>
          </div>

          <!-- Sem API key, embed a partir das coordenadas da ficha real -->
          <div class="h-[420px] w-full overflow-hidden rounded-xl border border-ink-700">
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
  </section>
</template>
