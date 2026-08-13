import { describe, expect, it } from 'vitest'
import { PIPELINE_STAGES, pipelineState, postureState, QUALIFIED_THRESHOLD } from '@/lib/demo-state'

const TICKS = Array.from({ length: 60 }, (_, i) => i)

describe('postureState', () => {
  it('renders a bar of a fixed width, so the layout never jumps', () => {
    for (const tick of TICKS) {
      expect(postureState(tick).bar).toHaveLength(18)
    }
  })

  it('keeps the score inside 0–100', () => {
    for (const tick of TICKS) {
      const { score } = postureState(tick)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    }
  })

  it('fills the bar in proportion to the score', () => {
    for (const tick of TICKS) {
      const { score, bar } = postureState(tick)
      const filled = bar.split('').filter((char) => char === '█').length
      expect(filled).toBe(Math.round((score / 100) * 18))
    }
  })

  it('is deterministic — the server and the client agree on tick 0', () => {
    expect(postureState(0)).toEqual(postureState(0))
    expect(postureState(0).score).toBe(79)
  })
})

describe('pipelineState', () => {
  it('marks exactly one stage active at a time', () => {
    for (const tick of TICKS) {
      const active = pipelineState(tick).stages.filter((stage) => stage.phase === 'active')
      expect(active).toHaveLength(1)
    }
  })

  it('advances one stage per tick and wraps around', () => {
    const activeIndex = (tick: number) =>
      pipelineState(tick).stages.findIndex((stage) => stage.phase === 'active')

    expect(activeIndex(0)).toBe(0)
    expect(activeIndex(1)).toBe(1)
    expect(activeIndex(PIPELINE_STAGES.length)).toBe(0)
  })

  it('treats every stage before the active one as done', () => {
    const { stages } = pipelineState(3)
    expect(stages.map((stage) => stage.phase)).toEqual([
      'done',
      'done',
      'done',
      'active',
      'pending',
      'pending',
    ])
  })

  it('scans exactly one lead at a time', () => {
    for (const tick of TICKS) {
      expect(pipelineState(tick).rows.filter((row) => row.scanning)).toHaveLength(1)
    }
  })

  it('qualifies leads at or above the threshold', () => {
    for (const row of pipelineState(0).rows) {
      expect(row.qualified).toBe(row.score >= QUALIFIED_THRESHOLD)
    }
  })

  it('stays well-defined for negative ticks', () => {
    expect(() => pipelineState(-1)).not.toThrow()
    expect(pipelineState(-1).stages.filter((stage) => stage.phase === 'active')).toHaveLength(1)
  })
})
