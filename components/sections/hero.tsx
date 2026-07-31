import { CharacterScene } from '@/components/sections/character-scene'
import { AsciiArt } from '@/components/ui/ascii-art'
import { NAME_BANNER } from '@/content/ascii'
import type { Character, Hero as HeroContent } from '@/content/types'
import { site } from '@/lib/site'

interface Props {
  hero: HeroContent
  character: Character
}

/**
 * Two columns: who this is on the left, the character at their desk on the right.
 *
 * The split is `1.05fr / 1fr` rather than an even half. The banner is ASCII art
 * at a fixed character grid, so its width is set by the type size and cannot
 * reflow — give the columns equal space and the banner either shrinks to
 * illegible or overflows. Letting the text column take slightly more means the
 * banner sets the type size and the drawing takes what is left, which is the
 * order that keeps both readable.
 *
 * It collapses to one column below `lg`. Stacked, the character goes *under*
 * the text: it is decoration, and on a phone the first screen should be the
 * name and the role, not an illustration the reader has to scroll past.
 */
export function Hero({ hero, character }: Props) {
  return (
    <section className="relative px-0 pt-[124px] pb-16">
      <span aria-hidden="true" className="text-ac absolute top-24 left-0 text-xs opacity-40">
        ╔═══
      </span>
      <span aria-hidden="true" className="text-ac absolute top-24 right-0 text-xs opacity-40">
        ═══╗
      </span>

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          {/*
            The banner is art; the <h1> is the machine-readable name. Keeping
            them separate is what lets this page rank and be read aloud at all.
          */}
          <h1 className="sr-only">
            {site.name} — {hero.role}
          </h1>

          <AsciiArt
            art={NAME_BANNER}
            className="text-ac text-[clamp(4px,1.15vw,11px)] leading-[1.05]"
          />

          <p
            aria-hidden="true"
            className="text-fg indent-[clamp(5px,1.8vw,16px)] text-[clamp(26px,4.4vw,46px)] font-extrabold tracking-[clamp(5px,1.8vw,16px)]"
          >
            LIZARRAGA
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-ac text-[clamp(15px,2vw,20px)] font-bold">&gt; {hero.role}</p>
            <p className="text-fg-mute text-[clamp(12px,1.5vw,15px)]">{hero.location}</p>
          </div>

          <p className="text-fg-mute max-w-[560px] text-[clamp(11px,1.4vw,14px)]">{hero.stack}</p>
        </div>

        {/*
          `order-first` is never wanted here, but the column does need a floor:
          below ~360px of width the terminal on the laptop drops under 9px and
          stops being type. Hiding it under `sm` costs nothing — it is
          decoration — and is honest about the one size it cannot serve.
        */}
        <div className="mx-auto hidden w-full max-w-[520px] sm:block">
          <CharacterScene character={character} role={hero.role} />
        </div>
      </div>
    </section>
  )
}
