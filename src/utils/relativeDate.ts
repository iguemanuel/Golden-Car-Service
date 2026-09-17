const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'always' })

/**
 * Interpreta YYYY-MM-DD no meio-dia local para o fuso nao empurrar o dia.
 */
function parseDay(isoDay: string): Date {
  return new Date(`${isoDay}T12:00:00`)
}

function calendarMonthsBetween(from: Date, to: Date): number {
  let months =
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
  if (to.getDate() < from.getDate()) months -= 1
  return Math.max(0, months)
}

function wholeDaysBetween(from: Date, to: Date): number {
  const start = new Date(from)
  const end = new Date(to)
  start.setHours(12, 0, 0, 0)
  end.setHours(12, 0, 0, 0)
  return Math.max(0, Math.floor((end.getTime() - start.getTime()) / 86_400_000))
}

/**
 * "ha 2 meses", "ha 3 dias", "hoje" — atualiza sozinho conforme o calendario.
 */
export function formatRelativePast(isoDay: string, now = new Date()): string {
  const then = parseDay(isoDay)
  const months = calendarMonthsBetween(new Date(then), new Date(now))

  if (months >= 12) return rtf.format(-Math.floor(months / 12), 'year')
  if (months >= 1) return rtf.format(-months, 'month')

  const days = wholeDaysBetween(new Date(then), new Date(now))
  if (days < 1) return 'hoje'
  if (days >= 7) return rtf.format(-Math.floor(days / 7), 'week')
  return rtf.format(-days, 'day')
}
