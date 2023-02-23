import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('stroke', () => {
  it('stroke: #312e81;', () => {
    expect(transformToUnocss('stroke: #312e81;')).toBe('stroke-#312e81')
  })

  it('stroke: transparent;', () => {
    expect(transformToUnocss('stroke: transparent;')).toBe('stroke-transparent')
  })

  it('stroke: none;', () => {
    expect(transformToUnocss('stroke: none;')).toBe('stroke-none')
  })

  it('stroke-width: 0;', () => {
    expect(transformToUnocss('stroke-width: 0;')).toBe('stroke-0')
  })
})
