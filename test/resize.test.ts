import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('resize', () => {
  it('resize: none;', () => {
    expect(toUnocss('resize: none;')).toBe('resize-none')
  })

  it('resize: vertical;', () => {
    expect(toUnocss('resize: vertical;')).toBe('resize-y')
  })

  it('resize: horizontal;', () => {
    expect(toUnocss('resize: horizontal;')).toBe('resize-x')
  })

  it('resize: both;', () => {
    expect(toUnocss('resize: both;')).toBe('resize')
  })
})
