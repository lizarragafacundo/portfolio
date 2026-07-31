/**
 * Pure state for the two animated ASCII widgets.
 *
 * Everything here is a function of a single integer `tick`, which means the
 * server can render tick 0 and the client can hydrate to exactly the same
 * markup — no mismatch, no flash. It also makes the widgets testable without
 * a DOM or fake timers.
 */

export const DEMO_TICK_MS = 850

/* ------------------------------------------------------------------ Posture */

const POSTURE_BAR_WIDTH = 18

export interface PostureState {
  /** 0–100 posture score. */
  score: number
  /** `█`/`░` bar, always POSTURE_BAR_WIDTH characters wide. */
  bar: string
  /** Forward neck angle, degrees. */
  neck: number
  /** Lateral tilt, degrees. */
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

/* --------------------------------------------------------------- Marktboost */

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

/** Scores at or above this are treated as qualified leads. */
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
  /** Items waiting in the durable priority queue. */
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

/* ----------------------------------------------------------------- helpers */

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Modulo that stays non-negative for negative ticks. */
function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor
}
