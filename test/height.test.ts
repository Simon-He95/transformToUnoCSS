import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('should', () => {
  it('px', () => {
    expect(transformToUnocss('height:10px')).toMatchInlineSnapshot('"h-10px"')
  })
  it('em', () => {
    expect(transformToUnocss('height:10em')).toMatchInlineSnapshot('"h-10em"')
  })
  it('rem', () => {
    expect(transformToUnocss('height:10rem')).toMatchInlineSnapshot('"h-10rem"')
  })
  it('max-content', () => {
    expect(transformToUnocss('height: max-content')).toMatchInlineSnapshot('"h-max"')
  })
  it('min-content', () => {
    expect(transformToUnocss('height: min-content')).toMatchInlineSnapshot('"h-min"')
  })
  it('fit-content', () => {
    expect(transformToUnocss(' height:fit-content')).toBe('h-fit')
  })
  it('auto', () => {
    expect(transformToUnocss(' height:auto')).toBe('h-auto')
  })
  it('calc', () => {
    expect(transformToUnocss(' height:calc(100% - 50px)')).toBe('h-[calc(100%-50px)]')
  })
  it('calc not space', () => {
    expect(transformToUnocss(' height:calc(100%-50px)')).toBe('h-[calc(100%-50px)]')
  })

  it('calc space', () => {
    expect(transformToUnocss(' height:calc(100%  -  50px)')).toBe('h-[calc(100%-50px)]')
  })
})
