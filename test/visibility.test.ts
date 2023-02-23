import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('visibility', () => {
  it('visibility: visible;', () => {
    expect(transformToUnocss('visibility: visible;')).toBe('visible')
  })

  it('visibility: hidden;', () => {
    expect(transformToUnocss('visibility: hidden;')).toBe('invisible')
  })

  it('visibility: collapse;', () => {
    expect(transformToUnocss('visibility: collapse;')).toBe('collapse')
  })
})
