import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CharacterProvider } from '@/components/character/character-provider'
import { CharacterDemo } from '@/components/demos/character-demo'
import { CharacterScene } from '@/components/sections/character-scene'
import { en } from '@/content/en'

const { characterPackage, character, hero } = en

const partsOf = (root: HTMLElement, scope: string) =>
  [...root.querySelectorAll(`${scope} [data-part]`)].map((el) => el.getAttribute('data-part'))

const renderPage = () =>
  render(
    <CharacterProvider>
      <CharacterScene character={character} role={hero.role} />
      <CharacterDemo
        randomLabel={characterPackage.randomLabel}
        resetLabel={characterPackage.resetLabel}
        caption={characterPackage.demoCaption}
      />
    </CharacterProvider>,
  )

describe('the library project card', () => {
  it('starts as Facundo, with reset unavailable', () => {
    render(
      <CharacterProvider>
        <CharacterDemo
          randomLabel={characterPackage.randomLabel}
          resetLabel={characterPackage.resetLabel}
          caption={characterPackage.demoCaption}
        />
      </CharacterProvider>,
    )

    expect(screen.getByRole('button', { name: characterPackage.resetLabel })).toBeDisabled()
    expect(screen.getByRole('button', { name: characterPackage.randomLabel })).toBeEnabled()
  })

  it('randomizing changes the card character and the one following the page', async () => {
    const user = userEvent.setup()
    const { container } = renderPage()

    const before = {
      scene: partsOf(container, '.dc-scene [data-fl="hairFront"]'),
      card: partsOf(container, '[aria-hidden="true"]:not(.dc-scene) [data-fl="hairFront"]'),
    }

    await user.click(screen.getByRole('button', { name: characterPackage.randomLabel }))

    const after = {
      scene: partsOf(container, '.dc-scene [data-fl="hairFront"]'),
      card: partsOf(container, '[aria-hidden="true"]:not(.dc-scene) [data-fl="hairFront"]'),
    }

    expect(after.scene).toEqual(after.card)
    expect([before.scene, before.card]).not.toEqual([after.scene, after.card])
  })

  it('resetting brings Facundo back to both', async () => {
    const user = userEvent.setup()
    const { container } = renderPage()

    const asFacundo = partsOf(container, '.dc-scene [data-fl="hairFront"]')

    await user.click(screen.getByRole('button', { name: characterPackage.randomLabel }))
    await user.click(screen.getByRole('button', { name: characterPackage.resetLabel }))

    expect(partsOf(container, '.dc-scene [data-fl="hairFront"]')).toEqual(asFacundo)
    expect(screen.getByRole('button', { name: characterPackage.resetLabel })).toBeDisabled()
  })

  it('keeps the character out of the accessibility tree', () => {
    const { container } = renderPage()
    container.querySelectorAll('[data-fl]').forEach((layer) => {
      expect(layer.closest('[aria-hidden="true"]')).not.toBeNull()
    })
  })
})
