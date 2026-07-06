import type { CSSProperties } from 'react'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/**
 * Decorative mini git-graph for the About hero (pure ornament, aria-hidden).
 * Draws itself as part of the hero's page-load choreography.
 */
export function MiniGraph() {
  return (
    <svg
      className="mini-graph"
      viewBox="0 0 220 320"
      width="220"
      height="320"
      aria-hidden="true"
      focusable="false"
    >
      <path className="mg-main" d="M 40 292 L 40 34" pathLength={1} style={d(120)} />
      <path
        className="mg-branch mg-edu"
        d="M 40 238 C 40 220, 112 230, 112 212 L 112 132 C 112 114, 40 124, 40 106"
        pathLength={1}
        style={d(420)}
      />
      <path
        className="mg-branch mg-research"
        d="M 40 186 C 40 166, 176 178, 176 158 L 176 66"
        pathLength={1}
        style={d(640)}
      />
      <circle className="mg-dot" cx="40" cy="238" r="4" style={d(500)} />
      <circle className="mg-dot" cx="40" cy="186" r="4" style={d(700)} />
      <circle className="mg-dot" cx="40" cy="106" r="4" style={d(820)} />
      <circle className="mg-node mg-edu-node" cx="112" cy="172" r="6.5" style={d(860)} />
      <circle className="mg-node mg-main-node" cx="40" cy="34" r="6.5" style={d(900)} />
      <circle className="mg-pulse" cx="176" cy="66" r="7" />
      <circle
        className="mg-node mg-research-node"
        cx="176"
        cy="66"
        r="6.5"
        style={d(980)}
      />
    </svg>
  )
}
