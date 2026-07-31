import { AsciiArt } from '@/components/ui/ascii-art'
import { FOOTER_BOX } from '@/content/ascii'
import { site } from '@/lib/site'

export function SiteFooter({ builtWith }: { builtWith: string }) {
  return (
    <footer className="border-border border-t pt-7 pb-11 text-center">
      <AsciiArt art={FOOTER_BOX} className="text-ac-dim mb-2.5 inline-block text-[11px]" />
      <p className="text-fg-faint text-[11px]">
        © {new Date().getFullYear()} {site.name} · {builtWith}
      </p>
    </footer>
  )
}
