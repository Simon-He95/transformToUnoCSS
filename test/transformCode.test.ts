import fsp from 'fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'

describe('transformCode', () => {
  it('transformCode: all', async () => {
    const demos = await fsp.readdir('./test/demo')
    const contents = await Promise.all(
      demos.map(async (demo) => {
        const url = `./test/demo/${demo}`
        const filepath = path.resolve(process.cwd(), url)
        const suffix = demo.endsWith('.vue') ? 'vue' : demo.endsWith('.tsx') ? 'tsx' : ''
        if (!suffix)
          return

        return `\n\n-----    ${demo}     -------\n\n${await transfromCode(
          await fsp.readFile(url, 'utf-8'),
          {filepath,
          type:suffix,}
        )}`
      }),
    )

    expect(contents.filter(Boolean)).toMatchInlineSnapshot(`
      [
        "

      -----    classAdd.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px class=\\"red\\">
          nihao
        </div>
        <div bg-yellow! w=\\"[100%]\\" h=\\"[100%]\\" class=\\"yellow\\">
          hi
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    classAttribute.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div w=\\"[100%]\\" h=\\"[100%]\\" class=\\"red\\" name=\\"hi\\" haha>
          nihao
        </div>
        <div h=\\"[100%]\\" class=\\"yellow\\">
          hi
        </div>
      </template>

      <style scoped>
      .red[haha] {
        background-color: red;
      }
      </style>
      ",
        "

      -----    classChild.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px class=\\"red\\">
          <div bg-red w=\\"[100%]\\" class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    classCombine.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px>
          <div bg-red w=\\"[100%]\\" class=\\"red yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    classSpace.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px class=\\"red\\">
          <div bg-red! w=\\"[100%]\\" class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    classTail.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div focus-within=\\"bg-red w-\\"[100%]\\"\\" class=\\"container\\">
          <div bg-red w=\\"[100%]\\" lh-20px class=\\"red\\">
            nihao
          </div>
          <div class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    classWeight.vue     -------

      <script setup lang=\\"ts\\">
      const nihao = ref(true)
      </script>
      <template>
        <div bg-yellow w=\\"[100%]\\" h=\\"[100%]\\" scale=\\"150\\" class=\\"red\\" :class=\\"[nihao?'w-10':'bg-red']\\">
          nihao
        </div>
        <div>hi</div>
      </template>
      <style scoped></style>
      ",
        "

      -----    hover.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px>
          <div hover=\\"text-yellow\\" class=\\"red\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    media.vue     -------

      <script setup lang=\\"ts\\"></script>

      <template>
        <div max-2xl:bg-red sm:bg-red class=\\"red\\">
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
        "

      -----    styleMaxWidth.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div class=\\"red\\">
          nihao
        </div>
        <div max-w=\\"[calc(100%-50px)]\\" bg=\\"[rgba(255,62,0,0.1)]\\" class=\\"yellow\\">
          hi
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    styleWeight.vue     -------

      <script setup lang=\\"ts\\"></script>
      <template>
        <div bg-pink style=\\"hi:123\\" class=\\"red\\">
          nihao
        </div>
        <div bg-yellow class=\\"yellow\\" >
          hi
        </div>
      </template>
      <style scoped></style>
      ",
        "

      -----    test.vue     -------

      <template>
        <button h-32px hover=\\"bg-#67c23a\\" text-red w=\\"[100%]\\">button</button>
      </template>
      <style scoped></style>
      ",
        "

      -----    vue.tsx     -------

      import { defineComponent, ref } from 'vue'
      import './index.css'

      export const component = defineComponent({
        name: 'Component',
        props: {
          title: {
            type: String,
            default: '',
          },
          content: {
            type: String,
            default: '',
          },
        },
        setup(props) {
          const count = ref(0)
          const increment = () => count.value++
          return () => (
            <div>
              <h1 className=\\"red bg-red\\" style=\\"hi:123\\">{props.title}</h1>
              <p>{props.content}</p>
              <div onClick={increment}>
                count: {count.value}
              </div>
            </div>
          )
        },
      })
      ",
      ]
    `)
  })
})

describe('single demo classWeight', async () => {
  const demo = await fsp.readFile('./test/demo/classWeight.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classWeight.vue')
  it('classWeight.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue',isJsx:true})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\">
      const nihao = ref(true)
      </script>
      <template>
        <div class=\\"red h-[100%] scale-150 bg-yellow w-[100%]\\" :class=\\"[nihao?'w-10':'bg-red']\\">
          nihao
        </div>
        <div>hi</div>
      </template>
      <style scoped></style>
      "
    `)
  })
})

describe('single demo classCombine', async () => {
  const demo = await fsp.readFile('./test/demo/classCombine.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classCombine.vue')
  it('classCombine.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px>
          <div bg-red w=\\"[100%]\\" class=\\"red yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      "
    `)
  })
})

describe('single demo classTail', async () => {
  const demo = await fsp.readFile('./test/demo/classTail.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classTail.vue')
  it('classTail.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>
      <template>
        <div focus-within=\\"bg-red w-\\"[100%]\\"\\" class=\\"container\\">
          <div bg-red w=\\"[100%]\\" lh-20px class=\\"red\\">
            nihao
          </div>
          <div class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      "
    `)
  })
})

describe('single demo Media', async () => {
  const demo = await fsp.readFile('./test/demo/media.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/media.vue')
  it('Media.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>

      <template>
        <div max-2xl:bg-red sm:bg-red class=\\"red\\">
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

describe('classSpace.vue', async () => {
  const demo = await fsp.readFile('./test/demo/classSpace.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classSpace.vue')
  it('classSpace.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>
      <template>
        <div bg-red w=\\"[100%]\\" lh-20px class=\\"red\\">
          <div bg-red! w=\\"[100%]\\" class=\\"yellow\\">
            hi
          </div>
        </div>
      </template>
      <style scoped></style>
      "
    `)
  })
})

describe('single demo styleWeight', async () => {
  const demo = await fsp.readFile('./test/demo/styleWeight.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/styleWeight.vue')
  it('styleWeight.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>
      <template>
        <div bg-pink style=\\"hi:123\\" class=\\"red\\">
          nihao
        </div>
        <div bg-yellow class=\\"yellow\\" >
          hi
        </div>
      </template>
      <style scoped></style>
      "
    `)
  })
})

describe('single test', async () => {
  const demo = await fsp.readFile('./test/demo/test.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
  it('single.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<template>
        <button h-32px hover=\\"bg-#67c23a\\" text-red w=\\"[100%]\\">button</button>
      </template>
      <style scoped></style>
      "
    `)
  })
})

describe.only('less test', async () => {
  const demo = await fsp.readFile('./test/demo/less.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
  it('single.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<template>
        <a hover=\\"text-#3071a9\\" href=\\"\\">
          <div text=\\"[#428bca]\\" class=\\"link\\" />
        </a>
      </template>

      <style scoped>.widget {
        color: #fff;
        background: #428bca;
      }
      </style>
      "
    `)
  })
})

describe('single demo vue.tsx', async () => {
  const _path = './test/demo/vue.tsx'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('vue.tsx', async () => {
    const filepath = path.resolve(process.cwd(), _path)

    expect(await transfromCode(demo, {filepath, type:'tsx'})).toMatchInlineSnapshot(`
      "import { defineComponent, ref } from 'vue'
      import './index.css'

      export const component = defineComponent({
        name: 'Component',
        props: {
          title: {
            type: String,
            default: '',
          },
          content: {
            type: String,
            default: '',
          },
        },
        setup(props) {
          const count = ref(0)
          const increment = () => count.value++
          return () => (
            <div>
              <h1 className=\\"red bg-red\\" style=\\"hi:123\\">{props.title}</h1>
              <p>{props.content}</p>
              <div onClick={increment}>
                count: {count.value}
              </div>
            </div>
          )
        },
      })
      "
    `)
  })
})

describe('single demo styleMaxWidth.tsx', async () => {
  const _path = './test/demo/styleMaxWidth.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('vue.tsx', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\"></script>
      <template>
        <div class=\\"red\\">
          nihao
        </div>
        <div max-w=\\"[calc(100%-50px)]\\" bg=\\"[rgba(255,62,0,0.1)]\\" class=\\"yellow\\">
          hi
        </div>
      </template>
      <style scoped></style>
      "
    `)
  })
})
