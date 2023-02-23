import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('accent', () => {
  it('accent-color: inherit;', () => {
    expect(transformToUnocss('accent-color: inherit;')).toBe('accent-inherit')
  })

  it('accent-color: #fff;', () => {
    expect(transformToUnocss('accent-color: #fff;')).toBe('accent-#fff')
  })

  it('align-self: center;', () => {
    expect(transformToUnocss('align-self: center;')).toBe('self-center')
  })

  it('align-self: flex-start;', () => {
    expect(transformToUnocss('align-self: flex-start;')).toBe('self-start')
  })
})
