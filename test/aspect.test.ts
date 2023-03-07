import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('aspect', () => {
  it('aspect-ratio: auto;', () => {
    expect(toUnocss('aspect-ratio: auto;')).toBe('aspect-auto')
  })

  it('aspect-ratio: 1 / 1;', () => {
    expect(toUnocss('aspect-ratio: 1 / 1;')).toBe('aspect="[1/1]"')
  })

  it('aspect-ratio: 16 / 9;', () => {
    expect(toUnocss('aspect-ratio: 16 / 9;')).toBe('aspect="[16/9]"')
  })
})
