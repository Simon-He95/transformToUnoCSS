import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('backface', () => {
  it('backface-visibility: hidden;', () => {
    expect(toUnocss('backface-visibility: hidden;')).toBe('backface-hidden')
  })

  it('backface-visibility: revert-layer;', () => {
    expect(toUnocss('backface-visibility: revert-layer;')).toBe('backface-revert-layer')
  })
})
