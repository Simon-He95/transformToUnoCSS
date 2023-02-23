import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('isolation', () => {
  it('isolation: isolate;', () => {
    expect(transformToUnocss('isolation: isolate;')).toBe('isolate')
  })

  it('isolation: auto;', () => {
    expect(transformToUnocss('isolation: auto;')).toBe('isolation-auto')
  })
})
