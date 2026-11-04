// Content for the Projects page. Voice: first person, warm, a little playful.
// Facts below come from the actual repos/reports in ../project-sources.

export type Topic =
  | 'mobile'
  | 'distributed systems'
  | 'systems'
  | 'networking'
  | 'gpu systems'

/** Ids of the hand-drawn SVG schematics in components/projects/Schematic.tsx */
export type SchematicId = 'shortener' | 'rplace' | 'olap' | 'disagg' | 'udp'

export interface ProjectShot {
  /** Filename inside public/images/projects/ */
  src: string
  alt: string
  /** Optional CSS object-position for the card-cover crop, e.g. '50% 30%'. */
  pos?: string
}

export type ProjectVisual =
  | {
      kind: 'shots'
      shots: ProjectShot[]
      /** App-icon file (public/images/projects/); turns the cover into a
          logo-plus-phone backdrop instead of cropped screenshots. */
      logo?: string
      /** Index of the shot shown as the cover phone (default 0). */
      coverShot?: number
    }
  | {
      kind: 'schematic'
      schematic: SchematicId
      caption: string
      /** Cover shows the pixel-canvas art instead of the schematic
          (the schematic still appears in the README). */
      pixelCover?: boolean
    }
  | { kind: 'terminal'; title: string; lines: string[] }
  | {
      kind: 'figures'
      /** Card cover image, framed like a little poster on the backdrop. */
      cover: ProjectShot
      /** Figure shown inside the README, with its caption. */
      figure: ProjectShot
      caption: string
    }

export interface Project {
  id: string
  /** Repo-style display name. */
  name: string
  /** Card blurb: 1–2 sentences. */
  blurb: string
  /** README bullets: the hard part, what I built, the result. */
  bullets: string[]
  topic: Topic
  tech: string[]
  /** TODO(christian): add repo/store links where they exist; null shows "code on request". */
  repo: string | null
  visual: ProjectVisual
}

export const projects: Project[] = [
  {
    id: 'uate-app',
    name: 'uate-app',
    blurb:
      'The official app of UATE and DigiTec, Armenia’s largest tech event: schedules, interest-matched people, chat, and RSVPs for 2,400+ attendees. Running in production; I built every screen, the backend, and the docs.',
    bullets: [
      'Fully bilingual (English/Հայերեն) down to the fonts, with sessions always shown in event-local time no matter where the phone is.',
      'A 46-topic interest graph powers two matching engines: suggested people show the shared tags as “why matched” chips, and the schedule grows a personal “For you” rail.',
      'RSVPs land an invite in your email calendar; organizers publish whole events from an admin panel with no developer involved.',
    ],
    topic: 'mobile',
    tech: ['React Native (Expo)', 'TypeScript', 'Firebase', 'TanStack Query'],
    repo: null,
    visual: {
      kind: 'shots',
      logo: 'uate-logo.png',
      coverShot: 1,
      shots: [
        {
          src: 'uate-welcome.png',
          alt: 'UATE welcome screen: “Meet the people behind Armenian tech”, with sign in, create account, and guest browsing',
          pos: '50% 34%',
        },
        {
          src: 'uate-agenda.png',
          alt: 'DigiTec 2026 personal agenda with RSVP’d sessions and day tabs',
          pos: '50% 12%',
        },
        {
          src: 'uate-interests.png',
          alt: 'Interest picker: a grid of ten categories with selection counts',
        },
        {
          src: 'uate-session.png',
          alt: 'Session detail with time, venue, description, and an RSVP button',
        },
      ],
    },
  },
  {
    id: 'egad',
    name: 'EGAD',
    blurb:
      'My master’s research: a GPU-accelerated transactional database whose primary store lives in CPU memory, so the database can be bigger than the GPU that runs it.',
    bullets: [
      'A staging layer admits each batch’s working set onto the GPU and writes back what it modified. Batch writes only touch one of the two record versions, halving per-record PCIe traffic.',
      'Writeback runs concurrently with the next batch’s execution; the CPU-side store trails the GPU by at most two batches, so crash recovery replays at most two batches of inputs.',
      'Extends Epic (OSDI ’24) beyond device memory; a full harness reproduces the paper’s YCSB and TPC-C evaluation.',
    ],
    topic: 'gpu systems',
    tech: ['CUDA', 'C++', 'Epic'],
    repo: null,
    visual: {
      kind: 'figures',
      cover: {
        src: 'egad-architecture.png',
        alt: 'EGAD architecture figure: a per-epoch stager admits records from the CPU primary store into the GPU execution cache and flushes writeback',
      },
      figure: {
        src: 'egad-timeline.png',
        alt: 'Epoch timeline figure from the EGAD paper comparing asynchronous and synchronous writeback',
      },
      caption:
        'From the paper: asynchronous writeback overlaps the next epoch’s execution, 10.29 vs 12.49 ms per epoch.',
    },
  },
  {
    id: 'r-place',
    name: 'r/place',
    blurb:
      'Reddit’s r/place rebuilt on AWS: one shared pixel canvas surviving a crowd of concurrent painters.',
    bullets: [
      'The canvas is a Redis bitfield in ElastiCache: placing a pixel is a SETBIT, reading the board is one GETRANGE.',
      'A Lambda WebSocket gateway fans every pixel update out to all open browsers; an HTTP gateway serves board snapshots.',
      'The whole stack (EC2, DynamoDB, API Gateway, CloudFront, S3, VPC, CloudWatch) stands up from a single CloudFormation template.',
    ],
    topic: 'distributed systems',
    tech: ['AWS Lambda', 'ElastiCache Redis', 'DynamoDB', 'CloudFormation'],
    repo: null,
    visual: {
      kind: 'schematic',
      schematic: 'rplace',
      pixelCover: true,
      caption:
        'Painters hit the Lambda gateways; the board itself is bits in Redis.',
    },
  },
  {
    id: 'url-shortener',
    name: 'url-shortener (v1 → v2)',
    blurb:
      'The same problem solved twice: first from scratch in Java and SQL, then again on grown-up infrastructure. The diff between the two taught me more than either version.',
    bullets: [
      'v1.0, no frameworks: consistent hashing spreads keys across database shards, so the system scales out without reshuffling what it already stored.',
      'v2.0, same spec, more infrastructure: a Docker Swarm deployment backed by Cassandra for storage and Redis for caching, glued together with Python.',
      'Both versions shipped with load-testing suites and reports on availability, consistency, and fault tolerance.',
    ],
    topic: 'distributed systems',
    tech: ['Java', 'SQL', 'Docker Swarm', 'Cassandra', 'Redis', 'Python'],
    repo: null,
    visual: {
      kind: 'schematic',
      schematic: 'shortener',
      caption:
        'A key hashes onto the ring and lands on a shard; new shards only take their arc.',
    },
  },
  {
    id: 'gpu-olap-distinct',
    name: 'gpu-olap-distinct',
    blurb:
      'A distributed GPU OLAP prototype for DISTINCT queries: data moves between GPUs over RDMA with UCX, and a CUB radix sort handles deduplication on the destination GPU.',
    bullets: [
      'GPU-to-GPU transfers run over RDMA with UCX; the destination card deduplicates with a CUB radix sort.',
      'Evaluated when an intermediate host node doing partial on-path processing pays off versus sending everything straight through.',
    ],
    topic: 'gpu systems',
    tech: ['CUDA', 'RDMA', 'UCX'],
    repo: null,
    visual: {
      kind: 'schematic',
      schematic: 'olap',
      caption:
        'Straight GPU-to-GPU over RDMA, or through a host node that pre-reduces on the way.',
    },
  },
  {
    id: 'rocksdb-hailstorm',
    name: 'rocksdb × hailstorm',
    blurb:
      'A disaggregated storage prototype wiring RocksDB into Hailstorm, in Scala and C++. Storage lives apart from compute; the prototype explores what that separation costs and what it buys.',
    bullets: [
      'RocksDB’s storage layer talks to Hailstorm over the network instead of local disk, so compute and storage scale independently.',
      'The interesting measurements are the trade: added latency on the wire against the freedom to grow either side alone.',
    ],
    topic: 'systems',
    tech: ['Scala', 'C++', 'RocksDB'],
    repo: null,
    visual: {
      kind: 'schematic',
      schematic: 'disagg',
      caption: 'Compute on one side, storage on the other, a network in between.',
    },
  },
  {
    id: 'parcube',
    name: 'parcube',
    blurb:
      'A mobile app for renting out parking spots, built in React Native. Google Maps integration puts every listing right on the map, where a parking spot belongs.',
    bullets: [
      'React Native front end with Firebase behind it: Firestore for listings, cloud functions for the backend logic.',
      'Every driveway is a pin with a live hourly price: search an area and park in someone’s “My driveway :)” for $4.99/h.',
    ],
    topic: 'mobile',
    tech: ['React Native', 'Firebase', 'Google Maps'],
    repo: null,
    visual: {
      kind: 'shots',
      logo: 'parcube-logo.png',
      shots: [
        {
          src: 'parcube-map.png',
          alt: 'Parcube map view around UTM with driveway listings priced per hour',
          pos: '50% 22%',
        },
        {
          src: 'parcube-help.png',
          alt: 'Parcube help home with parkers, hosting, and reporting sections',
        },
      ],
    },
  },
  {
    id: 'ext2-shell',
    name: 'ext2-fs + shell',
    blurb:
      'An implementation of the ext2 file system plus a custom shell, both written in C. The kind of project where an inode stops being an exam answer and starts being your problem.',
    bullets: [
      'Inode allocation, block bitmaps, and directory entries implemented against the real on-disk ext2 format.',
      'The shell drives it: cp, rm, ls, mkdir straight onto the disk image.',
    ],
    topic: 'systems',
    tech: ['C', 'ext2'],
    repo: null,
    visual: {
      kind: 'terminal',
      title: 'ext2 · demo',
      lines: [
        '$ ./shell disk.img',
        'ext2$ ls /',
        'photos/   notes.txt   lost+found/',
        'ext2$ cp beach.jpg /photos/',
        'alloc inode 27 → blocks 512–515',
        'ext2$ rm /notes.txt',
        'freed inode 12, 3 blocks',
        'ext2$',
      ],
    },
  },
  {
    id: 'udp-reliable',
    name: 'udp-reliable-transfer',
    blurb:
      'Reliable file transfer built on top of UDP: acks, retransmissions, timeouts, ordering. Essentially TCP by hand, with a lot more respect for TCP by the end.',
    bullets: [
      'Acknowledgements, retransmission timers, and in-order delivery built by hand on top of raw datagrams.',
      'Files arrive intact through simulated loss, and TCP earned a lifelong fan.',
    ],
    topic: 'networking',
    tech: ['UDP', 'C'],
    repo: null,
    visual: {
      kind: 'schematic',
      schematic: 'udp',
      caption: 'Packet 2 dies on the wire; the timeout notices and sends it again.',
    },
  },
]

/** One-liners that earn a mention but not a card. */
export const alsoShipped: { name: string; note: string }[] = [
  {
    name: 'survey-classifier',
    note: 'an ML classifier for survey responses. 85–90% test accuracy, best in the class',
  },
]
