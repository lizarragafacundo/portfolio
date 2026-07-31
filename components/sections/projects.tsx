import { PipelineDemo } from '@/components/demos/pipeline-demo'
import { PostureDemo } from '@/components/demos/posture-demo'
import { Reveal } from '@/components/motion/reveal'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Section } from '@/components/ui/section'
import { Tag } from '@/components/ui/tag'
import type { FeaturedProject, SmallProject } from '@/content/types'

interface ProjectsProps {
  title: string
  posture: FeaturedProject
  marktboost: FeaturedProject
  small: readonly SmallProject[]
}

export function Projects({ title, posture, marktboost, small }: ProjectsProps) {
  return (
    <Section id="projects" title={title} index="03">
      <Reveal>
        <Featured project={posture} demo={<PostureDemo />} />
      </Reveal>

      <Reveal>
        <Featured project={marktboost} demo={<PipelineDemo />} demoFirst />
      </Reveal>

      <Stagger className="grid gap-4 sm:grid-cols-2">
        {small.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <SmallCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/**
 * A featured project: prose on one side, its live demo on the other.
 * `demoFirst` alternates the two so consecutive cards do not look identical.
 */
function Featured({
  project,
  demo,
  demoFirst = false,
}: {
  project: FeaturedProject
  demo: React.ReactNode
  demoFirst?: boolean
}) {
  const info = (
    <div className="border-border border-b p-7 md:border-b-0 md:[&:not(:last-child)]:border-r">
      <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
        <h3 className="text-ac-bright text-glow text-[22px] font-extrabold">{project.name}</h3>
        <Tag variant="muted">{project.kind}</Tag>
      </div>

      <p className="text-fg-dim mb-4.5 text-[13px] leading-[1.75]">{project.description}</p>

      <ul className="flex list-none flex-wrap gap-[7px]">
        {project.stack.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    </div>
  )

  const panel = <div className="bg-bg-deep border-border border-b p-5.5 md:border-b-0">{demo}</div>

  return (
    <article className="border-border bg-surface mb-5 border">
      <div className="grid md:grid-cols-2">
        {demoFirst ? (
          <>
            <div className="md:border-border md:border-r">{panel}</div>
            {info}
          </>
        ) : (
          <>
            <div className="md:border-border md:border-r">{info}</div>
            {panel}
          </>
        )}
      </div>
    </article>
  )
}

function SmallCard({ project }: { project: SmallProject }) {
  return (
    <article className="border-border bg-surface flex h-full flex-col border p-5.5">
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <h3 className="text-fg text-[15px] font-bold">{project.title}</h3>
        <Tag variant="muted" className="whitespace-nowrap">
          {project.tag}
        </Tag>
      </div>

      <p className="text-fg-dim mb-4 flex-1 text-[12.5px] leading-[1.7]">{project.about}</p>

      <p className="border-border text-fg-mute border-t border-dashed pt-2.5 text-[11px]">
        {project.stack}
      </p>
    </article>
  )
}
