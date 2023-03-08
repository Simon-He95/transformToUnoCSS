import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('empty', () => {
  it('empty-cells: show;', () => {
    expect(toUnocss('empty-cells: show;')).toBe(
      'table-empty-cells-visible',
    )
  })

  it('empty-cells: hide;', () => {
    expect(toUnocss('empty-cells: hide;')).toBe('table-empty-cells-hidden')
  })
})
