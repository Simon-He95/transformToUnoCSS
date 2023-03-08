import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('writing', () => {
  it('writing-mode: unset;', () => {
    expect(toUnocss('writing-mode: unset;')).toBe(
      'write-unset',
    )
  })

  it('writing-mode: vertical-rl;', () => {
    expect(toUnocss('writing-mode: vertical-rl;')).toBe('write-vertical-right')
  })
})
