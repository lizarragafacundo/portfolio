'use client'

import { m } from 'motion/react'

/**
 * Fades content up as it scrolls into view.
 *
 * `children` arrives as a prop from a Server Component, so everything inside
 * is still rendered on the server and shipped as HTML — only this thin wrapper
 * is client-side. Without that split, marking a section `'use client'` would
 * push all of its copy into the JS bundle.
 *
 * The `data-reveal` attribute is the no-JS escape hatch: the <noscript> block
 * in the layout forces these back to full opacity.
 */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

interface RevealProps {
  children: React.ReactNode
  /** Seconds to wait before starting. Use for deliberate sequencing only. */
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </m.div>
  )
}
