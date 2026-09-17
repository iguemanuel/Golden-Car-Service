/**
 * Registro central dos icones usados em componentes data-driven
 * (ServiceCard, TransmissionSection).
 *
 * Por que nao `import * as icons from 'lucide-vue-next'`: isso quebra o
 * tree-shaking — o bundler nao consegue saber em build-time quais dos
 * 1500+ icones a string vinda do data file vai pedir em runtime, entao
 * inclui o pacote inteiro. Import nomeado + mapa explicito mantem so os
 * icones realmente usados no bundle.
 *
 * Para usar um icone novo num data file (services.ts, transmission.ts):
 * importar aqui e adicionar na `iconMap`. Nome errado cai no fallback
 * `CircleQuestionMark` e loga erro no console em dev (ver useIcon.ts).
 */
import {
  Cog,
  Disc,
  Droplet,
  Droplets,
  ScanLine,
  ShieldCheck,
  Waves,
  Wrench,
  Zap,
  CircleQuestionMark,
} from 'lucide-vue-next'

export const iconMap = {
  Cog,
  Disc,
  Droplet,
  Droplets,
  ScanLine,
  ShieldCheck,
  Waves,
  Wrench,
  Zap,
  CircleQuestionMark,
} as const

export type IconName = keyof typeof iconMap
