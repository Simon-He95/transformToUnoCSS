import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('width', () => {
  it('px', () => {
    expect(transformToUnocss('width:10px')).toBe('w-10px')
  })
  it('%', () => {
    expect(transformToUnocss('width: 100%')).toBe('w=[100%]')
  })
  it('em', () => {
    expect(transformToUnocss('width:10em')).toBe('w-10em')
  })
  it('rem', () => {
    expect(transformToUnocss('width:10rem')).toBe('w-10rem')
  })
  it('max-content', () => {
    expect(transformToUnocss('width: max-content')).toBe('w-max')
  })
  it('min-content', () => {
    expect(transformToUnocss('width: min-content')).toBe('w-min')
  })
  it('fit-content', () => {
    expect(transformToUnocss('width:fit-content')).toBe('w-fit')
  })
  it('auto', () => {
    expect(transformToUnocss('width:auto')).toBe('w-auto')
  })
  it('calc', () => {
    expect(transformToUnocss('width:calc(100% - 50px)')).toBe(
      'w=[calc(100%-50px)]',
    )
  })
  it('calc not space', () => {
    expect(transformToUnocss('width:calc(100%-50px)')).toBe(
      'w=[calc(100%-50px)]',
    )
  })

  it('calc space', () => {
    expect(transformToUnocss('width:calc(100%  -  50px)')).toBe(
      'w=[calc(100%-50px)]',
    )
  })

  it('min-width: 0px;', () => {
    expect(transformToUnocss('min-width: 0px;')).toBe('min-w-0px')
  })

  it('min-width: 0px;', () => {
    expect(transformToUnocss('min-width: 100%;')).toBe('min-w=[100%]')
  })
  it('max-width: 0px;', () => {
    expect(transformToUnocss('max-width: 0px;')).toBe('max-w-0px')
  })
  it('max-width: 0px;', () => {
    expect(transformToUnocss('max-width: max-content;')).toBe('max-w-max')
  })
})
