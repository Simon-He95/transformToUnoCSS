import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('visibility', () => {
  it('visibility: visible;', () => {
    expect(toUnocss('visibility: visible;')).toBe('visible')
  })

  it('visibility: hidden;', () => {
    expect(toUnocss('visibility: hidden;')).toBe('invisible')
  })

  it('visibility: collapse;', () => {
    expect(toUnocss('visibility: collapse;')).toBe('collapse')
  })
})
