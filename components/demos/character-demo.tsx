'use client'

import { CharacterPortrait } from '@facundolizarraga/portfolio-characters'
import { useCharacter } from '@/components/character/character-provider'
import { inkOnPaper } from '@/components/character/ink-on-paper'

interface Props {
  randomLabel: string
  resetLabel: string
  caption: string
}

export function CharacterDemo({ randomLabel, resetLabel, caption }: Props) {
  const { appearance, isSelf, randomize, reset } = useCharacter()

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border bg-surface mx-auto w-full max-w-[220px] border">
        <CharacterPortrait crop="bust" {...appearance} theme={inkOnPaper} animate={false} />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={randomize}
          className="border-ac text-ac hover:bg-ac hover:text-surface border px-3.5 py-2 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors"
        >
          {randomLabel}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={isSelf}
          className="border-border text-fg-mute enabled:hover:border-ac enabled:hover:text-ac border px-3.5 py-2 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors disabled:opacity-40"
        >
          {resetLabel}
        </button>
      </div>

      <p className="text-fg-mute text-center text-[11px] leading-[1.6]">{caption}</p>
    </div>
  )
}
