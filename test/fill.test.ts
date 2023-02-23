import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('fill', () => {
  it('fill: #312e81;', () => {
    expect(transformToUnocss('fill: #312e81;')).toBe('fill-#312e81')
  })

  it('fill: transparent;', () => {
    expect(transformToUnocss('fill: transparent;')).toBe('fill-transparent')
  })

  it('fill: none;', () => {
    expect(transformToUnocss('fill: none;')).toBe('fill-none')
  })
})
