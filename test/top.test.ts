import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('top', () => {
  it('rem;', () => {
    expect(toUnocss('top: 0.25rem;')).toBe('top-0.25rem')
  })

  it('px', () => {
    expect(toUnocss('top: 20px;')).toBe('top-20px')
  })
  it('em', () => {
    expect(toUnocss('top: 20em;')).toBe('top-20em')
  })

  it('calc', () => {
    expect(toUnocss('top: calc(100% - 20px);')).toBe(
      'top="[calc(100%-20px)]"',
    )
  })
})
