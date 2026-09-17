import { iconMap } from '@/data/icons'

/**
 * Resolve um nome de icone (string vinda de um data file) para o componente
 * real, contra o registro central em data/icons.ts.
 *
 * Nome que nao existe no mapa cai no icone de interrogacao e loga um erro
 * em dev — um typo no data file nao pode falhar em silencio e deixar um
 * card sem icone sem ninguem perceber.
 */
export function resolveIcon(name: string) {
  const icon = iconMap[name as keyof typeof iconMap]

  if (import.meta.env.DEV && !icon) {
    console.error(`Ícone "${name}" não está registrado em src/data/icons.ts`)
  }

  return icon ?? iconMap.CircleQuestionMark
}
