import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('z-index', () => {
  it('z-1', () => {
    expect(transformToUnocss('z-index:1')).toMatchInlineSnapshot('"z-1"')
  })
})
