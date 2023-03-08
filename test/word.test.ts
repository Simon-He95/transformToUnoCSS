import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('word-break', () => {
  it('word-break: normal;', () => {
    expect(toUnocss('word-break: normal;')).toBe('break-normal')
  })

  it('word-break: break-all;', () => {
    expect(toUnocss('word-break: break-all;')).toBe('break-all')
  })

  it('word-break: keep-all;', () => {
    expect(toUnocss('word-break: keep-all;')).toBe('break-keep')
  })

  it('word-spacing: 0em;', () => {
    expect(toUnocss('word-spacing: 0em;')).toBe('word-spacing-0em')
  })
})
