'use client'

import { TerminalFrame } from '@/components/ui/terminal-frame'
import { useTick } from '@/hooks/use-tick'
import { cn } from '@/lib/cn'
import { pipelineState, type StagePhase } from '@/lib/demo-state'

/** Live mock of the Marktboost Step Functions pipeline and lead scorer. */
export function PipelineDemo() {
  const { ref, tick } = useTick<HTMLDivElement>()
  const { stages, rows, queue } = pipelineState(tick)

  return (
    <div ref={ref}>
      <TerminalFrame
        title="marktboost — pipeline console"
        status={
          <>
            <span>Ollama scorer · queue {queue}</span>
            <span className="text-ac">paid→free</span>
          </>
        }
      >
        <div aria-live="off">
          <ol className="mb-3 flex flex-wrap gap-1">
            {stages.map((stage) => (
              <li
                key={stage.name}
                className={cn('border px-1.5 py-0.5 text-[9px]', stagePhase(stage.phase))}
              >
                {stage.name}
              </li>
            ))}
          </ol>

          <ul className="flex flex-col gap-1">
            {rows.map((row) => (
              <li
                key={row.handle}
                className={cn(
                  'grid grid-cols-[1fr_auto] items-center gap-2 border px-2 py-[5px] text-[11px]',
                  row.scanning
                    ? 'border-ac bg-[color-mix(in_oklch,var(--color-ac)_14%,transparent)]'
                    : 'border-border-soft bg-bg-deep',
                )}
              >
                <span className="min-w-0 truncate">
                  <span className="text-fg">{row.handle}</span>
                  <span className="text-fg-mute"> · {row.vertical}</span>
                </span>
                <span
                  className={cn(
                    'font-bold tabular-nums',
                    row.scanning ? 'text-warn' : row.qualified ? 'text-ac' : 'text-fg-mute',
                  )}
                >
                  {row.scanning ? 'scoring…' : row.score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="sr-only">
          Illustrative demo of the Marktboost pipeline: six stages advancing in order while
          candidate profiles are scored one at a time.
        </p>
      </TerminalFrame>
    </div>
  )
}

function stagePhase(phase: StagePhase): string {
  switch (phase) {
    case 'active':
      return 'border-ac bg-ac text-bg'
    case 'done':
      return 'border-ac text-ac'
    case 'pending':
      return 'border-border text-fg-mute'
  }
}
