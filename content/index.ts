import type { Locale } from '@/lib/i18n'
import { en } from './en'
import { es } from './es'
import type { Content } from './types'

const DICTIONARIES = { en, es } as const satisfies Record<Locale, Content>

export function getContent(locale: Locale): Content {
  return DICTIONARIES[locale]
}

export { en, es }
export type { Content } from './types'
