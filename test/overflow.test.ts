import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('overflow', () => {
  it('overflow: auto;', () => {
    expect(transformToUnocss('overflow: auto;')).toBe('overflow-auto')
  })

  it('overflow-y: auto;', () => {
    expect(transformToUnocss('overflow-y: auto;')).toBe('overflow-y-auto')
  })

  it('overflow-x: visible;', () => {
    expect(transformToUnocss('overflow-x: visible;')).toBe('overflow-x-visible')
  })
})
