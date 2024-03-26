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
      "<template>
      	<div mx-auto my-0 border-1px border-solid border=\\"[#f00]\\" flex justify-center flex-col items-center class=\\"box\\">
      		<UsePinia />
      		<br />
      		<router-link to=\\"/login\\">点击跳转至login</router-link>
      		<br /><br />
      		<router-link to=\\"/vueUse\\">点击跳转至vueUse页面</router-link>
      		<br /><br />
      		<router-link to=\\"/request\\">点击跳转至request请求页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test\\">点击跳转至test页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test1\\">点击跳转至test1页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test2\\">点击跳转至test2页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test3\\">点击跳转至test3页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test4\\">点击跳转至test4页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test5\\">点击跳转至test5页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test6\\">点击跳转至test6页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test7\\">点击跳转至test7页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test8\\">点击跳转至test8页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test9\\">点击跳转至test9页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test10\\">点击跳转至test10页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test11\\">点击跳转至test11页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test12\\">点击跳转至test12页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test13\\">点击跳转至test13页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test14\\">点击跳转至test14页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test15\\">点击跳转至test15页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test16\\">点击跳转至test16页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test17\\">点击跳转至test17页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test18\\">点击跳转至test18页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test19\\">点击跳转至test19页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test20\\">点击跳转至test20页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test21\\">点击跳转至test21页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test22\\">点击跳转至test22页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test23\\">点击跳转至test23页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test24\\">点击跳转至test24页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test25\\">点击跳转至test25页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test26\\">点击跳转至test26页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test27\\">点击跳转至test27页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test28\\">点击跳转至test28页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test29\\">点击跳转至test29页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test30\\">点击跳转至test30页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test31\\">点击跳转至test31页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test32\\">点击跳转至test32页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test33\\">点击跳转至test33页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test34\\">点击跳转至test34页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test35\\">点击跳转至test35页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test36\\">点击跳转至test36页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test37\\">点击跳转至test37页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test38\\">点击跳转至test38页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test39\\">点击跳转至test39页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test40\\">点击跳转至test40页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test41\\">点击跳转至test41页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test42\\">点击跳转至test42页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test43\\">点击跳转至test43页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test44\\">点击跳转至test44页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test45\\">点击跳转至test45页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test46\\">点击跳转至test46页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test47\\">点击跳转至test47页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test48\\">点击跳转至test48页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test49\\">点击跳转至test49页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test50\\">点击跳转至test50页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test51\\">点击跳转至test51页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test52\\">点击跳转至test52页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test53\\">点击跳转至test53页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test54\\">点击跳转至test54页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test55\\">点击跳转至test55页面</router-link>
      		<br /><br />
      		<router-link to=\\"/test56\\">点击跳转至test56页面</router-link>
      		<br /><br />
      	</div>
      </template>
      <script lang=\\"ts\\">
      import { defineComponent, reactive, toRefs } from 'vue';
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
