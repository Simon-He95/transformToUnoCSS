import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('position', () => {
  it('position:absolute', () => {
    expect(transformToUnocss('position:absolute')).toBe('absolute')
  })

  it('position:fixed', () => {
    expect(transformToUnocss('position:fixed')).toBe('fixed')
  })

  it('position:relative', () => {
    expect(transformToUnocss('position:relative')).toBe('relative')
  })

  it('position:sticky', () => {
    expect(transformToUnocss('position:sticky')).toBe('sticky')
  })

  it('position:static', () => {
    expect(transformToUnocss('position:static')).toBe('static')
  })
})
