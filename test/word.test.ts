import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('word-break', () => {
  it('word-break: normal;', () => {
    expect(transformToUnocss('word-break: normal;')).toBe('break-normal')
  })

  it('word-break: break-all;', () => {
    expect(transformToUnocss('word-break: break-all;')).toBe('break-all')
  })

  it('word-break: keep-all;', () => {
    expect(transformToUnocss('word-break: keep-all;')).toBe('break-keep')
  })
})
