import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('inset', () => {
  it('inset-inline-start: 1px;', () => {
    expect(toUnocss('inset-inline-start: 1px;')).toBe('start-1px')
  })

  it('inset-inline-end: 1px;', () => {
    expect(toUnocss('inset-inline-end: 1px;')).toBe('end-1px')
  })

})
