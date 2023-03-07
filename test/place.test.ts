import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('place', () => {
  it('place-content: center;', () => {
    expect(toUnocss('place-content: center;')).toBe(
      'place-content-center',
    )
  })

  it('place-content: space-between;', () => {
    expect(toUnocss('place-content: space-between;')).toBe(
      'place-content-between',
    )
  })

  it('place-items: start;', () => {
    expect(toUnocss('place-items: start;')).toBe('place-items-start')
  })

  it('place-self: auto;', () => {
    expect(toUnocss('place-self: auto;')).toBe('place-self-auto')
  })
})
