export const LOCALES = ['en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** The locale to switch *to* — the site only has two, so this is a toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en'
}

/** Path to the CV matching the current locale. */
export function resumeHref(locale: Locale): string {
  return locale === 'es' ? '/cv/Facundo-Lizarraga-ES.pdf' : '/cv/Facundo-Lizarraga-EN.pdf'
}
