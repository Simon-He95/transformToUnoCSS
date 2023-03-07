import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('overflow', () => {
  it('overflow: auto;', () => {
    expect(toUnocss('overflow: auto;')).toBe('overflow-auto')
  })

  it('overflow-y: auto;', () => {
    expect(toUnocss('overflow-y: auto;')).toBe('overflow-y-auto')
  })

  it('overflow-x: visible;', () => {
    expect(toUnocss('overflow-x: visible;')).toBe('overflow-x-visible')
  })
})
