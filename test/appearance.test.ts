import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('appearance', () => {
  it('appearance: none;', () => {
    expect(transformToUnocss('appearance: none;')).toBe('appearance-none')
  })
})
