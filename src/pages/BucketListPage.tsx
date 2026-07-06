import type { CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import { bucketList } from '../data/bucketList'
import { commitHashFor } from '../lib/hash'
import './bucket.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

export function BucketListPage() {
  const done = bucketList.filter((i) => i.done).length

  return (
    <Shell page="bucket-list">
      <header className="container page-header">
        <span className="file-tab">TODO.md</span>
        <h1>The bucket list</h1>
        <p className="intro">
          Things to do before I run out of runtime. {done} of {bucketList.length}{' '}
          merged so far.
        </p>
      </header>

      <section className="container" aria-label="Bucket list">
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
                    {commitHashFor(item.id)}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="todo-note mono">
            # christian still owes this file 5–8 lines (git blame agrees)
          </p>
        </div>
      </section>
    </Shell>
  )
}
