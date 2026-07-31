import { AsciiArt } from '@/components/ui/ascii-art'
import { NAME_BANNER } from '@/content/ascii'
import type { Hero as HeroContent } from '@/content/types'
import { site } from '@/lib/site'

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative px-0 pt-[150px] pb-15 text-center">
      <span aria-hidden="true" className="text-ac absolute top-30 left-0 text-xs opacity-40">
        ╔═══
      </span>
      <span aria-hidden="true" className="text-ac absolute top-30 right-0 text-xs opacity-40">
        ═══╗
      </span>

      <div className="flex flex-col items-center gap-7">
        {/*
          The banner is art; the <h1> is the machine-readable name. Keeping
          them separate is what lets this page rank and be read aloud at all.
        */}
        <h1 className="sr-only">
          {site.name} — {hero.role}
        </h1>

        <AsciiArt
          art={NAME_BANNER}
          className="text-ac-bright text-glow text-[clamp(5px,1.55vw,15px)] leading-[1.05]"
        />

        <p
          aria-hidden="true"
          className="text-fg indent-[clamp(6px,2.4vw,22px)] text-[clamp(28px,6vw,58px)] font-extrabold tracking-[clamp(6px,2.4vw,22px)]"
        >
          LIZARRAGA
        </p>

        <div className="flex flex-col items-center gap-2">
          <p className="text-ac text-[clamp(15px,2.3vw,21px)] font-bold">&gt; {hero.role}</p>
          <p className="text-fg-mute text-[clamp(12px,1.7vw,15px)]">{hero.location}</p>
        </div>

        <p className="text-fg-mute max-w-[660px] text-[clamp(11px,1.5vw,14px)]">{hero.stack}</p>
      </div>
    </section>
  )
}
