import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { MotionProvider } from '@/components/motion/motion-provider'
import { getContent } from '@/content'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'
import { CharacterProvider } from '@/components/character/character-provider'
import '@facundolizarraga/portfolio-characters/styles.css'
import '../globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const jetbrainsMonoBox = localFont({
  src: [
    { path: '../../assets/fonts/JetBrainsMono-Box-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/JetBrainsMono-Box-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-jetbrains-mono-box',
  display: 'block',
  adjustFontFallback: false,
})

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export const dynamicParams = false

export const viewport: Viewport = {
  themeColor: '#e9e7df',
  colorScheme: 'light',
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
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg text-fg selection:bg-ac selection:text-bg font-mono antialiased">
        <MotionProvider>
          <CharacterProvider>{children}</CharacterProvider>
        </MotionProvider>
        <PersonJsonLd locale={lang} />
      </body>
    </html>
  )
}

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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  )
}
