import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('clear', () => {
  it('clear-left', () => {
    expect(toUnocss('clear:left')).toBe('clear-left')
  })

  it('clear-none', () => {
    expect(toUnocss('clear:none')).toBe('clear-none')
  })
})
