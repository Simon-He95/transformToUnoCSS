import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('caption', () => {
  it('caption-side: top;', () => {
    expect(toUnocss('caption-side: top;')).toBe(
      'caption-top',
    )
  })
})
