'use client'

import { LazyMotion, MotionConfig } from 'motion/react'

/**
 * Wraps the tree once so every `<m.*>` below shares a single feature bundle.
 *
 * Motion costs ~45 KB gzipped here (measured, not estimated — see the README).
 * `m` + `LazyMotion` is still the cheaper half of the library: `strict` turns
 * any accidental `<motion.div>`, which would pull in the rest eagerly, into a
 * runtime error rather than a silent regression.
 *
 * None of it is on the critical path: the HTML is complete and readable before
 * a single byte of this loads. The reveals are pure enhancement.
 */
const loadFeatures = () => import('./features').then((mod) => mod.default)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
