import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('object', () => {
  it('object-fit: contain;', () => {
    expect(transformToUnocss('object-fit: contain;')).toBe('object-contain')
  })

  it('object-fit: scale-down;', () => {
    expect(transformToUnocss('object-fit: scale-down;')).toBe(
      'object-scale-down',
    )
  })

  it('object-position: bottom;', () => {
    expect(transformToUnocss('object-position: bottom;')).toBe('object-bottom')
  })

  it('object-position: left bottom;', () => {
    expect(transformToUnocss('object-position: left bottom;')).toBe(
      'object-left-bottom',
    )
  })
})
