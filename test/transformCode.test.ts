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

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" bg-red w=[100%] lh-20px>
          nihao
        </div>
        <div class=\\"yellow\\">
          hi
        </div>
      </template>

      <style scoped>
      .red + .yellow {
        background-color: red;
        width: 100%;
      }

      .red + div {
        height: 100%;
      }
      </style> -->
      ",
        "

      -----    classAttribute.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\" haha bg-red w=[100%] lh-20px>
          nihao
        </div>
        <div class=\\"yellow\\">
          hi
        </div>
      </template>

      <style scoped>
      .red[haha] {
        background-color: red;
        width: 100%;
      }

      .red + div {
        height: 100%;
      }
      </style> -->
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

      -----    classTail.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"container\\">
          <div class=\\"red\\" bg-red w=[100%] lh-20px>
            nihao
          </div>
          <div class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>

      <style scoped>
      .container:focus-within {
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
        "

      -----    media.vue.vue     -------

      <!-- <script setup lang=\\"ts\\"></script>

      <template>
        <div class=\\"red\\">
          nihao
        </div>
      </template>

      <style scoped>
      @media (min-width:640px) {
       .red{
        background-color: red;
       }
      }

      @media (min-width:120px) {
       .red{
        background-color: red;
       }
      }
      @media not all and (min-width: 1536px){
        .red{
        background-color: red;
       }
      }
      </style> -->
      ",
      ]
    `)
  })
})

describe.only('single demo test', async () => {
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
      @media (min-width:120px) {
       .red{
        background-color: red;
       }
      }
      </style>
      "
    `)
  })
})
