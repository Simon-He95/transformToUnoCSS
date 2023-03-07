import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('object', () => {
  it('object-fit: contain;', () => {
    expect(toUnocss('object-fit: contain;')).toBe('object-contain')
  })

  it('object-fit: scale-down;', () => {
    expect(toUnocss('object-fit: scale-down;')).toBe(
      'object-scale-down',
    )
  })

  it('object-position: bottom;', () => {
    expect(toUnocss('object-position: bottom;')).toBe('object-bottom')
  })

  it('object-position: left bottom;', () => {
    expect(toUnocss('object-position: left bottom;')).toBe(
      'object-left-bottom',
    )
  })
})
