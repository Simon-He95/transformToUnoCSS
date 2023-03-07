import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('break', () => {
  it('break-inside: auto;', () => {
    expect(toUnocss('break-inside: auto;')).toBe('break-inside-auto')
  })

  it('break-inside: avoid-page;', () => {
    expect(toUnocss('break-inside: avoid-page;')).toBe(
      'break-inside-avoid-page',
    )
  })

  it('break-before: avoid-page;', () => {
    expect(toUnocss('break-before: avoid-page;')).toBe(
      'break-before-avoid-page',
    )
  })

  it('break-inside: avoid-column;', () => {
    expect(toUnocss('break-inside: avoid-column;')).toBe(
      'break-inside-avoid-column',
    )
  })
})
