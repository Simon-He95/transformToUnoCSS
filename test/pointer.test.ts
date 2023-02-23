import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('pointer', () => {
  it('pointer-events: none;', () => {
    expect(transformToUnocss('pointer-events: none;')).toBe('pointer-events-none')
  })

  it('pointer-events: auto;', () => {
    expect(transformToUnocss('pointer-events: auto;')).toBe('pointer-events-auto')
  })
})
