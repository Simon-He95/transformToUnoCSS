import path from 'path'
import fs from 'fs'
import fg from 'fast-glob'
import colorize from '@simon_he/colorize'
import { transfromCode } from './transformCode'

const log = console.log

export async function cli() {
  const asset = process.argv[2]

  if (!asset) {
    log(
      colorize({
        text: '需要指定一个目录',
        color: 'red',
      }),
    )
    return
  }
  const fileDir = path.resolve(process.cwd(), asset)
  const isRevert = process.argv[3] === '-r' || process.argv[3] === '--revert'
  const entries = await fg(['**.vue'], { cwd: fileDir })
  const flag = '.__unocss_transfer__.vue'
  entries
    .filter(entry => !entry.endsWith(flag))
    .forEach(async (entry) => {
      const filepath = `${fileDir}/${entry}`
      const newfilepath = filepath.endsWith(flag)
        ? filepath
        : filepath.replace('.vue', flag)
      if (fs.existsSync(newfilepath)) {
        if (isRevert) {
          // 删除
          try {
            await fs.promises.unlink(newfilepath)
            log(
              colorize({
                text: `${newfilepath} already revert`,
                color: 'green',
              }),
            )
          }
          catch (error) {
            log(
              colorize({
                text: `revert failed: ${error}`,
                color: 'red',
              }),
            )
          }
          return
        }
        log(
          colorize({
            text: `${newfilepath} has transferred`,
            color: 'yellow',
          }),
        )
        return
      }
      else if (isRevert) {
        return
      }
      const code = await fs.promises.readFile(filepath, 'utf-8')
      const codeTransfer = transfromCode(code)
      // 创建新文件
      try {
        await fs.promises.writeFile(newfilepath, codeTransfer)
        log(
          colorize({
            text: `${newfilepath} transfer succeed`,
            color: 'green',
          }),
        )
      }
      catch (error) {
        log(
          colorize({
            text: `${newfilepath} transfer failed: ${error}`,
            color: 'red',
          }),
        )
      }
    })
}
cli()
