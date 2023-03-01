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
        <div h=\\"[100%]\\" class=\\"red\\" bg-red w=\\"[100%]\\" lh-20px>
          nihao
        </div>
        <div bg-red w=\\"[100%]\\" class=\\"yellow\\">
          hi
        </div>
      </template>

      <style scoped>

      </style>
      ",
        "

      -----    classAttribute.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div bg-red w=\\"[100%]\\" class=\\"red\\" haha bg-red w=\\"[100%]\\" lh-20px>
          nihao
        </div>
        <div h=\\"[100%]\\" class=\\"yellow\\">
          hi
        </div>
      </template>

      <style scoped>

      </style>
      ",
        "

      -----    classChild.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" bg-red w=\\"[100%]\\" lh-20px>
          <div bg-red w=\\"[100%]\\" class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      </style>
      ",
        "

      -----    classCombine.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div bg-red w=\\"[100%]\\" lh-20px>
          <div bg-red w=\\"[100%]\\" class=\\"red yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      </style>
      ",
        "

      -----    classSpace.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" bg-red w=\\"[100%]\\" lh-20px>
          <div bg-red w=\\"[100%]\\" class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      </style>
      ",
        "

      -----    classTail.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div focus-within=\\"bg-red w=\\"[100%]\\"\\" class=\\"container\\">
          <div class=\\"red\\" bg-red w=\\"[100%]\\" lh-20px>
            nihao
          </div>
          <div class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      </style>
      ",
        "

      -----    hover.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div bg-red w=\\"[100%]\\" lh-20px>
          <div hover=\\"text-yellow\\" class=\\"red\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      </style>
      ",
        "

      -----    media.vue.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div max-2xl=\\"bg-red\\" sm=\\"bg-red\\" class=\\"red\\">
          nihao
        </div>
      </template>

      <style scoped>
      @media (min-width: 120px) {
        .red {
          background-color: red;
        }
      }
      </style>
      ",
      ]
    `)
  })
})

describe('single demo test', async () => {
  const demo = await fsp.readFile('./test/demo/media.vue', 'utf-8')

  it('transform-origin:center', () => {
    expect(transfromCode(demo)).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>

      <template>
        <div max-2xl=\\"bg-red\\" sm=\\"bg-red\\" class=\\"red\\">
          nihao
        </div>
      </template>

      <style scoped>
      @media (min-width: 120px) {
        .red {
          background-color: red;
        }
      }
      </style>
      "
    `)
  })
})
