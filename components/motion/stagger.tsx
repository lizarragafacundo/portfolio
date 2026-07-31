'use client'

import { m } from 'motion/react'

/**
 * Reveals a list one item at a time. Pair `<Stagger>` with one `<StaggerItem>`
 * per child; the parent orchestrates timing through variants, so the delay is
 * computed by Motion rather than hardcoded per index.
 */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <m.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </m.div>
  )
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <m.div data-reveal className={className} variants={item}>
      {children}
    </m.div>
  )
}
