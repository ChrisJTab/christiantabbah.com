import type { CSSProperties } from 'react'
import { bucketList } from '../data/bucketList'
import { commitHashFor } from '../lib/hash'
import './bucketList.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** TODO.md as a file view. Done items get strikethrough + a commit hash. */
export function BucketList() {
  return (
    <div className="todo-file">
      <div className="todo-chrome mono" aria-hidden="true">
        <span className="td-dot td-1" />
        <span className="td-dot td-2" />
        <span className="td-dot td-3" />
        <span className="todo-name">TODO.md</span>
        <span className="todo-branch">on main</span>
      </div>
      <ul className="todo-list">
        {bucketList.map((item, i) => (
          <li
            key={item.id}
            className={item.done ? 'done' : undefined}
            style={d(120 + i * 80)}
          >
            <span className="todo-gutter mono" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="todo-box mono" aria-hidden="true">
              {item.done ? '[x]' : '[ ]'}
            </span>
            <span className="visually-hidden">
              {item.done ? 'Done:' : 'Not yet:'}
            </span>
            <span className="todo-text">{item.text}</span>
            {item.done && (
              <span className="todo-hash mono" style={d(320 + i * 80)}>
                <span aria-hidden="true">✓ </span>
                {item.hash ?? commitHashFor(item.id)}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="todo-note mono">
        # more real items pending. jokes ship faster (fewer edge cases)
      </p>
    </div>
  )
}
