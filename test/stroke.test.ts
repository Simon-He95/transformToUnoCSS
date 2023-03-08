import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('stroke', () => {
  it('stroke: #312e81;', () => {
    expect(toUnocss('stroke: #312e81;')).toBe('stroke="[#312e81]"')
  })

  it('stroke: transparent;', () => {
    expect(toUnocss('stroke: transparent;')).toBe('stroke-transparent')
  })

  it('stroke: none;', () => {
    expect(toUnocss('stroke: none;')).toBe('stroke-none')
  })

  it('stroke-width: 0;', () => {
    expect(toUnocss('stroke-width: 0;')).toBe('stroke-0')
  })
})
