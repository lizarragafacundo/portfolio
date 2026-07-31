'use client'

import { cn } from '@/lib/cn'
import { useCharacterTheme } from './character-theme'

interface Props {
  label: string
  matrixLabel: string
  lightLabel: string
}

/**
 * Two-state switch for the character's palette, styled to match the language
 * switcher immediately to its left — same border, same weight, same active
 * treatment — because they are the same kind of control and there is no reason
 * for the eye to have to learn two.
 *
 * Rendered as a single <button> with `aria-pressed` rather than two radio-ish
 * buttons: there are exactly two states and the label says which is on, so a
 * radio group would announce more than it explains.
 */
export function CharacterThemeToggle({ label, matrixLabel, lightLabel }: Props) {
  const { theme, toggle } = useCharacterTheme()
  const isMatrix = theme === 'matrix'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isMatrix}
      title={label}
      className="border-border flex border text-xs font-bold"
    >
      <span
        className={cn(
          'px-[11px] py-1.5 transition-colors',
          isMatrix ? 'bg-ac text-bg' : 'text-fg-mute',
        )}
      >
        {matrixLabel}
      </span>
      <span
        className={cn(
          'px-[11px] py-1.5 transition-colors',
          isMatrix ? 'text-fg-mute' : 'bg-ac text-bg',
        )}
      >
        {lightLabel}
      </span>
    </button>
  )
}
