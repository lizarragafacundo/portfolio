import { Reveal } from '@/components/motion/reveal'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Section } from '@/components/ui/section'
import { Tag } from '@/components/ui/tag'
import type { Education as EducationEntry } from '@/content/types'

interface EducationProps {
  title: string
  entries: readonly EducationEntry[]
  certificationsLabel: string
  certifications: readonly string[]
}

export function Education({ title, entries, certificationsLabel, certifications }: EducationProps) {
  return (
    <Section id="education" title={title} index="04">
      <Stagger className="mb-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <StaggerItem key={`${entry.school}-${entry.degree}`} className="h-full">
            <article className="border-border bg-surface h-full border p-5">
              <p aria-hidden="true" className="text-ac mb-2 text-[11px]">
                ┌─ {entry.meta} ─────┐
              </p>
              <h3 className="text-fg text-sm font-bold">{entry.school}</h3>
              <p className="text-fg-dim my-1.5 text-[13px]">
                {entry.degree} <span className="sr-only">({entry.meta})</span>
              </p>
              <p className="text-fg-mute text-xs leading-relaxed">{entry.description}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <div className="border-border bg-surface flex flex-wrap items-center gap-x-3.5 gap-y-2.5 border px-5.5 py-4.5">
          <h3 className="text-ac text-xs font-bold">{certificationsLabel}:</h3>
          <ul className="flex list-none flex-wrap gap-2.5">
            {certifications.map((certification) => (
              <li key={certification}>
                <Tag className="text-fg-dim text-xs">{certification}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
