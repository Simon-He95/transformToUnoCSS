import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('line-height', () => {
  it('rem;', () => {
    expect(toUnocss('line-height: 0.25rem;')).toBe('lh-0.25rem')
  })

  it('px', () => {
    expect(toUnocss('line-height: 20px;')).toBe('lh-20px')
  })
  it('em', () => {
    expect(toUnocss('line-height: 20em;')).toBe('lh-20em')
  })

  it('calc', () => {
    expect(toUnocss('line-height: calc(100% - 20px);')).toBe(
      'lh="[calc(100%-20px)]"',
    )
  })
})
