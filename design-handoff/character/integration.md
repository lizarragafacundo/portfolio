# How the character is wired in

Reference only — copied from the repo. Not a build file.

## `components/sections/character-scene.tsx`

```tsx
'use client'

import { useMemo } from 'react'
import { PortfolioCharacter, type Persona } from '@facundolizarraga/portfolio-characters'
import { facundo } from '@facundolizarraga/portfolio-characters/personas'

// The six colour roles, handed straight through from the site's design tokens.
const THEME = {
  ink: 'var(--color-ac)',
  fill: 'var(--color-surface)',
  shade: 'var(--color-chip)',
  tint: 'var(--color-surface-2)',
  screen: 'var(--color-ac)',
  bg: 'transparent',
} as const

export const CharacterScene = ({ character, role }: Props) => {
  // Only the first terminal frame ($ whoami) is localised; the rest of the
  // script is the package default.
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
      theme={THEME}
      variant="desk" // no full-viewport hero wrapper; it fills its slot
      dock // shrink to the bottom-right corner on scroll
      gazeSelector="main section[id]" // eyes follow whichever section is in view
    />
  )
}
```

## The slot it lives in — `components/sections/hero.tsx`

```tsx
<div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
  <div>{/* ASCII name banner, role, location, stack line */}</div>

  <div className="mx-auto hidden w-full max-w-[620px] sm:block">
    <CharacterScene character={character} role={hero.role} />
  </div>
</div>
```

Two things that matter for layout:

- The character column is `hidden sm:block` — below 640px it is not rendered at
  all, and the hero collapses to a single centred text column.
- At `lg` and up the character column is the wider one (`1.2fr` vs `1fr`).

## Props actually in use

| Prop           | Value                | Effect                                                       |
| -------------- | -------------------- | ------------------------------------------------------------ |
| `variant`      | `"desk"`             | Fills its container at 858×476. No `min-height: 100vh` hero. |
| `dock`         | `true`               | Docks to the corner past 92% hero scroll, returns below 55%. |
| `gazeSelector` | `"main section[id]"` | Eyes track the section currently in view.                    |
| `theme`        | six CSS var refs     | See `palette.css`.                                           |
| `ambient`      | default `true`       | Clouds, mug steam, swaying plant, blinking caret.            |
| `terminal`     | default `true`       | The scripted laptop terminal — see `persona.json`.           |
| `dockMotion`   | default `"Cascada"`  | How the pieces travel to the corner.                         |
