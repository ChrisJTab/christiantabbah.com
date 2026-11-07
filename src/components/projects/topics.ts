import type { Topic } from '../../data/projects'

/** Topic badge colors, drawn from the theme’s branch palette. */
export const TOPIC_COLORS: Record<Topic, string> = {
  mobile: 'var(--c-work)',
  'distributed systems': 'var(--c-education)',
  systems: 'var(--c-leadership)',
  networking: 'var(--c-research)',
  'gpu systems': 'var(--primary)',
}

export const TOPIC_ORDER = Object.keys(TOPIC_COLORS) as Topic[]
