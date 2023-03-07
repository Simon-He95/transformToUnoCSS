import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('mix', () => {
  it('mix-blend-mode: normal;', () => {
    expect(toUnocss('mix-blend-mode: normal;')).toBe(
      'mix-blend-normal',
    )
  })

  it('mix-blend-mode: color-dodge;', () => {
    expect(toUnocss('mix-blend-mode: color-dodge;')).toBe(
      'mix-blend-color-dodge',
    )
  })
})
