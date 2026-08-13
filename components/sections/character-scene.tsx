'use client'

import { useMemo } from 'react'
import { PortfolioCharacter, type Persona } from '@facundolizarraga/portfolio-characters'
import { facundo } from '@facundolizarraga/portfolio-characters/personas'
import { useCharacter } from '@/components/character/character-provider'
import type { Content } from '@/content/types'
import { inkOnPaper } from '@/components/character/ink-on-paper'

interface Props {
  character: Content['character']
  role: string
}

export const CharacterScene = ({ character, role }: Props) => {
  const { appearance } = useCharacter()

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
    <PortfolioCharacter
      persona={persona}
      {...appearance}
      theme={inkOnPaper}
      variant="desk"
      dock
      gazeSelector="main section[id]"
    />
  )
}
