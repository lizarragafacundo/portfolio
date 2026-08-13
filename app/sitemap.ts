import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/i18n'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

const PACKAGE_SLUGS = ['character'] as const

const entry = (
  path: string,
  priority: number,
  lastModified: Date,
): MetadataRoute.Sitemap[number] => ({
  url: `${site.url}${path}`,
  lastModified,
  changeFrequency: 'monthly',
  priority,
})

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const home = LOCALES.map((locale) => ({
    ...entry(`/${locale}`, locale === 'en' ? 1 : 0.9, lastModified),
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${site.url}/${l}`])),
    },
  }))

  const packages = LOCALES.flatMap((locale) =>
    PACKAGE_SLUGS.map((slug) =>
      entry(`/${locale}/packages/${slug}`, locale === 'en' ? 0.7 : 0.6, lastModified),
    ),
  )

  return [...home, ...packages]
}
