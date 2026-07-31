/** Single source of truth for identity and links used across metadata and UI. */
export const site = {
  name: 'Facundo Lizarraga',
  handle: 'faculizarraga',
  initials: 'FL',
  email: 'faculizarraga0@gmail.com',
  linkedin: 'https://linkedin.com/in/facundolizarraga',
  location: 'Buenos Aires, Argentina',
  /**
   * Vercel injects VERCEL_PROJECT_PRODUCTION_URL on every deploy, so previews
   * and production both resolve absolute URLs without a hardcoded domain.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
} as const

export const SECTION_IDS = [
  'about',
  'experience',
  'projects',
  'education',
  'skills',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]
