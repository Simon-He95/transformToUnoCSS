import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('border', () => {
  it('red;', () => {
    expect(transformToUnocss('border-color:red;')).toBe('border-red')
  })

  it('radius', () => {
    expect(transformToUnocss('border-radius: 0.25rem;')).toBe('border-rd-0.25rem')
  })
  it('radius-calc', () => {
    expect(transformToUnocss('border-radius: calc(100% - 20px)')).toBe('border-rd-[calc(100%-20px)]')
  })

  it('style', () => {
    expect(transformToUnocss('border-style: inset;')).toBe('border-inset')
  })
})
