import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('touch', () => {
  it('touch-action: auto;', () => {
    expect(toUnocss('touch-action: auto;')).toBe('touch-auto')
  })

  it('touch-action: pan-x;', () => {
    expect(toUnocss('touch-action: pan-x;')).toBe('touch-pan-x')
  })
})
