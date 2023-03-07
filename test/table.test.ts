import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('table', () => {
  it('table-layout: auto;', () => {
    expect(toUnocss('table-layout: auto;')).toBe('table-auto')
  })

  it('table-layout: fixed;', () => {
    expect(toUnocss('table-layout: fixed;')).toBe('table-fixed')
  })
})
