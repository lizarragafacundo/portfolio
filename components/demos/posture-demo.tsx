'use client'

import { AsciiArt } from '@/components/ui/ascii-art'
import { TerminalFrame } from '@/components/ui/terminal-frame'
import { POSE_FIGURE } from '@/content/ascii'
import { useTick } from '@/hooks/use-tick'
import { postureState } from '@/lib/demo-state'

export function PostureDemo() {
  const { ref, tick } = useTick<HTMLDivElement>()
  const { score, bar, neck, tilt } = postureState(tick)

  return (
    <div ref={ref}>
      <TerminalFrame
        title="posture — live analysis"
        status={
          <>
            <span>MoveNet · 26 features</span>
            <span className="text-ac">qdrant + mlp</span>
          </>
        }
      >
        <div aria-live="off" className="flex items-center gap-4">
          <AsciiArt art={POSE_FIGURE} className="text-ac-dim text-[10px] leading-[1.15]" />

          <div className="min-w-0 flex-1 text-[11px]">
            <div className="text-fg-mute flex items-baseline justify-between">
              <span>score</span>
              <span className="text-ac-bright text-lg font-bold tabular-nums">{score}</span>
            </div>

            <div className="text-ac my-2 tracking-tighter">{bar}</div>

            <dl className="text-fg-mute grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex justify-between">
                <dt>neck</dt>
                <dd className="text-fg-dim tabular-nums">{neck}°</dd>
              </div>
              <div className="flex justify-between">
                <dt>tilt</dt>
                <dd className="text-fg-dim tabular-nums">{tilt}°</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="sr-only">
          Illustrative demo of the Posture scoring loop: a posture score, a forward-neck angle and a
          lateral tilt angle, refreshed continuously.
        </p>
      </TerminalFrame>
    </div>
  )
}
