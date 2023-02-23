import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('overscroll', () => {
  it('overscroll-behavior: auto;', () => {
    expect(transformToUnocss('overscroll-behavior: auto;')).toBe('overscroll-auto')
  })

  it('overscroll-behavior-y: auto;', () => {
    expect(transformToUnocss('overscroll-behavior-y: auto;')).toBe('overscroll-y-auto')
  })

  it('overscroll-behavior-x: contain;', () => {
    expect(transformToUnocss('overscroll-behavior-x: contain;')).toBe('overscroll-x-contain')
  })
})
