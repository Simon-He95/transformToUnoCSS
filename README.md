<p align="center">
<img height="200" src="./assets/kv.png" alt="to unocss">
</p>
<p align="center"> English | <a href="./README_zh.md">简体中文</a></p>
This library is to convert css to unocss. <a href="https://github.com/unocss/unocss">unocss</a> can reuse styles better to reduce the packaging volume, which can be converted as a performance optimization method, and it can also make it easier for old projects to upgrade to unocss. If you use <a href="https://tailwindcss.com/">tailwindcss</a>, you can try <a href="https://github.com/Simon-He95/transformToTailwindcss">transformToTailwindcss</a>.

## 📦 Install

```
  npm i -g transform-to-unocss
```

## 🦄 cli

```
  ## command: tounocss + directory
  tounocss playground

  ## revoke: tounocss + directory + --revert
  tounocss payground --revert
```

## 🌈 Usage

<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { viteTransformToUnocss } from 'transform-to-unocss'
export default defineConfig({
  plugins: [viteTransformToUnocss(/* options */)],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { resolve } from 'node:path'
import { rollupTransformToUnocss } from 'transform-to-unocss'
export default {
  plugins: [rollupTransformToUnocss(/* options */)],
}
```

</details>
<br>
<details>
<summary>Webpack</summary>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('transform-to-unocss').webpackTransformToUnocss({
      /* options */
    }),
  ],
}
```

</details>
<br>
<details>
<summary>Vue CLI</summary>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('transform-to-unocss').webpackTransformToUnocss({
        /* options */
      }),
    ],
  },
}
```

</details>
<br>
<details>
<summary>Esbuild</summary>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import { esbuildTransformToUnocss } from 'transform-to-unocss'

build({
  plugins: [esbuildTransformToUnocss(/* options */)],
})
```

</details>

## ⭐ Feature

- support css in '.html' | '.tsx' | '.vue' | '.astro' | '.svelte' to unocss
- support sass less stylus convert
- support vite | rollup | webpack | vue-cli | esbuild
- vscode extension [To Unocss](https://github.com/Simon-He95/unot)

## 🚁 More

- [transform-to-unocss-core](https://github.com/Simon-He95/transform-to-unocss-core) - Provides the ability to convert css to unocss on the browser side

## Before

![before](/assets/before.png)

## After

![after](/assets/after.png)

## :coffee:

[buy me a cup of coffee](https://github.com/Simon-He95/sponsor)

## License

[MIT](./license)
