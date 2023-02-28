import fsp from 'fs/promises'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'

describe('transform', () => {
  it('transform-origin:center', async () => {
    const demos = await fsp.readdir('./test/demo')
    const contents = await Promise.all(
      demos.map(async (demo) => {
        const url = `./test/demo/${demo}`
        return `\n\n-----    ${demo}.vue     -------\n\n${transfromCode(
          await fsp.readFile(url, 'utf-8'),
        )}`
      }),
    )

    expect(contents).toMatchInlineSnapshot(`
      [
        "

      -----    classAdd.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" bg-red w=[100%] lh-20px>
          nihao
        </div>
        <div bg-red w=[100%] class=\\"yellow\\">
          hi
        </div>
      </template>

      <style scoped>

      </style>
      ",
        "

      -----    classChild.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" bg-red w=[100%] lh-20px>
          <div class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      .red > .yellow {
        background-color: red;
        width: 100%;
      }
      </style> -->
      ",
        "

      -----    classCombine.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div bg-red w=[100%] lh-20px>
          <div class=\\"red yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      .red.yellow {
        background-color: red;
        width: 100%;
      }
      </style> -->
      ",
        "

      -----    classSpace.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" bg-red w=[100%] lh-20px>
          <div class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      .red .yellow {
        background-color: red;
        width: 100%;
      }
      </style> -->
      ",
        "

      -----    hover.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div bg-red w=[100%] lh-20px>
          <div class=\\"red\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      .red:hover {
        color: yellow;
      }
      </style> -->
      ",
      ]
    `)
  })
})
