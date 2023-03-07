import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('whitespace', () => {
  it('white-space: normal;', () => {
    expect(toUnocss('white-space: normal;')).toBe('whitespace-normal')
  })

  it('white-space: pre-wrap;', () => {
    expect(toUnocss('white-space: pre-wrap;')).toBe(
      'whitespace-pre-wrap',
    )
  })
})
