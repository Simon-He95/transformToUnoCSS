import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('user', () => {
  it('user-select: none;', () => {
    expect(transformToUnocss('user-select: none;')).toBe('select-none')
  })

  it('user-select: text;', () => {
    expect(transformToUnocss('user-select: text;')).toBe('select-text')
  })

  it('user-select: all;', () => {
    expect(transformToUnocss('user-select: all;')).toBe('select-all')
  })

  it('user-select: auto;', () => {
    expect(transformToUnocss('user-select: auto;')).toBe('select-auto')
  })
})
