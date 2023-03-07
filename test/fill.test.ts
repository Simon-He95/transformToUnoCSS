import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('fill', () => {
  it('fill: #312e81;', () => {
    expect(toUnocss('fill: #312e81;')).toBe('fill-#312e81')
  })

  it('fill: transparent;', () => {
    expect(toUnocss('fill: transparent;')).toBe('fill-transparent')
  })

  it('fill: none;', () => {
    expect(toUnocss('fill: none;')).toBe('fill-none')
  })
})
