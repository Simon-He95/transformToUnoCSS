import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('resize', () => {
  it('resize: none;', () => {
    expect(transformToUnocss('resize: none;')).toBe('resize-none')
  })

  it('resize: vertical;', () => {
    expect(transformToUnocss('resize: vertical;')).toBe('resize-y')
  })

  it('resize: horizontal;', () => {
    expect(transformToUnocss('resize: horizontal;')).toBe('resize-x')
  })

  it('resize: both;', () => {
    expect(transformToUnocss('resize: both;')).toBe('resize')
  })
})
