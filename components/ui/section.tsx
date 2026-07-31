import { Reveal } from '@/components/motion/reveal'
import type { SectionId } from '@/lib/site'

/**
 * A page section with its numbered terminal-style header:
 *
 *   [ experience ] ────────────────────────── 02
 */
interface SectionProps {
  id: SectionId
  title: string
  /** Two-digit index shown on the right, e.g. "02". */
  index: string
  children: React.ReactNode
}

export function Section({ id, title, index, children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24 py-11">
      <Reveal>
        <div className="mb-7 flex items-center gap-4">
          <h2
            id={headingId}
            className="text-ac text-sm font-bold tracking-[0.125em] whitespace-nowrap"
          >
            {/* Brackets are decoration — keeping them out of the accessible
                name means the section is announced as "experience", not
                "[ experience ]". */}
            <span aria-hidden="true">[ </span>
            {title}
            <span aria-hidden="true"> ]</span>
          </h2>
          <span aria-hidden="true" className="border-border h-0 flex-1 border-t border-dashed" />
          <span aria-hidden="true" className="text-fg-faint text-xs">
            {index}
          </span>
        </div>
      </Reveal>
      {children}
    </section>
  )
}
