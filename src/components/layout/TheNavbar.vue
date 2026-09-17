<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from 'reka-ui'
import { Menu, X, MessageCircle } from 'lucide-vue-next'

import TheLogo from '@/components/ui/TheLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { navLinks } from '@/data/navigation'
import { site } from '@/data/site'
import { useWhatsApp } from '@/composables/useWhatsApp'

const { buildUrl } = useWhatsApp()
const whatsappUrl = buildUrl(
  `Olá! Vim pelo site da ${site.name} e gostaria de fazer um orçamento.`,
)

/**
 * A navbar nasce transparente sobre o hero e ganha fundo solido depois que a
 * pagina rola, para nao competir com a primeira dobra.
 */
const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled
        ? 'border-b border-ink-700 bg-ink-950/90 backdrop-blur-md'
        : 'border-b border-transparent'
    "
  >
    <nav
      class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      aria-label="Navegação principal"
    >
      <a href="#inicio" class="shrink-0" aria-label="Ir para o início">
        <TheLogo />
      </a>

      <!-- Links: escondidos no mobile, onde o menu vira drawer -->
      <ul class="hidden items-center gap-7 lg:flex">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="text-sm font-medium text-neutral-300 transition-colors hover:text-gold-500"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <!--
          O wrapper e que esconde o CTA no mobile, nao uma classe `hidden` no
          BaseButton: o proprio botao aplica `inline-flex`, e as duas sao
          utilities de `display` na mesma layer — o `inline-flex` venceria e o
          botao continuaria visivel, empurrando o hamburguer fora da tela.
        -->
        <span class="hidden sm:block">
          <BaseButton :href="whatsappUrl" external>
            <MessageCircle :size="16" aria-hidden="true" />
            Orçamento
          </BaseButton>
        </span>

        <!-- Menu mobile -->
        <DialogRoot v-model:open="mobileOpen">
          <DialogTrigger
            class="cursor-pointer rounded-lg border border-ink-600 p-2.5 text-neutral-300 transition-colors hover:border-gold-500 hover:text-gold-500 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu :size="20" aria-hidden="true" />
          </DialogTrigger>

          <DialogPortal>
            <DialogOverlay class="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-sm" />
            <DialogContent
              class="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-8 border-l border-ink-700 bg-ink-900 p-6 shadow-2xl focus:outline-none"
            >
              <VisuallyHidden>
                <DialogTitle>Menu de navegação</DialogTitle>
              </VisuallyHidden>

              <div class="flex items-center justify-between">
                <TheLogo size="sm" />
                <DialogClose
                  class="cursor-pointer rounded-lg border border-ink-600 p-2 text-neutral-400 transition-colors hover:border-gold-500 hover:text-gold-500"
                  aria-label="Fechar menu"
                >
                  <X :size="18" aria-hidden="true" />
                </DialogClose>
              </div>

              <ul class="flex flex-col gap-1">
                <li v-for="link in navLinks" :key="link.href">
                  <!-- Fecha o drawer antes de rolar, senao o overlay cobre o destino -->
                  <a
                    :href="link.href"
                    class="block rounded-lg px-3 py-3 font-display font-semibold text-neutral-200 transition-colors hover:bg-ink-800 hover:text-gold-500"
                    @click="mobileOpen = false"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>

              <BaseButton :href="whatsappUrl" external size="lg" class="mt-auto w-full">
                <MessageCircle :size="18" aria-hidden="true" />
                Fazer orçamento
              </BaseButton>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </nav>
  </header>
</template>
