<script setup lang="ts">
import { computed, ref } from 'vue'
import { VividTyping } from 'vivid-typing'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import { copy, useAnimationFrame } from 'lazy-js-utils'
import gitForkVue from '@simon_he/git-fork-vue'
import { transformVue } from '../../src/transformVue'
import { toUnocss } from '../../src/toUnocss'

const input = ref('')
let pre: any = null
const transform = computed(() => toUnocss(input.value))
let editorComponent: any = null
const editor = ref(null)
const editorResult = ref<HTMLElement>()
const display = ref('')
const styleReg = /<style.*>(.*)<\/style>/s
const classReg = /(.*){/g

const editorInput = ref(`<template>
  <div style="background: red">hi</div>
  <div class="hi">hi</div>
</template>

<style scoped>
  .hi {
    font-size: 20px;
    background: yellow;
  }
</style>
`)
monaco.editor.defineTheme('myTheme', {
  base: 'vs',
  inherit: true,
  rules: [{ background: 'EDF9FA', token: '' }],
  colors: {
    'editor.foreground': '#000000',
    'editor.background': '#EDF9FA',
    'editorCursor.foreground': '#8B0000',
    'editor.lineHighlightBackground': '#0000FF20',
    'editorLineNumber.foreground': '#008800',
    'editor.selectionBackground': '#88000030',
    'editor.inactiveSelectionBackground': '#88000015',
  },
})
monaco.editor.setTheme('myTheme')

onMounted(() => {
  self.MonacoEnvironment = {
    getWorker() {
      return new HtmlWorker()
    },
  }

  editorComponent = monaco.editor.create(editor.value!, {
    value: editorInput.value,
    fontFamily: 'Arial',
    fontSize: 20,
    language: 'html',
  })
})

useAnimationFrame(async () => {
  const newInput = editorComponent!.getValue()
  const code = await transformVue(newInput)
  if (!editorResult.value)
    return
  if (!pre && code) {
    pre = code
    editorResult.value!.innerHTML = ''
    monaco.editor.create(editorResult.value!, {
      value: code,
      language: 'html',
      fontFamily: 'Arial',
      fontSize: 20,
    })

    display.value = codeToHtml(newInput)
  }
  else if (pre !== code) {
    pre = code
    editorResult.value!.innerHTML = ''

    monaco.editor.create(editorResult.value!, {
      value: code,
      language: 'html',
      fontFamily: 'Arial',
      fontSize: 20,
    })
    display.value = codeToHtml(newInput)
  }
}, 200)

function codeToHtml(code: string) {
  return code
    .replace(styleReg, (all, v) =>
      all.replace(
        v,
        v.replace(
          classReg,
          (_: any, match: any) => `[data-v-display]${match} {`,
        ),
      ),
    )
    .replace('<template>', '')
    .replace('<\/template>', '')
}

const copyStyle = () => {
  if (copy(transform.value))
    alert('copy successfully')
}
</script>

<template>
  <gitForkVue
    link="https://github.com/Simon-He95"
    type="trapeziumType"
    position="right"
    content="Follow Me"
    color="pink"
  />
  <VividTyping content="Css To Unocss" text-3xl color-pink py4 text-center />
  <div h="100%" flex justify-center items-center flex-col p="y-10">
    <input
      v-model="input"
      class="!outline-none"
      w="40%"
      text-4
      placeholder="输入css值，如:width:100rem..."
      type="text"
      autocomplete="off"
      p="x6 y4"
      hover:border-pink
      border-1
    >
    <div v-if="transform">
      <h2>结果：</h2>
      <div flex gap-2>
        <div :style="input">
          {{ transform }}
        </div>
        <div
          i-carbon:copy
          cursor-pointer
          hover="color-orange"
          @click="copyStyle"
        />
      </div>
    </div>
    <div v-else>
      <div v-if="input">
        <h2>当前值不对，或匹配错误！</h2>
        如果你输入的是一个合法的值，你可以再这里添加你的例子。
        <a
          href="https://github.com/Simon-He95/transformToUnocss/issues"
          target="_blank"
        >issues</a>
        <div />
      </div>
      <div v-else>
        你可以在<a
          href="https://github.com/Simon-He95/transformToUnocss"
          target="_blank"
        ><b>transform-to-unocss</b></a>查看现在支持的属性，进行体验。已有vite插件和cli版本~
      </div>
    </div>
  </div>
  <div flex>
    <div w="50%">
      <h1 pl2>
        inputs:
      </h1>
      <div ref="editor" h-100 />
    </div>
    <div w="50%">
      <h1 pl2>
        outputs:
      </h1>
      <div ref="editorResult" h-100 pointer-events-none />
    </div>
  </div>
  <h1 pl2>
    render:
  </h1>
  <div pb20 data-v-display v-html="display" />
</template>

<style scoped></style>
