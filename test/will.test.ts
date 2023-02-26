import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('will', () => {
  it('will-change: auto;', () => {
    expect(transformToUnocss('will-change: auto;')).toBe('will-change-auto')
  })

  it('will-change: scroll-position;', () => {
    expect(transformToUnocss('will-change: scroll-position;')).toBe(
      'will-change-scroll',
    )
  })

  it('will-change: contents;', () => {
    expect(transformToUnocss('will-change: contents;')).toBe(
      'will-change-contents',
    )
  })

  it('will-change: transform;', () => {
    expect(transformToUnocss('will-change: transform;')).toBe(
      'will-change-transform',
    )
  })
})
