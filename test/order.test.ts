import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('order', () => {
  it('align-items: flex-start;', () => {
    expect(transformToUnocss('order: 8;')).toBe('order-8')
  })

  it('align-content: flex-start;', () => {
    expect(transformToUnocss('order: -9999;')).toBe('order--9999')
  })

  it('align-self: center;', () => {
    expect(transformToUnocss('order: 0;')).toBe('order-0')
  })
})
