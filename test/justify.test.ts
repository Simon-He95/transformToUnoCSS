import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('justify', () => {
  it('justify-content: flex-start;', () => {
    expect(transformToUnocss('justify-content: flex-start;')).toBe(
      'justify-start',
    )
  })

  it('justify-items: start;', () => {
    expect(transformToUnocss('justify-items: start;')).toBe(
      'justify-items-start',
    )
  })

  it('justify-self: auto;', () => {
    expect(transformToUnocss('justify-self: auto;')).toBe('justify-self-auto')
  })
})
