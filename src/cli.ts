import path from 'path'
import fsp from 'fs/promises'
import fg from 'fast-glob'
import { transfromCode } from './transformCode'
export async function cli() {
  const fileDir = path.resolve(process.cwd(), process.argv[2])
  console.log(fileDir)

  const entries = await fg(['**.vue'], { cwd: fileDir })
  entries.forEach(async (entry) => {
    const code = await fsp.readFile(`${fileDir}/${entry}`, 'utf-8')
    transfromCode(code)
  })
}
