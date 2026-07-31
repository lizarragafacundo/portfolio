import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MotionProvider } from '@/components/motion/motion-provider'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Skills } from '@/components/sections/skills'
import { en } from '@/content/en'

/** Sections use `<m.*>`, which requires the LazyMotion provider above them. */
function renderSection(ui: React.ReactElement) {
  return render(<MotionProvider>{ui}</MotionProvider>)
}

describe('Hero', () => {
  it('exposes a real, readable name even though the banner is ASCII', () => {
    renderSection(<Hero hero={en.hero} character={en.character} />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Facundo Lizarraga')
    expect(heading).toHaveTextContent(en.hero.role)
  })

  it('puts the character beside the text, not above it', () => {
    const { container } = renderSection(<Hero hero={en.hero} character={en.character} />)

    // The drawing is a sibling of the text column inside one grid, which is
    // what keeps them side by side; nesting it would make it flow with the copy.
    const grid = container.querySelector('.grid')
    expect(grid?.children).toHaveLength(2)
    expect(grid?.querySelector('.dc-scene')).not.toBeNull()
  })

  it('hides the decorative ASCII from assistive technology', () => {
    const { container } = renderSection(<Hero hero={en.hero} character={en.character} />)

    const art = container.querySelectorAll('pre')
    expect(art.length).toBeGreaterThan(0)
    for (const node of art) {
      expect(node).toHaveAttribute('aria-hidden', 'true')
    }
  })
})

describe('Experience', () => {
  it('renders every job with its bullets and tags', () => {
    renderSection(<Experience title={en.nav.experience} jobs={en.experience} />)

    for (const job of en.experience) {
      const heading = screen.getByRole('heading', { level: 3, name: new RegExp(job.company) })
      const card = heading.closest('article')
      expect(card).not.toBeNull()

      const scope = within(card as HTMLElement)
      expect(scope.getByText(job.meta)).toBeInTheDocument()
      expect(scope.getByText(job.role, { exact: false })).toBeInTheDocument()

      for (const bullet of job.bullets) {
        expect(scope.getByText(bullet)).toBeInTheDocument()
      }
      for (const tag of job.tags) {
        expect(scope.getByText(tag)).toBeInTheDocument()
      }
    }
  })

  it('labels the section by its own heading', () => {
    renderSection(<Experience title={en.nav.experience} jobs={en.experience} />)

    const section = screen.getByRole('region', { name: en.nav.experience })
    expect(section).toHaveAttribute('id', 'experience')
  })

  it('renders the highlighted stats as a description list', () => {
    renderSection(<Experience title={en.nav.experience} jobs={en.experience} />)

    const stats = en.experience[0]?.stats ?? []
    expect(stats.length).toBeGreaterThan(0)

    for (const stat of stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument()
      expect(screen.getByText(stat.label)).toBeInTheDocument()
    }
  })
})

describe('Skills', () => {
  it('renders one group per category with all of its items', () => {
    renderSection(<Skills title={en.nav.skills} groups={en.skills} />)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(en.skills.length)

    for (const group of en.skills) {
      const heading = screen.getByRole('heading', { level: 3, name: new RegExp(group.label) })
      const scope = within(heading.closest('article') as HTMLElement)

      for (const item of group.items) {
        expect(scope.getByText(item)).toBeInTheDocument()
      }
    }
  })
})
