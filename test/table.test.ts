import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('table', () => {
  it('table-layout: auto;', () => {
    expect(transformToUnocss('table-layout: auto;')).toBe('table-auto')
  })

  it('	table-layout: fixed;', () => {
    expect(transformToUnocss('table-layout: fixed;')).toBe('table-fixed')
  })
})
