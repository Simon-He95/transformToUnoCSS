import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('mix', () => {
  it('mix-blend-mode: normal;', () => {
    expect(transformToUnocss('mix-blend-mode: normal;')).toBe(
      'mix-blend-normal',
    )
  })

  it('mix-blend-mode: color-dodge;', () => {
    expect(transformToUnocss('mix-blend-mode: color-dodge;')).toBe(
      'mix-blend-color-dodge',
    )
  })
})
