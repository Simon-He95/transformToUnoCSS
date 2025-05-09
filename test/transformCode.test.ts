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
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('single demo classTail', async () => {
  const demo = await fsp.readFile('./test/demo/classTail.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classTail.vue')
  it('classTail.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('single demo Media', async () => {
  const demo = await fsp.readFile('./test/demo/media.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/media.vue')
  it('Media.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('classSpace.vue', async () => {
  const demo = await fsp.readFile('./test/demo/classSpace.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classSpace.vue')
  it('classSpace.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('single demo styleWeight', async () => {
  const demo = await fsp.readFile('./test/demo/styleWeight.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/styleWeight.vue')
  it('styleWeight.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('single test', async () => {
  const demo = await fsp.readFile('./test/demo/test.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
  it('single.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('less vue test', async () => {
  const demo = await fsp.readFile('./test/demo/less.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
  it('single.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('single demo vue.tsx', async () => {
  const _path = './test/demo/vue.tsx'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('vue.tsx', async () => {
    const filepath = path.resolve(process.cwd(), _path)

    expect(await transfromCode(demo, {filepath, type:'tsx'})).toMatchSnapshot()
  })
})

describe('single demo styleMaxWidth.tsx', async () => {
  const _path = './test/demo/styleMaxWidth.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('vue.tsx', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('sass vue test', async () => {
  const _path = './test/demo/sass.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('sass.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('stylus vue test', async () => {
  const _path = './test/demo/stylus.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('stylus.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('demo1 vue test', async () => {
  const _path = './test/demo/demo1.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('demo1.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('demo2 vue test', async () => {
  const _path = './test/demo/demo2.vue'
  const demo = await fsp.readFile(_path, 'utf-8')
  it('demo2.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('demo3 vue test', async () => {
  const _path = './test/demo/demo3.vue'
  const demo = await fsp.readFile(_path, 'utf-8')
  it('demo2.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})

describe('nth vue test', async () => {
  const _path = './test/demo/nth.vue'
  const demo = await fsp.readFile(_path, 'utf-8')
  it('nth.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})
