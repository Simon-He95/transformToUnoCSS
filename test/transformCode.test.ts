import fsp from 'fs/promises'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'

describe('transform', () => {
  it('transform-origin:center', async () => {
    const content = await fsp.readFile('./test/demo.vue', 'utf-8')

    expect(transfromCode(content)).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>

      <template>
        <div bg-red w=[100%] lh-20px>
          <div bg-red w=[100%] class=\\"red yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      </style>
      "
    `)
  })
})
