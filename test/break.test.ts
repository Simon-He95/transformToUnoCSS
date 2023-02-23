import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('break', () => {
  it('break-inside: auto;', () => {
    expect(transformToUnocss('break-inside: auto;')).toBe('break-inside-auto')
  })

  it('break-inside: avoid-page;', () => {
    expect(transformToUnocss('break-inside: avoid-page;')).toBe('break-inside-avoid-page')
  })

  it('break-before: avoid-page;', () => {
    expect(transformToUnocss('break-before: avoid-page;')).toBe('break-before-avoid-page')
  })

  it('break-inside: avoid-column;', () => {
    expect(transformToUnocss('break-inside: avoid-column;')).toBe('break-inside-avoid-column')
  })
})
