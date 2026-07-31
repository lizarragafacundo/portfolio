import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getContent } from '@/content'
import { isLocale, LOCALES } from '@/lib/i18n'
import { site } from '@/lib/site'

export const alt = 'Facundo Lizarraga — Senior Full-Stack Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
        backgroundColor: '#0b0e11',
        backgroundImage:
          'linear-gradient(90deg, rgba(52,211,153,0.07) 1px, transparent 1px), linear-gradient(180deg, rgba(52,211,153,0.055) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
        fontFamily: 'JetBrains Mono',
        color: '#f1f3f4',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#34d399' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 46,
            height: 46,
            border: '2px solid #34d399',
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
      <div style={{ fontSize: 82, letterSpacing: 14, color: '#34d399', lineHeight: 1.05 }}>
        LIZARRAGA
      </div>

      <div
        style={{ fontSize: 32, color: '#34d399', marginTop: 36 }}
      >{`> ${content.hero.role}`}</div>
      <div style={{ fontSize: 24, color: '#94a3a0', marginTop: 14 }}>{content.hero.location}</div>
      <div style={{ fontSize: 22, color: '#6b7a78', marginTop: 28 }}>{content.hero.stack}</div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'JetBrains Mono', data: font, style: 'normal', weight: 700 }],
    },
  )
}
