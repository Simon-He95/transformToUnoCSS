import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('position', () => {
  it('position:absolute', () => {
    expect(toUnocss('position:absolute')).toBe('absolute')
  })

  it('position:fixed', () => {
    expect(toUnocss('position:fixed')).toBe('fixed')
  })

  it('position:relative', () => {
    expect(toUnocss('position:relative')).toBe('relative')
  })

  it('position:sticky', () => {
    expect(toUnocss('position:sticky')).toBe('sticky')
  })

  it('position:static', () => {
    expect(toUnocss('position:static')).toBe('static')
  })
})
