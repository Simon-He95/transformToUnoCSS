import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('clear', () => {
  it('clear-left', () => {
    expect(transformToUnocss('clear:left')).toBe('clear-left')
  })

  it('clear-none', () => {
    expect(transformToUnocss('clear:none')).toBe('clear-none')
  })
})
