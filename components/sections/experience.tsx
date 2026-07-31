import { Reveal } from '@/components/motion/reveal'
import { Section } from '@/components/ui/section'
import { Tag } from '@/components/ui/tag'
import type { Job } from '@/content/types'

export function Experience({ title, jobs }: { title: string; jobs: readonly Job[] }) {
  return (
    <Section id="experience" title={title} index="02">
      <div className="flex flex-col gap-4">
        {jobs.map((job, index) => (
          <Reveal key={job.company} delay={index * 0.05}>
            <JobCard job={job} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="border-border bg-surface border px-6 py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-fg text-base font-bold">
          <span aria-hidden="true" className="text-ac font-normal">
            ╔═══{' '}
          </span>
          {job.company}
        </h3>
        <p className="text-fg-mute text-xs">{job.meta}</p>
      </div>

      <p className="text-fg-dim mt-1.5 mb-1 pl-[18px] text-sm">
        <span aria-hidden="true">║ </span>
        {job.role}
      </p>

      {job.sub ? <p className="text-fg-mute mb-2 pl-[18px] text-xs italic">{job.sub}</p> : null}

      {job.stats ? (
        <dl className="mt-3.5 mb-1.5 grid gap-2.5 pl-[18px] sm:grid-cols-3">
          {job.stats.map((stat) => (
            <div key={stat.label} className="border-border-soft bg-bg-deep border px-3 py-2.5">
              <dt className="text-ac-bright text-glow text-sm font-bold">{stat.value}</dt>
              <dd className="text-fg-mute mt-1 text-[11px] leading-snug">{stat.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <ul className="mt-2.5 flex list-none flex-col gap-[9px] pl-[18px]">
        {job.bullets.map((bullet) => (
          <li key={bullet} className="text-fg-dim relative pl-[18px] text-[13px] leading-[1.65]">
            <span aria-hidden="true" className="text-ac absolute left-0">
              ▸
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex list-none flex-wrap gap-[7px] pl-[18px]">
        {job.tags.map((tag) => (
          <li key={tag}>
            <Tag variant="muted" className="text-ac">
              {tag}
            </Tag>
          </li>
        ))}
      </ul>
    </article>
  )
}
