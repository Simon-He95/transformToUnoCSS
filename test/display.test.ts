import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('display', () => {
  it('display:none', () => {
    expect(transformToUnocss('display:none')).toBe('hidden')
  })

  it('inline-flex', () => {
    expect(transformToUnocss('display: inline-flex')).toBe('inline-flex')
  })
})
