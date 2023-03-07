import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    placeholder: 'Enter the css value, such as: width:100rem...',
    result: 'Result:',
    match: 'The current value is wrong, or the matching error!',
    demo: 'If you enter a legal value, you can add your example here.',
    issue: `<h2>The current value is wrong, or the matching error</h2>
    If you enter a legal value, you can add your example here.
    <a
          href="https://github.com/Simon-He95/transformToUnocss/issues"
          target="_blank"
        >issues</a>`,
    find: `You can view the currently supported properties in <a
      href="https://github.com/Simon-He95/transformToUnocss"
      target="_blank"
    ><b>transform-to-unocss</b></a> and experience it.
<div>Already have vite plugin and cli version~</div>`,
    inputs: 'inputs:',
    outputs: 'outputs:',
    render: 'render:',
  },
  zh: {
    placeholder: '输入css值，如:width:100rem...',
    result: '结果:',
    issue: `<h2>当前值不对，或匹配错误！</h2>
    如果你输入的是一个合法的值，你可以再这里添加你的例子。
    <a
          href="https://github.com/Simon-He95/transformToUnocss/issues"
          target="_blank"
        >issues</a>`,
    find: ` 你可以在<a
      href="https://github.com/Simon-He95/transformToUnocss"
      target="_blank"
    ><b>transform-to-unocss</b></a>查看现在支持的属性，进行体验。
    <div>已有vite插件和cli版本~</div>`,
    inputs: '输入:',
    outputs: '输出:',
    render: '渲染:',
  },
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages,
})

export default i18n
