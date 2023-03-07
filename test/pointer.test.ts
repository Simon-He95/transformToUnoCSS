import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('pointer', () => {
  it('pointer-events: none;', () => {
    expect(toUnocss('pointer-events: none;')).toBe(
      'pointer-events-none',
    )
  })

  it('pointer-events: auto;', () => {
    expect(toUnocss('pointer-events: auto;')).toBe(
      'pointer-events-auto',
    )
  })
})
