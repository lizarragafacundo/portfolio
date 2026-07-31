import Link from 'next/link'
import { CharacterThemeToggle } from '@/components/character/character-theme-toggle'
import type { Content } from '@/content/types'
import { cn } from '@/lib/cn'
import { type Locale, resumeHref } from '@/lib/i18n'
import { site } from '@/lib/site'

/**
 * Fixed header, server-rendered apart from the character palette switch. The
 * language switch is a real <Link> to the other locale's static page, not a
 * client-side toggle, so it costs zero JS and gives each language a shareable
 * URL — which is also why it is not merged with the palette switch next to it,
 * despite them looking the same.
 */
export function SiteNav({ locale, content }: { locale: Locale; content: Content }) {
  const links = [
    { href: '#about', label: content.nav.about },
    { href: '#experience', label: content.nav.experience },
    { href: '#projects', label: content.nav.projects },
    { href: '#education', label: content.nav.education },
    { href: '#skills', label: content.nav.skills },
    { href: '#contact', label: content.nav.contact },
  ]

  return (
    <header className="border-border bg-bg/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-[10px]">
      <nav
        aria-label={content.a11y.primaryNav}
        className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3.5"
      >
        <Link
          href={`/${locale}`}
          className="text-fg flex items-center gap-2.5 text-[15px] font-extrabold tracking-[1px]"
        >
          <span
            aria-hidden="true"
            className="border-ac text-ac inline-flex size-[30px] items-center justify-center border"
          >
            {site.initials}
          </span>
          <span className="opacity-85">{site.handle}</span>
          <span aria-hidden="true" className="caret" />
        </Link>

        <div className="flex-1" />

        <ul className="hidden flex-wrap gap-5 text-[13px] tracking-[0.5px] md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-ac hover:text-fg transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          role="group"
          aria-label={content.a11y.languageSwitch}
          className="border-border flex border text-xs font-bold"
        >
          <LangLink target="en" current={locale} />
          <LangLink target="es" current={locale} />
        </div>

        {/*
          The one client component in this header. It is a sibling of the
          language switch and styled identically, because they are the same kind
          of control — a two-state switch — and the eye should not have to learn
          two vocabularies for that.
        */}
        <CharacterThemeToggle
          label={content.character.themeSwitch}
          matrixLabel={content.character.themeMatrix}
          lightLabel={content.character.themeLight}
        />

        <a
          href={resumeHref(locale)}
          target="_blank"
          rel="noopener"
          className="border-ac text-ac hover:bg-ac hover:text-bg border px-3.5 py-[7px] text-xs font-bold tracking-[0.5px] transition-colors"
        >
          ↓ {content.nav.resume}
        </a>
      </nav>
    </header>
  )
}

function LangLink({ target, current }: { target: Locale; current: Locale }) {
  const isActive = target === current

  return (
    <Link
      href={`/${target}`}
      hrefLang={target}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'px-[11px] py-1.5 transition-colors',
        isActive ? 'bg-ac text-bg' : 'text-fg-mute hover:text-fg',
      )}
    >
      {target.toUpperCase()}
    </Link>
  )
}
