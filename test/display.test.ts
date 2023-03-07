import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('display', () => {
  it('display:none', () => {
    expect(toUnocss('display:none')).toBe('hidden')
  })

  it('inline-flex', () => {
    expect(toUnocss('display: inline-flex')).toBe('inline-flex')
  })
})
