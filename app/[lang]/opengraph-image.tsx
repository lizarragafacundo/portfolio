import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getContent } from '@/content'
import { isLocale, LOCALES } from '@/lib/i18n'
import { site } from '@/lib/site'

export const alt = 'Facundo Lizarraga — Senior Full-Stack Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const OG = {
  bg: '#e9e7df',
  grid: 'rgba(36,77,115,0.06)',
  gridSoft: 'rgba(36,77,115,0.05)',
  ink: '#244d73',
  text: '#20242b',
  mute: '#626a74',
  faint: '#7f858b',
} as const

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

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
