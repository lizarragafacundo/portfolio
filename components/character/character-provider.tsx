'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  randomAppearance,
  resolveAppearance,
  type Appearance,
  type ResolvedAppearance,
} from '@facundolizarraga/portfolio-characters'
import { facundo } from '@facundolizarraga/portfolio-characters/personas'

const SELF: ResolvedAppearance = resolveAppearance(facundo.appearance)

interface CharacterContextValue {
  appearance: Appearance
  isSelf: boolean
  randomize: () => void
  reset: () => void
}

const CharacterContext = createContext<CharacterContextValue | null>(null)

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<ResolvedAppearance>(SELF)

  const randomize = useCallback(() => setAppearance(randomAppearance()), [])
  const reset = useCallback(() => setAppearance(SELF), [])

  const value = useMemo<CharacterContextValue>(
    () => ({ appearance, isSelf: appearance === SELF, randomize, reset }),
    [appearance, randomize, reset],
  )

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>
}

export function useCharacter(): CharacterContextValue {
  return (
    useContext(CharacterContext) ?? {
      appearance: SELF,
      isSelf: true,
      randomize: () => {},
      reset: () => {},
    }
  )
}
