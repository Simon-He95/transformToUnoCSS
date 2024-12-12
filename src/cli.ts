import type { SuffixType } from './type'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import colorize from '@simon_he/colorize'
import fg from 'fast-glob'
import { transfromCode } from './transformCode'
import { flag } from './utils'

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
  const entries = await fg(
    ['**.vue', '**.tsx', '**.html', '**.svelte', '**.astro'],
    { cwd: fileDir },
  )
  entries
    .filter(entry => !entry.endsWith(flag))
    .forEach(async (entry) => {
      const filepath = `${fileDir}/${entry}`
      const suffix = entry.slice(entry.lastIndexOf('.') + 1) as SuffixType

      const newfilepath = filepath.endsWith(flag)
        ? filepath
        : filepath.replace(`.${suffix}`, `${flag}.${suffix}`)
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
      const codeTransfer = await transfromCode(code, { filepath, type: suffix })
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
