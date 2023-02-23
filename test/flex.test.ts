import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('flex', () => {
  it('flex: none;', () => {
    expect(transformToUnocss('flex: none;')).toBe('flex-none')
  })

  it('flex-grow: 1;', () => {
    expect(transformToUnocss('flex-grow: 1;')).toBe('grow-1')
  })

  it('flex-shrink: 1;', () => {
    expect(transformToUnocss('flex-shrink: 1;')).toBe('shrink-1')
  })

  it('flex-basis: 0px;', () => {
    expect(transformToUnocss('flex-basis: 0px;')).toBe('basis-0px')
  })
})
