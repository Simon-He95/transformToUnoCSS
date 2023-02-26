import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('align', () => {
  it('align-items: flex-start;', () => {
    expect(transformToUnocss('align-items: flex-start;')).toBe('items-start')
  })

  it('align-content: flex-start;', () => {
    expect(transformToUnocss('align-content: flex-start;')).toBe(
      'content-start',
    )
  })

  it('align-self: center;', () => {
    expect(transformToUnocss('align-self: center;')).toBe('self-center')
  })

  it('align-self: flex-start;', () => {
    expect(transformToUnocss('align-self: flex-start;')).toBe('self-start')
  })
})
