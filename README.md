<p align="center">
<img height="200" src="./assets/kv.png" alt="to unocss">
</p>

# Install

```
  npm i -g transform-to-unocss
```

# cli

```
  转换：tounocss + 目录
  tounocss playground
  撤销： tounocss + 目录 + --revert
  tounocss payground --revert
```

# vite

```
  import { vitePluginTransformToUnocss } from 'transform-to-unocss'
  plugins: [ vitePluginTransformToUnocss() ]
```

# Feature

- transform class to unocss

## Before

![before](/assets/before.png)

## After

![after](/assets/after.png)

# todo

- [x] support xx + xx
- [ ] support attribute selector .xx[]
- [x] support .a.b
