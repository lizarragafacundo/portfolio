import { cn } from '@/lib/cn'

/** Bordered chip used for tech stacks, tools and certifications. */
export function Tag({
  children,
  variant = 'accent',
  className,
}: {
  children: React.ReactNode
  variant?: 'accent' | 'muted'
  className?: string
}) {
  return (
    <span
      className={cn(
        'border-border border px-2 py-0.5 text-[11px] leading-5',
        variant === 'accent' ? 'text-ac bg-chip' : 'text-fg-mute',
        className,
      )}
    >
      {children}
    </span>
  )
}
