import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('content', () => {
  it('content: none;', () => {
    expect(transformToUnocss('content: none;')).toBe('content-none')
  })
})
