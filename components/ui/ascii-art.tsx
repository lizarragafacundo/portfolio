import { cn } from '@/lib/cn'

export function AsciiArt({ art, className }: { art: string; className?: string }) {
  return (
    <pre aria-hidden="true" className={cn('overflow-hidden select-none', className)}>
      {art}
    </pre>
  )
}
