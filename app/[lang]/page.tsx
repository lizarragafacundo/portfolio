import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteNav } from '@/components/layout/site-nav'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Education } from '@/components/sections/education'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { getContent } from '@/content'
import { isLocale, LOCALES } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = getContent(lang)

  return (
    <>
      <a
        href="#main"
        className="bg-ac text-bg focus:ring-fg sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:px-4 focus:py-2 focus:font-bold"
      >
        {content.a11y.skipToContent}
      </a>

      <SiteNav locale={lang} content={content} />

      <main id="main" className="relative z-2 mx-auto max-w-[1080px] px-6">
        <Hero hero={content.hero} character={content.character} />

        <About title={content.nav.about} body={content.about} />

        <Experience title={content.nav.experience} jobs={content.experience} />

        <Projects
          title={content.nav.projects}
          locale={lang}
          posture={content.posture}
          marktboost={content.marktboost}
          characterPackage={content.characterPackage}
          small={content.smallProjects}
        />

        <Education
          title={content.nav.education}
          entries={content.education}
          certificationsLabel={content.certificationsLabel}
          certifications={content.certifications}
        />

        <Skills title={content.nav.skills} groups={content.skills} />

        <Contact
          title={content.nav.contact}
          message={content.contactMessage}
          resumeLabel={content.nav.resume}
          locale={lang}
        />

        <SiteFooter builtWith={content.builtWith} />
      </main>
    </>
  )
}
