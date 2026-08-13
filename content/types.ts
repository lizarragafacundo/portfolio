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
  value: string
  label: string
}

export interface Job {
  company: string
  role: string
  meta: string
  sub?: string
  stats?: readonly JobStat[]
  bullets: readonly string[]
  tags: readonly string[]
}

export interface FeaturedProject {
  name: string
  kind: string
  description: string
  stack: readonly string[]
}

export interface PackageProject extends FeaturedProject {
  install: string
  repoUrl: string
  builderLabel: string
  randomLabel: string
  resetLabel: string
  demoCaption: string
}

export interface SmallProject {
  title: string
  tag: string
  about: string
  stack: string
}

export interface Education {
  school: string
  degree: string
  meta: string
  description: string
}

export interface Character {
  whoami: readonly [string, string, string]
}

export interface Content {
  nav: NavLabels
  hero: Hero
  character: Character
  about: string
  skills: readonly SkillGroup[]
  experience: readonly Job[]
  posture: FeaturedProject
  marktboost: FeaturedProject
  characterPackage: PackageProject
  smallProjects: readonly SmallProject[]
  education: readonly Education[]
  certificationsLabel: string
  certifications: readonly string[]
  contactMessage: string
  builtWith: string
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
