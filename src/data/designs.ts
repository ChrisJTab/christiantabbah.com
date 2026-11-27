/**
 * Design notes: a long-form page for a project at /projects/<slug>/,
 * linked from its card on /projects/ and its row in the home page's
 * selected work.
 *
 * Publishing one takes three steps:
 *   1. Add an entry here.
 *   2. In projects.ts, point the project's `writeup` at /projects/<slug>/
 *      and give it a short `writeupLabel`.
 *   3. Copy projects/url-shortener/ to projects/<slug>/ and update the
 *      <title>, description, canonical and OG URLs, and
 *      data-design="<slug>". Vite picks the folder up by itself.
 *
 * Numbers come from the course reports and the test output in the
 * project's repos. Each one says how it was measured; keep it that way.
 */

/** Diagrams drawn in Schematic.tsx, by id. */
export type DiagramId = 'shortener-v1'

/** A titled point: a part of the system, a bottleneck, a lesson. */
export type Point = { title: string; body: string }

export type DesignSection =
  /** A lead paragraph, the parts as titled points, and a diagram. */
  | {
      kind: 'parts'
      heading: string
      lead: string
      items: Point[]
      diagram?: { id: DiagramId; label: string; caption: string }
    }
  /** Tradeoffs as a diff: what each choice bought (+) and cost (−). */
  | {
      kind: 'decisions'
      heading: string
      lead: string
      items: { choice: string; gain: string; cost: string }[]
    }
  /** A results table; every row says how it was measured. */
  | {
      kind: 'measured'
      heading: string
      rows: { setting: string; value: string; note: string }[]
      after: string[]
    }
  /** Titled points, numbered, most important first. */
  | { kind: 'ranked'; heading: string; items: Point[] }
  | { kind: 'list'; heading: string; items: string[] }
  /** Two versions side by side, part by part. */
  | {
      kind: 'compare'
      heading: string
      lead: string
      columns: [string, string]
      rows: { part: string; before: string; after: string }[]
    }
  /** Titled points, then an optional closing paragraph. */
  | { kind: 'points'; heading: string; items: Point[]; after?: string }

export type DesignDoc = {
  slug: string
  /** The project in projects.ts this page belongs to. */
  projectId: string
  /** The command in the file tab above the title. */
  command: string
  title: string
  meta: string
  intro: string
  /** The file path in the panel's title bar, and the label at its right. */
  path: string
  branch: string
  sections: DesignSection[]
}

export const designs: DesignDoc[] = [
  {
    slug: 'url-shortener',
    projectId: 'url-shortener',
    command: '$ git show projects/url-shortener',
    title: 'A URL shortener, built twice',
    meta: 'Course project, team of three · v1: Java and SQLite on four lab machines · v2: Cassandra, Redis, and Docker Swarm',
    intro:
      'Two classmates and I built a bit.ly-style URL shortener twice. The first time, every piece was ours: the load balancer, the sharding, the replication, and the failover, in plain Java across four lab machines. The second time, we rebuilt it on Cassandra, Redis, and Docker Swarm to see what the real tools buy you. These are the design notes: what we chose, what each choice cost, what we measured, and what I’d change.',
    path: '~/projects/url-shortener/DESIGN.md',
    branch: 'v1 → v2',
    sections: [
      {
        kind: 'parts',
        heading: 'Version one: every piece by hand',
        lead: 'A short link has to turn into a redirect quickly from any of four machines, and keep working when one of them dies. Every request goes through a reverse proxy we wrote, and the rest follows from there.',
        items: [
          {
            title: 'Routing.',
            body: 'The proxy hashes each short code onto a ring where every machine owns 100 points, so links spread evenly, and a fifth machine would only take over the links next to its own points.',
          },
          {
            title: 'Storage.',
            body: 'Each machine keeps its share of the links in SQLite, with a small cache in front, and serves them from a pool of 8 threads.',
          },
          {
            title: 'Copies.',
            body: 'A write goes to its machine and, in the same request, to the next machine in line, so every machine also holds a copy of the one before it.',
          },
          {
            title: 'Failover.',
            body: 'The proxy checks every machine once a second. When one stops answering, its traffic goes to the machine holding its copy, and the proxy logs the writes it missed and replays them once it’s back. Cassandra calls this hinted handoff.',
          },
          {
            title: 'Recovery.',
            body: 'If a machine loses its database, a script rebuilds it from the copy next door.',
          },
        ],
        diagram: {
          id: 'shortener-v1',
          label:
            'Clients send every request to the reverse proxy, which routes each link to one of four machines. Each machine holds its own shard and a copy of the shard before it. Machine 3 is down, so its traffic goes to machine 4, which holds the copy of shard 3.',
          caption:
            'Machine 3 is down, so its links go to machine 4, which holds their copy.',
        },
      },
      {
        kind: 'decisions',
        heading: 'Decisions, and what they cost',
        lead: 'Every choice bought something and cost something. In diff form:',
        items: [
          {
            choice: 'Our own proxy, with consistent hashing',
            gain: 'Links spread evenly, and adding a machine only moves its share of them.',
            cost: 'Every request passes through one process: a single point of failure, and the first thing to max out.',
          },
          {
            choice: 'Copy every write before replying',
            gain: 'A confirmed link survives its machine dying.',
            cost: 'Every write is two inserts on two machines, each saved to disk, so writes ran about 5 times slower than reads.',
          },
          {
            choice: 'SQLite on every machine',
            gain: 'No database server to run, and a lost database rebuilds from its neighbor with one script.',
            cost: 'One connection per machine, behind one lock: database calls run one at a time, even with 8 threads.',
          },
          {
            choice: 'A small cache in each server',
            gain: 'A repeat lookup skips the database.',
            cost: 'It barely mattered. With 89% of reads missing it, reads still ran at about 1,180 a second, because SQLite was answering from memory anyway.',
          },
          {
            choice: 'A heartbeat every second',
            gain: 'Traffic leaves a dead machine within about a second.',
            cost: 'A request sent in the second after a machine dies still fails; the proxy only learns on the next beat.',
          },
        ],
      },
      {
        kind: 'measured',
        heading: 'What we measured',
        rows: [
          {
            setting: 'Reads, through all four machines',
            value: '1,100+ a second',
            note: 'JMeter, 4 test clients',
          },
          {
            setting: 'Writes, through all four machines',
            value: 'about 200 a second',
            note: 'every write lands on two machines',
          },
          {
            setting: 'Writes, two machines → four',
            value: 'doubled, 100 → 200 a second',
            note: 'the scaling we were after',
          },
          {
            setting: 'Reads, two machines → four',
            value: '970 → 1,110 a second',
            note: 'a smaller gain, most likely the test clients’ limit',
          },
          {
            setting: 'One server, one cached link',
            value: '21,000 a second',
            note: 'ApacheBench, 15 clients on the same machine',
          },
        ],
        after: [
          'Read the first two as floors. Four clients, each waiting about 3.5 ms for a reply, can only send about 1,100 requests a second, so the test hit its own limit before the system hit its. One server on its own answered 21,000 cached lookups a second: the machines had room to spare, and the proxy is where I’d expect the real ceiling.',
        ],
      },
      {
        kind: 'ranked',
        heading: 'Where it would break first',
        items: [
          {
            title: 'The proxy.',
            body: 'Every request goes through one Java process with 8 threads. It opens a fresh connection to a machine for every request, and reads its replay log from disk on every request too.',
          },
          {
            title: 'Writes.',
            body: 'Two inserts on two machines per link, each its own disk commit, queued behind one lock per machine.',
          },
          {
            title: 'Recovery.',
            body: 'The rebuild script inserts one row per command, so the time to restore a machine grows with every link it holds. A single bulk import would be far faster.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'What I’d change',
        items: [
          'Run two proxies behind one address, or let clients hash keys themselves, so routing never rests on one process.',
          'Keep connections to the machines open, and keep the replay log in memory, writing it to disk only when it changes.',
          'Give each thread its own SQLite connection in write-ahead-log mode, so reads stop waiting behind writes, and batch writes into transactions.',
          'Size the cache from measurements. Ours held 5 to 10 links, fewer than our test cycled through on each machine, so it missed most of the time.',
          'Ramp the load test up until latency bends, and report the 99th percentile next to the average.',
        ],
      },
      {
        kind: 'compare',
        heading: 'Version two: rebuilt on Docker Swarm',
        lead: 'For the next assignment we swapped our parts for off-the-shelf ones. A Flask server runs on every Swarm worker and Swarm spreads requests across them, Cassandra keeps three copies of every link, Redis caches reads on two replicas, and a writer service moves new links from Redis into Cassandra.',
        columns: ['Version one', 'Version two'],
        rows: [
          {
            part: 'Routing',
            before: 'our proxy, by consistent hashing',
            after: 'Swarm’s routing mesh, a Flask server per worker',
          },
          {
            part: 'Storage',
            before: 'SQLite on each machine, one copy',
            after: 'Cassandra on four nodes, three copies',
          },
          {
            part: 'Cache',
            before: 'a 10-link cache per server',
            after: 'Redis: one primary, two read replicas',
          },
          {
            part: 'Writes',
            before: 'two machines, before replying',
            after: 'Redis first, Cassandra after',
          },
          {
            part: 'When a node dies',
            before: 'heartbeat, failover, replay log',
            after: 'Swarm restarts its containers; Cassandra reads around it',
          },
          {
            part: 'Monitoring',
            before: 'our heartbeat',
            after: 'a live map of every container',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'What version two taught us',
        items: [
          {
            title: 'Consistency has a price.',
            body: 'Reading at QUORUM took 28% longer than reading from one replica: 133 seconds against 104 for 16,000 reads. We read from one. A brand-new link might take a moment to reach every replica, which a shortener can live with.',
          },
          {
            title: 'Measure before you cache.',
            body: 'Redis made reads about 5% faster, 99 seconds against 104. Cassandra already kept hot rows in memory, and both sat one 1 to 3 ms hop away.',
          },
          {
            title: 'Fast writes, with a gap.',
            body: 'A write is confirmed once it’s in Redis, and the writer saves it to Cassandra after. Replies are quick, but Redis pub/sub keeps no messages: a write sent while the writer is down never reaches Cassandra. A Redis stream would hold it until the writer is back.',
          },
          {
            title: 'One manager, one weak spot.',
            body: 'Our swarm had a single manager, and losing it stops the cluster from healing itself. Three managers would survive losing one.',
          },
        ],
        after:
          'We planned both versions together. In version two, my part was the first version of the HTTP server, its connections to Cassandra and Redis, and its link to the writer.',
      },
    ],
  },
]
