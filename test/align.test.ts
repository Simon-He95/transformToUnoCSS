import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('align', () => {
  it('align-items: flex-start;', () => {
    expect(toUnocss('align-items: flex-start;')).toBe('items-start')
  })

  it('align-content: flex-start;', () => {
    expect(toUnocss('align-content: flex-start;')).toBe(
      'content-start',
    )
  })

  it('align-self: center;', () => {
    expect(toUnocss('align-self: center;')).toBe('self-center')
  })

  it('align-self: flex-start;', () => {
    expect(toUnocss('align-self: flex-start;')).toBe('self-start')
  })
})
