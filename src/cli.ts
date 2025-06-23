import type { SuffixType } from './type'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { setTimeout } from 'node:timers/promises'
import * as p from '@simon_he/clack-prompts'
import colorize from '@simon_he/colorize'
import fg from 'fast-glob'
import { transfromCode } from './transformCode'
import { TRANSFER_FLAG } from './utils'

export async function cli() {
  console.clear()
  await setTimeout(100)
  const s = p.spinner()
  p.intro(
    `${colorize({
      text: colorize({
        text: ' 🚀 Transform Code To Unocss ',
        color: 'black',
      }),
      bgColor: 'cyan',
    })}`,
  )
  const asset = process.argv[2]
  const isRevert = process.argv[3] === '-r' || process.argv[3] === '--revert'
  const isForce = process.argv.includes('--force')
  const isDebug
    = process.argv.includes('--debug') || process.argv.includes('-d')

  if (!asset) {
    p.cancel('❌  Please specify a directory or file path to convert.')
    p.note(
      `Usage: tounocss <directory/file> [options]
Options:
  -r, --revert    Revert the conversion
  --force         Force overwrite existing files
  -d, --debug     Enable debug mode with detailed logging`,
      'Available options:',
    )
    return
  }
  const fileDir = path.resolve(process.cwd(), asset)
  // 如果传入的是一个文件路径，则直接转换这个文件
  if (fs.existsSync(fileDir) && fs.statSync(fileDir).isFile()) {
    p.note(`${fileDir}`, 'Converting file...')
    s.start('Converting...')
    const suffix = fileDir.slice(fileDir.lastIndexOf('.') + 1) as SuffixType
    const code = await fs.promises.readFile(fileDir, 'utf-8')
    const codeTransfer = await transfromCode(code, {
      filepath: fileDir,
      type: suffix,
      debug: isDebug,
    })
    // 创建新文件
    try {
      await fs.promises.writeFile(
        fileDir.replace(`.${suffix}`, `${TRANSFER_FLAG}.${suffix}`),
        codeTransfer,
      )
      s.stop('Conversion completed.')
    }
    catch (error) {
      p.cancel(`❌  Conversion failed: ${error}`)
    }
    return
  }
  // 判断这个目录是否存在
  if (!fs.existsSync(fileDir)) {
    p.cancel(`Directory not found: ${fileDir}`)
    return
  }

  const entries = await fg(
    ['**.vue', '**.tsx', '**.html', '**.svelte', '**.astro'],
    { cwd: fileDir },
  )
  if (!entries.length) {
    p.cancel('No convertible files found in the specified directory.')
    return
  }

  p.note(`${fileDir}`, 'Converting directory...')

  s.start('Converting...')
  await Promise.all(
    entries
      .filter(entry => !entry.includes(TRANSFER_FLAG))
      .map(async (entry) => {
        const filepath = path.join(fileDir, entry)
        const suffix = entry.slice(entry.lastIndexOf('.') + 1) as SuffixType

        const newfilepath = filepath.endsWith(TRANSFER_FLAG)
          ? filepath
          : filepath.replace(`.${suffix}`, `${TRANSFER_FLAG}.${suffix}`)
        if (fs.existsSync(newfilepath)) {
          if (isRevert) {
            try {
              await fs.promises.unlink(newfilepath)
              p.note(
                colorize({ text: newfilepath, color: 'cyan' }),
                colorize({ text: 'Revert succeeded', color: 'green' }),
              )
            }
            catch (error) {
              p.note(
                colorize({ text: newfilepath, color: 'cyan' }),
                colorize({ text: `Revert failed: ${error}`, color: 'red' }),
              )
            }
            return
          }
          if (isForce) {
            // Overwrite
          }
          else {
            p.note(
              colorize({ text: newfilepath, color: 'cyan' }),
              colorize({
                text: 'Skipped (use --force to overwrite)',
                color: 'yellow',
              }),
            )
            return
          }
        }
        else if (isRevert) {
          return
        }
        const code = await fs.promises.readFile(filepath, 'utf-8')
        const codeTransfer = await transfromCode(code, {
          filepath,
          type: suffix,
          debug: isDebug,
        })
        try {
          await fs.promises.writeFile(newfilepath, codeTransfer)
          p.note(
            colorize({ text: newfilepath, color: 'cyan' }),
            colorize({
              text: `Transfer succeeded${isForce ? ' (overwritten)' : ''}`,
              color: 'green',
            }),
          )
        }
        catch (error) {
          p.note(
            colorize({ text: newfilepath, color: 'cyan' }),
            colorize({ text: `Transfer failed: ${error}`, color: 'red' }),
          )
        }
      }),
  )
  s.stop('Conversion completed.')
  p.outro('✅ All files have been processed.')
}

cli()
