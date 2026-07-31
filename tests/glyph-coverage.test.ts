import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * The site is drawn in box-drawing characters, and the fonts that render them
 * are subsets. A character outside those subsets does not fail loudly — it
 * silently falls through to a proportional system font, and because the art
 * is column-aligned, one stray glyph shears a whole panel apart. That is a
 * visual bug no type checker and no DOM assertion will ever catch.
 *
 * So the ranges are asserted here instead. If you add art using a glyph the
 * fonts do not carry, this fails and tells you to widen the subset (see
 * assets/fonts/README.md) rather than shipping broken output.
 */

/** Inclusive `[start, end]` codepoint ranges the loaded fonts actually cover. */
const COVERED: ReadonlyArray<readonly [number, number]> = [
  // JetBrains Mono via next/font/google — latin + latin-ext.
  [0x0000, 0x02ff],
  // …plus the pieces of General Punctuation its subsets declare.
  [0x2000, 0x206f],
  [0x20ac, 0x20ac], // euro
  [0x2122, 0x2122], // trademark
  [0x2212, 0x2212], // minus
  [0x2215, 0x2215], // division slash
  // assets/fonts/JetBrainsMono-Box-*.woff2 — kept in sync with the pyftsubset
  // --unicodes argument documented in assets/fonts/README.md.
  [0x2190, 0x2193], // arrows
  [0x2500, 0x25ff], // box drawing, block elements, geometric shapes
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
})
