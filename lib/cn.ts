type ClassValue = string | false | null | undefined

/**
 * Minimal class joiner. This site has no conditional style conflicts to
 * resolve, so `clsx` + `tailwind-merge` (~8 KB) would be dead weight.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
