'use client'

import { useCallback, useSyncExternalStore } from 'react'
import type { ThemeName } from '@lizdevs/desk-character'

const STORAGE_KEY = 'dc-theme'
const DEFAULT: ThemeName = 'matrix'

/**
 * Which palette the desk character is drawn in.
 *
 * `localStorage` is an external store, so it is read through
 * `useSyncExternalStore` rather than an effect. That is not a style preference:
 * the hook renders `getServerSnapshot()` during SSR *and* during hydration, then
 * switches to the real value — which is exactly the sequence needed to avoid a
 * mismatch. Reading storage in an effect and calling `setState` gets to the same
 * pixels via a cascading render, and reading it during render does not work at
 * all, because the server has no storage to read.
 *
 * Subscribing to the `storage` event comes free with the shape and syncs the
 * choice across tabs.
 *
 * Note this deliberately does not theme the *site*. The site is dark, full stop.
 * This only controls whether the illustration is drawn in terminal green or in
 * the violet-on-ice palette it was originally painted in.
 */

let cached: ThemeName | null = null
const listeners = new Set<() => void>()

function read(): ThemeName {
  if (cached) return cached
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    cached = stored === 'light' || stored === 'matrix' ? stored : DEFAULT
  } catch {
    // Private mode, or storage disabled. The default is a fine answer.
    cached = DEFAULT
  }
  return cached
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  // Another tab changed it. `cached` is now stale, so drop it before notifying.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    cached = null
    for (const listener of listeners) listener()
  }
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * `useSyncExternalStore` requires a stable snapshot: returning a fresh value
 * would loop forever. `cached` is the memo — it is only cleared on a real write.
 */
const getSnapshot = () => read()
const getServerSnapshot = (): ThemeName => DEFAULT

export function useCharacterTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next: ThemeName = read() === 'matrix' ? 'light' : 'matrix'
    cached = next
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage is unavailable; the toggle still works for this session.
    }
    for (const listener of listeners) listener()
  }, [])

  return { theme, toggle }
}
