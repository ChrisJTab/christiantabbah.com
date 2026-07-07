export interface Project {
  id: string
  name: string
  /** Two-to-three sentences shown on the project panel. */
  description: string
  /** Small colored badge on the card (see TOPIC_COLORS in ProjectsPage). */
  topic: string
  tech: string[]
  /** TODO(christian): add repo links where they exist; panels link when set. */
  repo: string | null
}

export const projects: Project[] = [
  {
    id: 'parcube',
    name: 'parcube',
    description:
      'A mobile app for renting out parking spots, built in React Native. Google Maps integration puts every listing right on the map, where a parking spot belongs.',
    topic: 'mobile',
    tech: ['React Native', 'Google Maps'],
    repo: null,
  },
  {
    id: 'url-shortener-java',
    name: 'url-shortener (v1)',
    description:
      'A distributed URL shortener in Java and SQL. The interesting part is the routing: consistent hashing spreads keys across shards, so the system scales out without reshuffling everything it already stored.',
    topic: 'distributed systems',
    tech: ['Java', 'SQL', 'consistent hashing'],
    repo: null,
  },
  {
    id: 'url-shortener-swarm',
    name: 'url-shortener (v2)',
    description:
      'The sequel, distributed harder: a Docker Swarm deployment backed by Cassandra for storage and Redis for caching, glued together with Python. Same problem as v1, considerably more infrastructure.',
    topic: 'distributed systems',
    tech: ['Docker Swarm', 'Cassandra', 'Redis', 'Python'],
    repo: null,
  },
  {
    id: 'ext2-shell',
    name: 'ext2-fs + shell',
    description:
      'An implementation of the ext2 file system plus a custom shell, both written in C. The kind of project where an inode stops being an exam answer and starts being your problem.',
    topic: 'systems',
    tech: ['C', 'ext2'],
    repo: null,
  },
  {
    id: 'udp-reliable',
    name: 'udp-reliable-transfer',
    description:
      'Reliable file transfer built on top of UDP: acks, retransmissions, timeouts, ordering. Essentially TCP by hand, with a lot more respect for TCP by the end.',
    topic: 'networking',
    tech: ['UDP', 'networking'],
    repo: null,
  },
  {
    id: 'survey-classifier',
    name: 'survey-classifier',
    description:
      'A machine learning classifier for survey responses. Scored 85–90% accuracy on the test set, the best result in the class.',
    topic: 'machine learning',
    tech: ['machine learning'],
    repo: null,
  },
  {
    id: 'rocksdb-hailstorm',
    name: 'rocksdb × hailstorm',
    description:
      'A disaggregated storage prototype wiring RocksDB into Hailstorm, in Scala and C++. Storage lives apart from compute; the prototype explores what that separation costs and what it buys.',
    topic: 'systems',
    tech: ['Scala', 'C++', 'RocksDB'],
    repo: null,
  },
  {
    id: 'gpu-olap-distinct',
    name: 'gpu-olap-distinct',
    description:
      'A distributed GPU OLAP prototype for DISTINCT queries: data moves between GPUs over RDMA with UCX, and a CUB radix sort handles deduplication on the destination GPU.',
    topic: 'gpu systems',
    tech: ['CUDA', 'RDMA', 'UCX'],
    repo: null,
  },
]
