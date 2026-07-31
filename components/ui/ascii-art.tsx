import { cn } from '@/lib/cn'

/**
 * Renders ASCII art as pure decoration.
 *
 * Always `aria-hidden`: a screen reader announcing "block block block" for the
 * FACUNDO banner is noise. Callers pair this with real, visually hidden text.
 */
export function AsciiArt({ art, className }: { art: string; className?: string }) {
  return (
    <pre aria-hidden="true" className={cn('overflow-hidden select-none', className)}>
      {art}
    </pre>
  )
}
