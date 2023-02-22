import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('position', () => {
  it('position:absolute', () => {
    expect(transformToUnocss('position:absolute')).toBe('pos-absolute')
  })
})
