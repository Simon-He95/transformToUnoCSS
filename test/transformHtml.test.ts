import fsp from 'node:fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { transformHtml } from '../src/transformHtml'

describe('accent', () => {
  it('accent-color: inherit;', async () => {
    const html = await fsp.readFile('./test/demo/index.html', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/index.html')

    expect(await transformHtml(html, filepath)).toMatchInlineSnapshot(
   `
      "<!DOCTYPE html>
      <html lang=\\"en\\">
      <head>
        <meta charset=\\"UTF-8\\">
        <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\">
        <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">
        <title>Document</title>
        <link rel=\\"stylesheet\\" href=\\"./index.css\\"></head>
      <body>
        <div class=\\"red text-10px\\">hello world</div>
      </body>
      </html>
      "
    `)
  })
})
