import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('margin', () => {
  it('margin:50px', () => {
    expect(toUnocss('margin:50px')).toBe('m-50px')
  })

  it('margin:10px 20px', () => {
    expect(toUnocss('margin:10px 20px')).toBe('mx-20px my-10px')
  })

  it('margin:50px 30px', () => {
    expect(toUnocss('margin:50px 30px')).toBe('mx-30px my-50px')
  })
  it('margin:50px 30px 20px', () => {
    expect(toUnocss('margin:50px 30px 20px')).toBe(
      'mx-30px mt-50px mb-20px',
    )
  })
  it('margin:50px 30px 20px 40px', () => {
    expect(toUnocss('margin:50px 30px 20px 40px')).toBe(
      'mt-50px mb-20px ml-40px mr-30px',
    )
  })
})

describe('margin-left', () => {
  it('margin-left:50px', () => {
    expect(toUnocss('margin-left:50px')).toBe('ml-50px')
  })
})

describe('margin-right', () => {
  it('margin-right:50px', () => {
    expect(toUnocss('margin-right:50px')).toBe('mr-50px')
  })
})

describe('margin-top', () => {
  it('margin-top:50px', () => {
    expect(toUnocss('margin-top:50px')).toBe('mt-50px')
  })
})

describe('margin-bottom', () => {
  it('margin-bottom:50px', () => {
    expect(toUnocss('margin-bottom:50px')).toBe('mb-50px')
  })

  it('margin-bottom:50px', () => {
    expect(toUnocss('margin-bottom:calc(100% - 30px)')).toBe(
      'mb="[calc(100%-30px)]"',
    )
  })
})
