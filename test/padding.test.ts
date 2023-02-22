import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('padding', () => {
  it('padding:50px', () => {
    expect(transformToUnocss('padding:50px')).toBe('p-50px')
  })
  it('padding:50px 30px', () => {
    expect(transformToUnocss('padding:50px 30px')).toBe('px-30px py-50px')
  })
  it('padding:50px 30px 20px', () => {
    expect(transformToUnocss('padding:50px 30px 20px')).toBe('px-30px pt-50px pb-20px')
  })
  it('padding:50px 30px 20px 40px', () => {
    expect(transformToUnocss('padding:50px 30px 20px 40px')).toBe('pt-50px pb-20px pl-40px pr-30px')
  })
})

describe('padding-left', () => {
  it('padding-left:50px', () => {
    expect(transformToUnocss('padding-left:50px')).toBe('pl-50px')
  })
})

describe('padding-right', () => {
  it('padding-right:50px', () => {
    expect(transformToUnocss('padding-right:50px')).toBe('pr-50px')
  })
})

describe('padding-top', () => {
  it('padding-top:50px', () => {
    expect(transformToUnocss('padding-top:50px')).toBe('pt-50px')
  })
})

describe('padding-bottom', () => {
  it('padding-bottom:50px', () => {
    expect(transformToUnocss('padding-bottom:50px')).toBe('pb-50px')
  })
})
