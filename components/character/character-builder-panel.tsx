'use client'

import { CharacterBuilder } from '@facundolizarraga/portfolio-characters/builder'
import '@facundolizarraga/portfolio-characters/builder.css'
import { inkOnPaper } from '@/components/character/ink-on-paper'

export function CharacterBuilderPanel() {
  return <CharacterBuilder theme={inkOnPaper} />
}
