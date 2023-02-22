import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('text', () => {
  it('text-left', () => {
    expect(transformToUnocss('text-align:left')).toBe('text-left')
  })

  it('text-right', () => {
    expect(transformToUnocss('text-align:right')).toBe('text-right')
  })
  it('text-center', () => {
    expect(transformToUnocss('text-align:center')).toBe('text-center')
  })

  it('text-ellipsis', () => {
    expect(transformToUnocss('text-overflow: ellipsis;')).toBe('text-ellipsis')
  })
})
