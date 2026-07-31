import { Reveal } from '@/components/motion/reveal'
import { Section } from '@/components/ui/section'

export function About({ title, body }: { title: string; body: string }) {
  return (
    <Section id="about" title={title} index="01">
      <Reveal>
        <p className="border-border bg-surface text-fg-dim border p-7 text-sm leading-[1.85]">
          <span aria-hidden="true" className="text-ac">
            &gt;&gt;{' '}
          </span>
          {body}
        </p>
      </Reveal>
    </Section>
  )
}
