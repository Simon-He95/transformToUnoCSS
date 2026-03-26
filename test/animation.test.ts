import { describe, expect, it } from 'vitest'
import { toUnocss } from 'transform-to-unocss-core'

describe('animation shorthand with milliseconds', () => {
  it('animation: shake-horizontal 8000ms ease-in-out', () => {
    expect(toUnocss('animation: shake-horizontal 8000ms ease-in-out')).toBe(
      'animate-[shake-horizontal] animate-duration-8000 animate-ease-[ease-in-out]',
    )
  })
})
