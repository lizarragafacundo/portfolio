import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { facundo } from '@facundolizarraga/portfolio-characters/personas'
import { describe, expect, it } from 'vitest'
import { en, es } from '@/content'

const COVERED: ReadonlyArray<readonly [number, number]> = [
  [0x0000, 0x02ff],
  [0x2000, 0x206f],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2212, 0x2212],
  [0x2215, 0x2215],
  [0x2190, 0x2193],
  [0x2500, 0x25ff],
]

const SOURCE_DIRS = ['app', 'components', 'content', 'lib']
const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.css']

function isCovered(codePoint: number) {
  return COVERED.some(([start, end]) => codePoint >= start && codePoint <= end)
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return SOURCE_EXTENSIONS.some((ext) => path.endsWith(ext)) ? [path] : []
  })
}

describe('glyph coverage', () => {
  const files = SOURCE_DIRS.flatMap((dir) => sourceFiles(join(process.cwd(), dir)))

  it('finds the source tree', () => {
    expect(files.length).toBeGreaterThan(10)
  })

  it('only uses characters the loaded font subsets carry', () => {
    const uncovered = new Map<string, Set<string>>()

    for (const file of files) {
      for (const char of readFileSync(file, 'utf8')) {
        const codePoint = char.codePointAt(0)
        if (codePoint === undefined || isCovered(codePoint)) continue

        const label = `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`
        const seen = uncovered.get(label) ?? new Set()
        seen.add(file.replace(process.cwd(), '').replace(/\\/g, '/'))
        uncovered.set(label, seen)
      }
    }

    const report = [...uncovered]
      .map(([label, seen]) => `${label} in ${[...seen].join(', ')}`)
      .sort()

    expect(report, 'no font on the page carries these — they will render in a fallback').toEqual([])
  })

  it('only uses covered characters in the desk character terminal', () => {
    const fromPackage = facundo.script.flatMap((frame) => [frame.prompt, ...frame.lines])
    const fromContent = [...en.character.whoami, ...es.character.whoami]
    const caret = '▋'

    const uncovered = new Set<string>()
    for (const text of [...fromPackage, ...fromContent, caret]) {
      for (const char of text) {
        const codePoint = char.codePointAt(0)
        if (codePoint === undefined || isCovered(codePoint)) continue
        uncovered.add(`U+${codePoint.toString(16).toUpperCase().padStart(4, '0')} (${char})`)
      }
    }

    expect([...uncovered].sort()).toEqual([])
  })
})
