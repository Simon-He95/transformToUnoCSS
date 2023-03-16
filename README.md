<p align="center">
<img height="200" src="./assets/kv.png" alt="to unocss">
</p>

This library is to convert css in vue to unocss. [unocss](https://github.com/unocss/unocss) can reuse styles better to reduce the packaging volume, which can be converted as a performance optimization method, and it can also make it easier for old projects to upgrade to unocss

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
import { vitePluginTransformToUnocss } from 'transform-to-unocss'
export default defineConfig({
  plugins: [vitePluginTransformToUnocss(/* options */)],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { resolve } from 'path'
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

# ⭐ Feature

- support css in '.html' | '.tsx' | '.vue' | '.astro' | '.svelte' to unocss
- support sass less stylus convert
- support vite | rollup | webpack | vue-cli | esbuild

## Before

![before](/assets/before.png)

## After

![after](/assets/after.png)

## :coffee:

[请我喝一杯咖啡](https://github.com/Simon-He95/sponsor)

## License

[MIT](./license)
