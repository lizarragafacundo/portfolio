'use client'

import { useMemo } from 'react'
import { DeskCharacter, type Persona } from '@lizdevs/desk-character'
import { facundo } from '@lizdevs/desk-character/personas'
import type { Content } from '@/content/types'

/**
 * The character's palette, built from this site's own tokens rather than the
 * package's presets.
 *
 * This is the point of the theming layer: the drawing is stroked in
 * `--color-ac`, the exact violet every border and bracket on the page uses, so
 * it reads as part of the design rather than as an illustration dropped into
 * it. Change the palette in globals.css and the character follows.
 *
 * `screen` is the deep teal (`--color-ac-alt`), not the violet. The terminal is
 * the densest type in the drawing — six words at about 9px — and violet at that
 * size on a cyan screen vibrates. The same reason body copy on this page is
 * navy rather than the accent.
 */
const THEME = {
  ink: 'var(--color-ac)',
  fill: 'var(--color-surface)',
  shade: 'var(--color-chip)',
  tint: 'var(--color-border-soft)',
  screen: 'var(--color-ac-alt)',
  bg: 'transparent',
} as const

interface Props {
  character: Content['character']
  /** The localised job title, from `content.hero.role`. */
  role: string
}

export function CharacterScene({ character, role }: Props) {
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
      theme={THEME}
      variant="portrait"
      /*
        No docking. The character lives in the hero's right column now, and a
        drawing that leaps out of a two-column layout to pin itself to the
        corner reads as a bug rather than as a flourish.
      */
      dock={false}
      /*
        Instead it glances at whichever section has scrolled into view. The
        selector matches the six numbered <section>s that `Section` renders.
      */
      gazeSelector="main section[id]"
    />
  )
}
