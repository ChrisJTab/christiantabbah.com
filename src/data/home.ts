// Content for the home page: the recruiter-facing landing. Voice: first
// person, warm, a little playful. Facts only, nothing aspirational.
//
// The top of the page is a README: who I am and how to reach me (hero) on
// the left, what I work with (skills) beside it. It stays short enough that
// the research block starts on a laptop's first screen.

export const hero = {
  /** Mono keyword line under the name. Recruiters pattern-match on it. */
  title: 'systems engineer · databases · GPUs · MSc CS, UofT 2026',
  intro: [
    'I just finished a master’s at the University of Toronto, where I built a GPU transactional database that keeps running when the data outgrows the GPU.',
    'I like hard systems problems and the people on the other side of them.',
  ],
}

/** The README's skills column. `more` links to the timeline, whose
    entries list the skills each job or project added. Keep each group to
    two or three lines in the column; the timeline and the project pages
    carry the details. */
export const stack = {
  heading: 'What I work with',
  more: 'Where I picked these up, on the timeline\u00a0→',
}

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'gpu & systems',
    items: [
      'CUDA',
      'C++',
      'C',
      'Nsight profiling',
      'PCIe and DMA',
      'RDMA with UCX',
      'operating systems',
      'file systems',
    ],
  },
  {
    group: 'databases & distributed systems',
    items: [
      'transactions and storage engines',
      'SQL',
      'Cassandra',
      'Redis',
      'consistent hashing',
      'Docker Swarm',
      'AWS',
    ],
  },
  {
    group: 'full-stack & mobile',
    items: [
      'TypeScript',
      'React Native with Expo',
      'Firebase',
      'C# and .NET',
      'Python',
      'Java',
    ],
  },
  {
    group: 'people',
    items: [
      'eleven terms as a TA, including lecturing',
      'designed and taught a kids’ cybersecurity course at THINK in Yerevan',
      'founded and ran a 200-member club',
      'French and English',
    ],
  },
]

/** Project ids (src/data/projects.ts) under “Selected work”, in order. */
export const selectedProjectIds = ['uate-app', 'url-shortener', 'gpu-olap-distinct']

export const contact = {
  heading: 'Say hello',
  note: 'Email is the fastest way to reach me. I answer, and I’m always happy to talk shop.',
}
