import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('order', () => {
  it('align-items: flex-start;', () => {
    expect(toUnocss('order: 8;')).toBe('order-8')
  })

  it('align-content: flex-start;', () => {
    expect(toUnocss('order: -9999;')).toBe('order--9999')
  })

  it('align-self: center;', () => {
    expect(toUnocss('order: 0;')).toBe('order-0')
  })
})
