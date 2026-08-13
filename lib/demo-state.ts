export const DEMO_TICK_MS = 850

const POSTURE_BAR_WIDTH = 18

export interface PostureState {
  score: number
  bar: string
  neck: number
  tilt: number
}

export function postureState(tick: number): PostureState {
  const score = clamp(79 + Math.round(13 * Math.sin(tick / 2.3)), 0, 100)
  const filled = Math.round((score / 100) * POSTURE_BAR_WIDTH)

  return {
    score,
    bar: '█'.repeat(filled) + '░'.repeat(POSTURE_BAR_WIDTH - filled),
    neck: 8 + Math.round(4 * Math.abs(Math.sin(tick / 3))),
    tilt: 2 + Math.round(3 * Math.abs(Math.cos(tick / 2.7))),
  }
}

export const PIPELINE_STAGES = [
  'validate',
  'fetch',
  'processes',
  'enrich',
  'score',
  'execute',
] as const

export type StagePhase = 'done' | 'active' | 'pending'

export interface PipelineStage {
  name: (typeof PIPELINE_STAGES)[number]
  phase: StagePhase
}

const LEADS = [
  { handle: '@lumine.studio', vertical: 'design agency', score: 94 },
  { handle: '@nova.fit', vertical: 'fitness coach', score: 81 },
  { handle: '@carter.dev', vertical: 'saas founder', score: 88 },
  { handle: '@mara.eats', vertical: 'food & bev', score: 57 },
  { handle: '@atlas.realty', vertical: 'real estate', score: 73 },
] as const

export const QUALIFIED_THRESHOLD = 70

export interface LeadRow {
  handle: string
  vertical: string
  score: number
  scanning: boolean
  qualified: boolean
}

export interface PipelineState {
  stages: PipelineStage[]
  rows: LeadRow[]
  queue: number
}

export function pipelineState(tick: number): PipelineState {
  const activeIndex = mod(tick, PIPELINE_STAGES.length)
  const scanIndex = mod(tick, LEADS.length)

  return {
    stages: PIPELINE_STAGES.map((name, i) => ({
      name,
      phase: i === activeIndex ? 'active' : i < activeIndex ? 'done' : 'pending',
    })),
    rows: LEADS.map((lead, i) => ({
      ...lead,
      scanning: i === scanIndex,
      qualified: lead.score >= QUALIFIED_THRESHOLD,
    })),
    queue: 12 + mod(tick, 7),
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor
}
