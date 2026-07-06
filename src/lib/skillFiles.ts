/**
 * The commit panel renders skills as a "files changed" diffstat. Known skills
 * get a fitting fake filename; anything else falls back to <slug>.md.
 */
const FILE_BY_SKILL: Record<string, string> = {
  'c#': 'Program.cs',
  '.net': 'app.csproj',
  sql: 'queries.sql',
  bootstrap: 'styles.css',
  cuda: 'kernels.cu',
  'c++': 'engine.cpp',
  profiling: 'timeline.nsys-rep',
  'systems design': 'DESIGN.md',
  teaching: 'office-hours.md',
  'operating systems': 'kernel.c',
  security: 'threat-model.md',
  'information security': 'security-spec.md',
  mathematics: 'proofs.tex',
  databases: 'schema.sql',
  'file systems': 'superblock.c',
  'data recovery': 'recovery.log',
  'os internals': 'kernel-notes.md',
  leadership: 'leadership.md',
  patience: 'patience.md',
  improvisation: 'improv.md',
  probability: 'expected-value.md',
  organizing: 'run-of-show.md',
  'event planning': 'events.ics',
  logistics: 'logistics.md',
}

export function fileForSkill(skill: string): string {
  const key = skill.toLowerCase()
  return FILE_BY_SKILL[key] ?? `${key.replace(/[^a-z0-9]+/g, '-')}.md`
}
