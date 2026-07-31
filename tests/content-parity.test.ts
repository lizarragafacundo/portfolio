import { describe, expect, it } from 'vitest'
import { en } from '@/content/en'
import { es } from '@/content/es'

/**
 * `satisfies Content` already guarantees both locales have the same *fields*.
 * What TypeScript cannot check is that they describe the same *facts*: adding
 * a job or a skill group to one language and forgetting the other compiles
 * fine and ships a page that quietly says less in Spanish.
 */

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

/** Every path in the tree, with arrays collapsed to `[]` and lengths recorded. */
function shape(value: Json, path = ''): string[] {
  if (Array.isArray(value)) {
    return [
      `${path}[] length=${value.length}`,
      ...value.flatMap((v, i) => shape(v, `${path}[${i}]`)),
    ]
  }

  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .flatMap((key) => shape(value[key] as Json, path ? `${path}.${key}` : key))
  }

  return [`${path}: ${typeof value}`]
}

describe('locale parity', () => {
  it('en and es describe the same structure, field for field', () => {
    expect(shape(es as unknown as Json)).toEqual(shape(en as unknown as Json))
  })

  it('lists the same companies in the same order', () => {
    expect(es.experience.map((job) => job.company)).toEqual(en.experience.map((job) => job.company))
  })

  /**
   * Not a deep equality check: a few entries are genuinely translated
   * ("autonomous agents" → "agentes autónomos"). Product names must not be.
   */
  it('lists the same number of technologies per skill group', () => {
    expect(es.skills.map((group) => group.items.length)).toEqual(
      en.skills.map((group) => group.items.length),
    )
  })

  it('never translates a product or vendor name', () => {
    const PROPER_NOUNS = ['TypeScript', 'Node.js', 'AWS Lambda', 'MongoDB', 'Stripe', 'Next.js']
    const esTechnologies = es.skills.flatMap((group) => group.items)

    for (const noun of PROPER_NOUNS) {
      expect(esTechnologies).toContain(noun)
    }
  })

  it('keeps the featured project stacks identical across locales', () => {
    expect(es.posture.stack).toEqual(en.posture.stack)
    expect(es.marktboost.stack).toEqual(en.marktboost.stack)
  })
})

describe('content hygiene', () => {
  const locales = { en, es }

  it.each(Object.entries(locales))('%s has no empty strings', (_name, content) => {
    const empties = shape(content as unknown as Json).filter((entry) => entry.endsWith('length=0'))
    expect(empties).toEqual([])
  })

  it.each(Object.entries(locales))(
    '%s avoids the phrasings the CV deliberately does not use',
    (_name, content) => {
      const text = JSON.stringify(content).toLowerCase()
      // Both claims overstate my role on team projects. Easy to reintroduce
      // while rewording a bullet, so the test guards them.
      expect(text).not.toContain('sole developer')
      expect(text).not.toContain('my funds')
    },
  )
})
