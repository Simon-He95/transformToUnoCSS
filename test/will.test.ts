import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('will', () => {
  it('will-change: auto;', () => {
    expect(toUnocss('will-change: auto;')).toBe('will-change-auto')
  })

  it('will-change: scroll-position;', () => {
    expect(toUnocss('will-change: scroll-position;')).toBe(
      'will-change-scroll',
    )
  })

  it('will-change: contents;', () => {
    expect(toUnocss('will-change: contents;')).toBe(
      'will-change-contents',
    )
  })

  it('will-change: transform;', () => {
    expect(toUnocss('will-change: transform;')).toBe(
      'will-change-transform',
    )
  })
})
