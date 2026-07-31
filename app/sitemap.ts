import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/i18n'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return LOCALES.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${site.url}/${l}`])),
    },
  }))
}
