import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Section } from '@/components/ui/section'
import { Tag } from '@/components/ui/tag'
import type { SkillGroup } from '@/content/types'

export function Skills({ title, groups }: { title: string; groups: readonly SkillGroup[] }) {
  return (
    <Section id="skills" title={title} index="05">
      <Stagger className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <StaggerItem key={group.label} className="h-full">
            <article className="border-border bg-surface h-full border px-4.5 py-4">
              <h3 className="text-ac mb-2.5 text-xs font-bold tracking-[1px]">
                <span aria-hidden="true">┌─ </span>
                {group.label}
              </h3>
              <ul className="flex list-none flex-wrap gap-[7px]">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag className="text-fg-dim text-xs">{item}</Tag>
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
