import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('outline', () => {
  it('outline-width: 0px;', () => {
    expect(toUnocss('outline-width: 0px;')).toBe('outline-0px')
  })

  it('outline-color: #000;', () => {
    expect(toUnocss('outline-color: #000;')).toBe('outline-#000')
  })

  it('outline-style: dashed;', () => {
    expect(toUnocss('outline-style: dashed;')).toBe('outline-dashed')
  })

  it('outline-offset: 0px;', () => {
    expect(toUnocss('outline-offset: 0px;')).toBe('outline-offset-0px')
  })
})
