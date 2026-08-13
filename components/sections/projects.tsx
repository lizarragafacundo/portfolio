import Link from 'next/link'
import { CharacterDemo } from '@/components/demos/character-demo'
import { PipelineDemo } from '@/components/demos/pipeline-demo'
import { PostureDemo } from '@/components/demos/posture-demo'
import { Reveal } from '@/components/motion/reveal'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Section } from '@/components/ui/section'
import { Tag } from '@/components/ui/tag'
import type { FeaturedProject, PackageProject, SmallProject } from '@/content/types'
import { packagesHref, type Locale } from '@/lib/i18n'

interface ProjectsProps {
  title: string
  locale: Locale
  posture: FeaturedProject
  marktboost: FeaturedProject
  characterPackage: PackageProject
  small: readonly SmallProject[]
}

export function Projects({
  title,
  locale,
  posture,
  marktboost,
  characterPackage,
  small,
}: ProjectsProps) {
  return (
    <Section id="projects" title={title} index="03">
      <Reveal>
        <Featured project={posture} demo={<PostureDemo />} />
      </Reveal>

      <Reveal>
        <Featured project={marktboost} demo={<PipelineDemo />} demoFirst />
      </Reveal>

      <Reveal>
        <Featured
          project={characterPackage}
          demo={
            <CharacterDemo
              randomLabel={characterPackage.randomLabel}
              resetLabel={characterPackage.resetLabel}
              caption={characterPackage.demoCaption}
            />
          }
          footer={
            <div className="border-border mt-4.5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dashed pt-3.5">
              <code className="text-fg-mute text-[11px]">{characterPackage.install}</code>
              <Link
                href={packagesHref(locale, 'character')}
                className="text-ac hover:text-ac-bright text-[11px] font-bold tracking-[0.08em] uppercase"
              >
                {characterPackage.builderLabel} →
              </Link>
              <a
                href={characterPackage.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-fg-mute hover:text-ac text-[11px] font-bold tracking-[0.08em] uppercase"
              >
                GitHub →
              </a>
            </div>
          }
        />
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

function Featured({
  project,
  demo,
  demoFirst = false,
  footer,
}: {
  project: FeaturedProject
  demo: React.ReactNode
  demoFirst?: boolean
  footer?: React.ReactNode
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

      {footer}
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
