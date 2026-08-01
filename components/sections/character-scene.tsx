'use client'

import { useMemo } from 'react'
import { DeskCharacter, type Persona } from '@lizdevs/desk-character'
import { facundo } from '@lizdevs/desk-character/personas'
import type { Content } from '@/content/types'

const THEME = {
  ink: 'var(--color-ac)',
  fill: 'var(--color-surface)',
  shade: 'var(--color-chip)',
  tint: 'var(--color-surface-2)',
  screen: 'var(--color-ac)',
  bg: 'transparent',
} as const

interface Props {
  character: Content['character']
  role: string
}

export const CharacterScene = ({ character, role }: Props) => {
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
      variant="desk"
      dock={false}
      gazeSelector="main section[id]"
    />
  )
}
