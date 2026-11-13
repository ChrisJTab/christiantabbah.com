// Prints the SHA-256 of a CTF flag, for `flagSha256` in src/data/releases.ts.
// Usage: node scripts/flag-hash.mjs 'flag{exact_text}'
import { createHash } from 'node:crypto'

const flag = process.argv[2]
if (!flag) {
  console.error("usage: node scripts/flag-hash.mjs 'flag{...}'")
  process.exit(1)
}
console.log(createHash('sha256').update(flag, 'utf8').digest('hex'))
