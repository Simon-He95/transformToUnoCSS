import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('place', () => {
  it('place-content: center;', () => {
    expect(transformToUnocss('place-content: center;')).toBe('place-content-center')
  })

  it('place-content: space-between;', () => {
    expect(transformToUnocss('place-content: space-between;')).toBe('place-content-between')
  })

  it('place-items: start;', () => {
    expect(transformToUnocss('place-items: start;')).toBe('place-items-start')
  })

  it('place-self: auto;', () => {
    expect(transformToUnocss('place-self: auto;')).toBe('place-self-auto')
  })
})
