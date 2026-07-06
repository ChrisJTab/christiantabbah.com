/**
 * Deterministic fake commit hashes (FNV-1a → 7 hex chars), so every entry
 * gets a stable, git-looking id without any actual git involved.
 */
export function commitHashFor(seed: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 4).toString(16).padStart(7, '0').slice(0, 7)
}

/** Stable small int in [min, max] derived from a seed, used for diffstat bars. */
export function seededInt(seed: string, min: number, max: number): number {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return min + ((h >>> 0) % (max - min + 1))
}
