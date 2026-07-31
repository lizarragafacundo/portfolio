'use client'

import { useMemo } from 'react'
import { DeskCharacter, THEMES, type Persona } from '@lizdevs/desk-character'
import { facundo } from '@lizdevs/desk-character/personas'
import { useCharacterTheme } from '@/components/character/character-theme'
import type { Content } from '@/content/types'

/**
 * The `matrix` preset built out of this site's own OKLCH tokens rather than the
 * package's hardcoded approximations of them.
 *
 * This is the point of the whole theming layer: the character is drawn in
 * `--color-ac`, the exact green every other accent on the page uses, so it reads
 * as part of the design rather than as an illustration that was dropped into it.
 * If the palette in globals.css changes, the character follows automatically.
 */
const MATRIX = {
  ink: 'var(--color-ac)',
  fill: 'var(--color-surface)',
  shade: 'var(--color-chip)',
  tint: 'var(--color-surface-2)',
  screen: 'var(--color-ac-bright)',
  bg: 'transparent',
} as const

interface Props {
  character: Content['character']
  /** The localised job title, from `content.hero.role`. */
  role: string
}

export function CharacterScene({ character, role }: Props) {
  const { theme } = useCharacterTheme()

  /**
   * Only the `whoami` frame is localised. The other six print tool names —
   * `terraform`, `eventbridge`, `qdrant` — which are the same word in every
   * language, and translating them would be inventing Spanish that nobody
   * writes. Keeping the split here rather than duplicating the whole script in
   * both locale files means a new command is added in one place.
   */
  const persona = useMemo<Persona>(() => {
    const [whoami, ...rest] = facundo.script
    if (!whoami) return facundo
    return {
      ...facundo,
      role,
      script: [{ ...whoami, lines: [...character.whoami] }, ...rest],
    }
  }, [character, role])

  return (
    <DeskCharacter
      persona={persona}
      theme={theme === 'matrix' ? MATRIX : THEMES.light}
      dockMotion="Cascada"
      className="relative z-1"
    />
  )
}
