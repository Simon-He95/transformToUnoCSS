import fsp from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'

describe('transformCode', () => {
  it('transformCode: all', async () => {
    const demos = await fsp.readdir('./test/demo')
    const contents = await Promise.all(
      demos.map(async (demo) => {
        const url = `./test/demo/${demo}`
        const filepath = path.resolve(process.cwd(), url)
        const suffix = demo.endsWith('.vue')
          ? 'vue'
          : demo.endsWith('.tsx')
            ? 'tsx'
            : ''
        if (!suffix) return

        return `\n\n-----    ${demo}     -------\n\n${await transfromCode(
          await fsp.readFile(url, 'utf-8'),
          {
            filepath,
            type: suffix,
          },
        )}`
      }),
    )

    await expect(contents.filter(Boolean)).toMatchFileSnapshot(
      './__snapshots__/all.test.ts.snap',
    )
  })
})

describe('single demo classWeight', async () => {
  const demo = await fsp.readFile('./test/demo/classWeight.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classWeight.vue')
  it('classWeight.vue', async () => {
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classWeight.test.ts.snap')
  })
})

describe('single demo classCombine', () => {
  it('classCombine.vue', async () => {
    const demo = await fsp.readFile('./test/demo/classCombine.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/classCombine.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classCombine.test.ts.snap')
  })
})

describe('single demo classTail', () => {
  it('classTail.vue', async () => {
    const demo = await fsp.readFile('./test/demo/classTail.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/classTail.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classTail.test.ts.snap')
  })
})

describe('single demo Media', () => {
  it('media.vue', async () => {
    const demo = await fsp.readFile('./test/demo/media.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/media.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/media.test.ts.snap')
  })
})

describe('classSpace.vue', () => {
  it('classSpace.vue', async () => {
    const demo = await fsp.readFile('./test/demo/classSpace.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/classSpace.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classSpace.test.ts.snap')
  })
})

describe('single demo styleWeight', () => {
  it('styleWeight.vue', async () => {
    const demo = await fsp.readFile('./test/demo/styleWeight.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/styleWeight.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/styleWeight.test.ts.snap')
  })
})

describe('single test', () => {
  it('single.vue', async () => {
    const demo = await fsp.readFile('./test/demo/test.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/test.test.ts.snap')
  })
})

describe('single demo vue.tsx', () => {
  it('vue.tsx', async () => {
    const _path = './test/demo/vue.tsx'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'tsx' }),
    ).toMatchFileSnapshot('./__snapshots__/vue.test.ts.snap')
  })
})

describe('single demo test-1.vue', () => {
  it('test-1.vue', async () => {
    const _path = './test/demo/test-1.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/test-1.test.ts.snap')
  })
})

describe('single demo complex1.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex1.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex1.test.ts.snap')
  })
})

describe('single demo complex2.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex2.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex2.test.ts.snap')
  })
})

describe('single demo complex3.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex3.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex3.test.ts.snap')
  })
})

describe('single demo complex4.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex4.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex4.test.ts.snap')
  })
})

describe('single demo complex5.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex5.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex5.test.ts.snap')
  })
})

describe('single demo complex6.vue', async () => {
  const _path = './test/demo/complex6.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('complex.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex6.test.ts.snap')
  })
})
