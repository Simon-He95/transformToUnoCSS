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

    expect(contents.filter(Boolean)).toMatchSnapshot()
  })
})

describe('single demo classWeight', async () => {
  const demo = await fsp.readFile('./test/demo/classWeight.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classWeight.vue')
  it('classWeight.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue',isJsx:true})).toMatchSnapshot()
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

describe('less vue test', async () => {
  const demo = await fsp.readFile('./test/demo/less.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
  it('single.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<template>
      	<div mx-auto my-0 border-1px border-solid border=\\"[#f00]\\" flex justify-center flex-col items-center class=\\"box\\">
      		<UsePinia />
      		<br />
      		<router-link to=\\"/login\\">点击跳转至login</router-link>
      	</div>
      </template>
      <script lang=\\"ts\\">
      import { defineComponent } from 'vue';
      export default defineComponent({
      	name: 'index',
      	components: {
      	},
      	setup() {
      		const state = reactive({
      			test: 'index',
      		})
      		return {
      			...toRefs(state),
      		}
      	}
      });
      </script>
      <style scoped></style>
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

describe('sass vue test', async () => {
  const _path = './test/demo/sass.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('sass.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\">
      // This starter template is using Vue 3 <script setup> SFCs
      // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
      </script>

      <template>
        <RouterView></RouterView>
      </template>

      <style>
      .size, html #app,
      body #app, html,
      body {
        width: 100%;
        height: 100%;
      }
      html,
      body {
        padding: 0 !important;
        margin: 0;
        overflow: hidden;
      }
      .namespace-app-grey-mode {
        filter: grayscale(100%);
      }
      </style>
      "
    `)
  })
})

describe('stylus vue test', async () => {
  const _path = './test/demo/stylus.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('sass.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\">
      // This starter template is using Vue 3 <script setup> SFCs
      // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
      </script>

      <template>
        <RouterView></RouterView>
      </template>

      <style>
      .size,
      html,
      body,
      html #app,
      body #app {
        width: 100%;
        height: 100%;
      }
      html,
      body {
        padding: 0 !important;
        margin: 0;
        overflow: hidden;
      }
      </style>
      "
    `)
  })
})
