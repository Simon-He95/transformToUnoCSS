import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('touch', () => {
  it('touch-action: auto;', () => {
    expect(transformToUnocss('touch-action: auto;')).toBe('touch-auto')
  })

  it('touch-action: pan-x;', () => {
    expect(transformToUnocss('touch-action: pan-x;')).toBe('touch-pan-x')
  })
})
