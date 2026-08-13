'use client'

import { useEffect, useRef, useState } from 'react'
import { DEMO_TICK_MS } from '@/lib/demo-state'

export function useTick<T extends HTMLElement>(intervalMs: number = DEMO_TICK_MS) {
  const ref = useRef<T>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    let timer: ReturnType<typeof setInterval> | undefined
    let onScreen = false

    const start = () => {
      if (timer !== undefined) return
      timer = setInterval(() => setTick((value) => value + 1), intervalMs)
    }

    const stop = () => {
      if (timer === undefined) return
      clearInterval(timer)
      timer = undefined
    }

    const sync = () => {
      if (onScreen && document.visibilityState === 'visible') start()
      else stop()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false
        sync()
      },
      { rootMargin: '120px' },
    )

    observer.observe(element)
    document.addEventListener('visibilitychange', sync)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      stop()
    }
  }, [intervalMs])

  return { ref, tick }
}
