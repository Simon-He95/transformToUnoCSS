import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('z-index', () => {
  it('z-1', () => {
    expect(toUnocss('z-index:1')).toMatchInlineSnapshot('"z-1"')
  })
})
