/**
 * The shape every locale must satisfy. `en.ts` and `es.ts` both declare
 * `satisfies Content`, so adding a field in one language without the other is
 * a compile error rather than a half-translated page in production.
 */

export interface NavLabels {
  about: string
  skills: string
  experience: string
  projects: string
  education: string
  contact: string
  resume: string
}

export interface Hero {
  role: string
  location: string
  stack: string
}

export interface SkillGroup {
  label: string
  items: readonly string[]
}

export interface JobStat {
  /** The headline figure, e.g. `~5,000`. */
  value: string
  /** What the figure measures. */
  label: string
}

export interface Job {
  company: string
  role: string
  /** Dates and location, rendered on the right of the card header. */
  meta: string
  /** Optional one-line description of the product. */
  sub?: string
  stats?: readonly JobStat[]
  bullets: readonly string[]
  tags: readonly string[]
}

export interface FeaturedProject {
  name: string
  /** Short qualifier shown next to the name, e.g. "solo · AI product". */
  kind: string
  description: string
  stack: readonly string[]
}

export interface SmallProject {
  title: string
  tag: string
  about: string
  /** Pre-joined stack line — these cards render it as a single string. */
  stack: string
}

export interface Education {
  school: string
  degree: string
  meta: string
  description: string
}

export interface Content {
  nav: NavLabels
  hero: Hero
  about: string
  skills: readonly SkillGroup[]
  experience: readonly Job[]
  posture: FeaturedProject
  marktboost: FeaturedProject
  smallProjects: readonly SmallProject[]
  education: readonly Education[]
  certificationsLabel: string
  certifications: readonly string[]
  contactMessage: string
  builtWith: string
  /** Metadata copy — never rendered in the body, only in <head>. */
  meta: {
    title: string
    description: string
  }
  a11y: {
    skipToContent: string
    languageSwitch: string
    primaryNav: string
  }
}
