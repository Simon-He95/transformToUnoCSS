import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('vertical', () => {
  it('v-text-bottom', () => {
    expect(transformToUnocss('vertical-align: text-bottom;')).toBe(
      'v-text-bottom',
    )
  })
})
