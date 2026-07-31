import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(cleanup)

// jsdom implements neither of the observers the reveal animations rely on.
// A stub that never fires is the right default: components must render their
// content regardless, and that is exactly what the tests assert.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
  root = null
  rootMargin = ''
  thresholds: readonly number[] = []
}

vi.stubGlobal('IntersectionObserver', NoopObserver)
vi.stubGlobal('ResizeObserver', NoopObserver)

// jsdom ships no matchMedia; the demo widgets read it to honour reduced motion.
vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
)
