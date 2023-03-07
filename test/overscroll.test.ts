import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('overscroll', () => {
  it('overscroll-behavior: auto;', () => {
    expect(toUnocss('overscroll-behavior: auto;')).toBe(
      'overscroll-auto',
    )
  })

  it('overscroll-behavior-y: auto;', () => {
    expect(toUnocss('overscroll-behavior-y: auto;')).toBe(
      'overscroll-y-auto',
    )
  })

  it('overscroll-behavior-x: contain;', () => {
    expect(toUnocss('overscroll-behavior-x: contain;')).toBe(
      'overscroll-x-contain',
    )
  })
})
