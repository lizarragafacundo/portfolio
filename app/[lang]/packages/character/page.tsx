import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CharacterBuilderPanel } from '@/components/character/character-builder-panel'
import { getContent } from '@/content'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export const dynamicParams = false

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  const { characterPackage } = getContent(lang)
  const path = `/${lang}/packages/character`

  return {
    title: `${characterPackage.name} — ${site.name}`,
    description: characterPackage.description,
    alternates: {
      canonical: `${site.url}${path}`,
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, `${site.url}/${locale}/packages/character`]),
      ),
    },
  }
}

export default async function CharacterPackagePage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const locale: Locale = lang
  const content = getContent(locale)
  const { characterPackage } = content

  return (
    <main className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-7">
      <header className="border-border mb-8 border-b pb-6">
        <Link
          href={`/${locale}#projects`}
          className="text-fg-mute hover:text-ac mb-3 inline-block text-[11px] font-bold tracking-[0.14em] uppercase"
        >
          ← {content.nav.projects}
        </Link>

        <h1 className="text-ac-bright text-glow mb-3 text-[clamp(22px,3.4vw,34px)] font-extrabold">
          {characterPackage.name}
        </h1>

        <p className="text-fg-dim max-w-[70ch] text-[13px] leading-[1.75]">
          {characterPackage.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <code className="text-fg-mute text-[11px]">{characterPackage.install}</code>
          <a
            href={characterPackage.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-ac hover:text-ac-bright text-[11px] font-bold tracking-[0.08em] uppercase"
          >
            GitHub →
          </a>
        </div>
      </header>

      <CharacterBuilderPanel />
    </main>
  )
}
