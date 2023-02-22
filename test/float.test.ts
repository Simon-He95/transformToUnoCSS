import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('float', () => {
  it('float-left', () => {
    expect(transformToUnocss('float:left')).toBe('float-left')
  })

  it('float-none', () => {
    expect(transformToUnocss('float:none')).toBe('float-none')
  })
})
