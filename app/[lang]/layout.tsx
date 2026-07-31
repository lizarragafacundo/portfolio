import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { MotionProvider } from '@/components/motion/motion-provider'
import { getContent } from '@/content'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'
import '@lizdevs/desk-character/styles.css'
import '../globals.css'

/**
 * This is the root layout. There is deliberately no `app/layout.tsx`: putting
 * <html> here is the only way to emit a correct `lang` attribute per locale,
 * and `/` is redirected to `/en` in next.config.ts instead.
 */

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

/**
 * The box-drawing half of the typeface, self-hosted.
 *
 * Google Fonts' `latin` subset stops at U+2BA-ish and does not ship the box
 * drawing (U+2500–257F) or block elements (U+2580–259F) that this entire site
 * is drawn with. Those characters were therefore falling through to Next's
 * generated fallback — `local(Arial)` at `size-adjust: 134.59%` — which is
 * proportional, so `█` and a space had different advance widths and every
 * piece of ASCII art sheared apart column by column.
 *
 * This is the same JetBrains Mono, subsetted with `pyftsubset` to only the
 * ranges we actually draw with (see assets/fonts/README.md). Two weights,
 * 3.6 KB each, and every glyph keeps the 600/1000em advance of the Google
 * subset, so the two fonts interleave on one line without drifting.
 *
 * It is listed *first* in `--font-mono`: per-character fallback means the
 * browser takes box glyphs from here and everything else from the family
 * below. `adjustFontFallback: false` is load-bearing — the default would
 * insert an Arial-backed family into the stack and swallow every character
 * before the real font ever got a chance.
 */
const jetbrainsMonoBox = localFont({
  src: [
    { path: '../../assets/fonts/JetBrainsMono-Box-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/JetBrainsMono-Box-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-jetbrains-mono-box',
  // Not 'swap': swapping means painting mangled art first and fixing it later.
  // The file is preloaded and tiny, so the block period is imperceptible.
  display: 'block',
  adjustFontFallback: false,
})

/** Prerenders /en and /es at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

/** Any other segment 404s at build time rather than being rendered on demand. */
export const dynamicParams = false

export const viewport: Viewport = {
  themeColor: '#0b0d10',
  colorScheme: 'dark',
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  const content = getContent(lang)

  return {
    metadataBase: new URL(site.url),
    title: content.meta.title,
    description: content.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.linkedin }],
    creator: site.name,
    keywords: [
      'full-stack engineer',
      'TypeScript',
      'Node.js',
      'AWS',
      'Next.js',
      'AI engineer',
      'Buenos Aires',
      site.name,
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        es: '/es',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'profile',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      alternateLocale: lang === 'es' ? 'en_US' : 'es_AR',
      url: `/${lang}`,
      siteName: site.name,
      title: content.meta.title,
      description: content.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta.title,
      description: content.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html
      lang={lang}
      className={`${jetbrainsMonoBox.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Motion serialises `initial={{ opacity: 0 }}` into the prerendered
          HTML. Without JS nothing would ever animate it back in, so the page
          would read as blank. This restores it for those readers — and for any
          crawler that renders CSS but not JS.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg text-fg font-mono antialiased">
        <MotionProvider>{children}</MotionProvider>
        <PersonJsonLd locale={lang} />
      </body>
    </html>
  )
}

/** Structured data, so search engines read the ASCII page as a person. */
function PersonJsonLd({ locale }: { locale: Locale }) {
  const content = getContent(locale)

  const json = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: content.hero.role,
    description: content.about,
    email: `mailto:${site.email}`,
    url: `${site.url}/${locale}`,
    sameAs: [site.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    knowsLanguage: ['es', 'en'],
    knowsAbout: content.skills.flatMap((group) => group.items),
  }

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
