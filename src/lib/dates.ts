/** Year-month string, e.g. '2024-09'. All timeline math runs on these. */
export type YM = `${number}-${number}`

/** The graph's epoch: months are counted from January of this year. */
export const EPOCH_YEAR = 2018

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function parseYM(ym: YM): { year: number; month: number } {
  const [year, month] = ym.split('-').map(Number)
  return { year, month }
}

/** Months since Jan of EPOCH_YEAR ('2018-01' → 0). */
export function monthsSinceEpoch(ym: YM): number {
  const { year, month } = parseYM(ym)
  return (year - EPOCH_YEAR) * 12 + (month - 1)
}

export function formatYM(ym: YM): string {
  const { year, month } = parseYM(ym)
  return `${MONTHS[month - 1]} ${year}`
}

export function formatRange(start: YM, end: YM | 'ongoing'): string {
  return `${formatYM(start)} → ${end === 'ongoing' ? 'now' : formatYM(end)}`
}

/** Human duration like "2 yrs 8 mos", counting both endpoint months. */
export function durationLabel(start: YM, end: YM | 'ongoing', now: YM): string {
  const endT = end === 'ongoing' ? monthsSinceEpoch(now) : monthsSinceEpoch(end)
  const total = endT - monthsSinceEpoch(start) + 1
  const years = Math.floor(total / 12)
  const months = total % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ') || '1 mo'
}
