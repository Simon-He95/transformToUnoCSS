import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('outline', () => {
  it('outline-width: 0px;', () => {
    expect(transformToUnocss('outline-width: 0px;')).toBe('outline-0px')
  })

  it('outline-color: #000;', () => {
    expect(transformToUnocss('outline-color: #000;')).toBe('outline-#000')
  })

  it('outline-style: dashed;', () => {
    expect(transformToUnocss('outline-style: dashed;')).toBe('outline-dashed')
  })

  it('outline-offset: 0px;', () => {
    expect(transformToUnocss('outline-offset: 0px;')).toBe('outline-offset-0px')
  })
})
