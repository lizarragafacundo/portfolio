import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getContent } from '@/content'
import { isLocale, LOCALES } from '@/lib/i18n'
import { site } from '@/lib/site'

export const alt = 'Facundo Lizarraga — Senior Full-Stack Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The palette, repeated as literals.
 *
 * Satori renders this tree outside the browser: there is no stylesheet, no
 * cascade, and no custom properties, so `var(--color-ac)` resolves to nothing
 * and the text comes out black. These values must be kept in step with the
 * `@theme` block in `app/globals.css` by hand — hence one block rather than
 * eleven scattered string literals.
 */
const OG = {
  bg: '#f4f9fc',
  grid: 'rgba(96,0,203,0.07)',
  gridSoft: 'rgba(96,0,203,0.055)',
  ink: '#6000cb',
  text: '#0f1b61',
  mute: '#105d67',
  faint: '#5b8f99',
} as const

/** One card per locale, both rendered at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

/**
 * The font is vendored in `assets/fonts` rather than fetched from Google at
 * build time: Satori has no fallback font, so a network hiccup in CI would
 * otherwise fail the build.
 */
async function loadFont() {
  return readFile(join(process.cwd(), 'assets', 'fonts', 'JetBrainsMono-Bold.ttf'))
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const content = getContent(isLocale(lang) ? lang : 'en')
  const font = await loadFont()

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '72px 80px',
        backgroundColor: OG.bg,
        backgroundImage: `linear-gradient(90deg, ${OG.grid} 1px, transparent 1px), linear-gradient(180deg, ${OG.gridSoft} 1px, transparent 1px)`,
        backgroundSize: '46px 46px',
        fontFamily: 'JetBrains Mono',
        color: OG.text,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: OG.ink }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 46,
            height: 46,
            border: `2px solid ${OG.ink}`,
            fontSize: 22,
          }}
        >
          {site.initials}
        </div>
        {/* Single-string children throughout: Satori rejects any <div> with
              more than one child unless it declares an explicit display. */}
        <div style={{ fontSize: 24, opacity: 0.9 }}>{`${site.handle}_`}</div>
      </div>

      <div style={{ fontSize: 82, letterSpacing: -1, marginTop: 40, lineHeight: 1.05 }}>
        FACUNDO
      </div>
      <div style={{ fontSize: 82, letterSpacing: 14, color: OG.ink, lineHeight: 1.05 }}>
        LIZARRAGA
      </div>

      <div style={{ fontSize: 32, color: OG.ink, marginTop: 36 }}>{`> ${content.hero.role}`}</div>
      <div style={{ fontSize: 24, color: OG.mute, marginTop: 14 }}>{content.hero.location}</div>
      <div style={{ fontSize: 22, color: OG.faint, marginTop: 28 }}>{content.hero.stack}</div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'JetBrains Mono', data: font, style: 'normal', weight: 700 }],
    },
  )
}
