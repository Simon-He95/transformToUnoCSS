import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('user', () => {
  it('user-select: none;', () => {
    expect(toUnocss('user-select: none;')).toBe('select-none')
  })

  it('user-select: text;', () => {
    expect(toUnocss('user-select: text;')).toBe('select-text')
  })

  it('user-select: all;', () => {
    expect(toUnocss('user-select: all;')).toBe('select-all')
  })

  it('user-select: auto;', () => {
    expect(toUnocss('user-select: auto;')).toBe('select-auto')
  })
})
