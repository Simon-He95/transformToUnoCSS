import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('isolation', () => {
  it('isolation: isolate;', () => {
    expect(toUnocss('isolation: isolate;')).toBe('isolate')
  })

  it('isolation: auto;', () => {
    expect(toUnocss('isolation: auto;')).toBe('isolation-auto')
  })
})
