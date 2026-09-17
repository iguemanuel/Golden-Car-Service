<script setup lang="ts">
import { Instagram, Mail, MapPin, Phone, Clock } from 'lucide-vue-next'

import TheLogo from '@/components/ui/TheLogo.vue'
import { navLinks } from '@/data/navigation'
import { fullAddress, site } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-ink-700 bg-ink-900">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-3">
        <!-- Marca -->
        <div class="flex flex-col items-start gap-4">
          <TheLogo />
          <p class="max-w-xs text-sm text-neutral-400">
            {{ site.description }}
          </p>
        </div>

        <!-- Navegacao: mesma fonte da navbar -->
        <nav aria-label="Navegação do rodapé">
          <h2 class="mb-4 font-display text-sm font-bold tracking-wide text-white uppercase">
            Navegação
          </h2>
          <ul class="flex flex-col gap-2.5">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="text-sm text-neutral-400 transition-colors hover:text-gold-500"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Contato -->
        <div>
          <h2 class="mb-4 font-display text-sm font-bold tracking-wide text-white uppercase">
            Contato
          </h2>
          <ul class="flex flex-col gap-3 text-sm text-neutral-400">
            <li>
              <a
                :href="`tel:+55${site.contact.phone}`"
                class="flex items-center gap-2.5 transition-colors hover:text-gold-500"
              >
                <Phone :size="16" class="shrink-0 text-gold-500" aria-hidden="true" />
                {{ site.contact.phoneDisplay }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${site.contact.email}`"
                class="flex items-center gap-2.5 transition-colors hover:text-gold-500"
              >
                <Mail :size="16" class="shrink-0 text-gold-500" aria-hidden="true" />
                {{ site.contact.email }}
              </a>
            </li>
            <li>
              <a
                :href="site.contact.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 transition-colors hover:text-gold-500"
              >
                <Instagram :size="16" class="shrink-0 text-gold-500" aria-hidden="true" />
                &#64;{{ site.contact.instagram }}
              </a>
            </li>
            <li class="flex items-start gap-2.5">
              <MapPin :size="16" class="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
              <span>{{ fullAddress }}</span>
            </li>
            <li class="flex items-start gap-2.5">
              <Clock :size="16" class="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
              <span>
                {{ site.hours.weekdays }}<br />
                {{ site.hours.saturday }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink-700 pt-6 text-xs text-neutral-500 sm:flex-row"
      >
        <p>&copy; {{ year }} {{ site.name }}. Todos os direitos reservados.</p>
        <p>CNPJ a informar</p>
      </div>
    </div>
  </footer>
</template>
