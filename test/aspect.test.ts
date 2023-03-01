import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('aspect', () => {
  it('aspect-ratio: auto;', () => {
    expect(transformToUnocss('aspect-ratio: auto;')).toBe('aspect-auto')
  })

  it('aspect-ratio: 1 / 1;', () => {
    expect(transformToUnocss('aspect-ratio: 1 / 1;')).toBe('aspect="[1/1]"')
  })

  it('aspect-ratio: 16 / 9;', () => {
    expect(transformToUnocss('aspect-ratio: 16 / 9;')).toBe('aspect="[16/9]"')
  })
})
