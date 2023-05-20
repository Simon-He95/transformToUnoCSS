import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('border', () => {
  it('red;', () => {
    expect(toUnocss('border-color:red;')).toBe('border-red')
  })

  it('border;', () => {
    expect(toUnocss('border: 2px solid rgba(255, 62, 0, 0);')).toBe('border="[2px_solid_rgba(255,62,0,0)]"')
  })

  it('radius', () => {
    expect(toUnocss('border-radius: 0.25rem;')).toBe(
      'border-rd="[0.25rem]"',
    )
  })

  it('border-width', () => {
    expect(toUnocss('border-width: 2px;')).toBe('border="[2px]"')
  })

  it('radius-calc', () => {
    expect(toUnocss('border-radius: calc(100% - 20px)')).toBe(
      'border-rd="[calc(100%-20px)]"',
    )
  })

  it('border-radius: 10px 20px 30px 40px', () => {
    expect(toUnocss('border-radius: 10px 20px 30px 40px;')).toBe(
      'border-rd="[10px_20px_30px_40px]"',
    )
  })

  it('style', () => {
    expect(toUnocss('border-style: inset;')).toBe('border="[inset]"')
  })

  it('collapse', () => {
    expect(toUnocss('border-collapse: collapse;')).toBe(
      'border="[collapse]"',
    )
  })

  it('spacing', () => {
    expect(toUnocss('border-spacing: 0px 0px;')).toBe(
      'border-spacing="[0px_0px]"',
    )
  })

  it('border-bottom-width: 1px;', () => {
    expect(toUnocss('border-bottom-width: 1px;')).toBe(
      'border-b-1px',
    )
  })

  it('border-bottom-style: dashed;', () => {
    expect(toUnocss('border-bottom-style: dashed;')).toBe(
      'border-b-dashed',
    )
  })

  it('border-left-color: #333;', () => {
    expect(toUnocss('border-left-color: #333;')).toBe(
      'border-l="[#333]"',
    )
  })

  it('border-inline-start-width: 0px;', () => {
    expect(toUnocss('border-inline-start-width: 0px;')).toBe(
      'border-s-0px',
    )
  })

  it('border-inline-end-width: 0px;', () => {
    expect(toUnocss('border-inline-end-width: 0px;')).toBe(
      'border-e-0px',
    )
  })
})
