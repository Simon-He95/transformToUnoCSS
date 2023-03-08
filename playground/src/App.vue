<script setup lang="ts">
import { computed, ref } from 'vue'
import { VividTyping } from 'vivid-typing'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import { copy, useAnimationFrame, useFocus } from 'lazy-js-utils'
import gitForkVue from '@simon_he/git-fork-vue'
import { useI18n } from 'vue-i18n'
import { transformVue } from '../../src/transformVue'
import { toUnocss } from '../../src/toUnocss'
const { t, locale } = useI18n()

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
  <button>button</button>
</template>

<style scoped>
  button {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    padding:8px 15px;
    border-radius: 4px;
    border:none;
    box-sizing: border-box;
    color:#fff;
    background-color: #409eff;
  }
  button:hover{
    background-color:#67c23a ;
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
  useFocus('input') // 自动聚焦input

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
  if ((!pre && code) || pre !== code) {
    pre = code
    editorResult.value!.innerHTML = ''
    monaco.editor.create(editorResult.value!, {
      value: code,
      language: 'html',
      fontFamily: 'Arial',
      fontSize: 20,
      readOnly: true,
      acceptSuggestionOnEnter: 'smart',
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

const isCopy = ref(false)
const copyStyle = () => {
  if (copy(transform.value))
    isCopy.value = true

  setTimeout(() => {
    isCopy.value = false
  }, 1000)
}

const changelanguage = () => {
  if (locale.value === 'en')
    locale.value = 'zh'
  else locale.value = 'en'
}
</script>

<template>
  <div
    i-fa:language
    absolute
    top-2
    left-4
    cursor-pointer
    z-2
    @click="changelanguage"
  />
  <gitForkVue
    link="https://github.com/Simon-He95"
    type="trapeziumType"
    position="right"
    content="Follow Me"
    color="pink"
  />
  <VividTyping
    content="Css To Unocss"
    animate-bounce-alt
    animate-delay-1500
    animate-count-infinite
    animate-duration-1s
    text-3xl
    color-pink
    py6
    text-center
  />
  <div h="100%" flex justify-center items-center flex-col p="y10">
    <input
      v-model="input"
      class="!outline-none"
      w="40%"
      text-4
      :placeholder="t('placeholder')"
      type="text"
      autocomplete="off"
      p="x6 y4"
      hover:border-pink
      border-1
    >
    <div v-if="transform" flex="~ gap-4" h-20 items-center>
      <h2>{{ t('result') }}</h2>

      <div flex gap-2 items-center>
        {{ transform }}

        <div
          :class="[
            isCopy
              ? 'i-carbon:checkmark-outline text-green!'
              : ' i-carbon:copy',
          ]"
          cursor-pointer
          hover="color-orange"
          @click="copyStyle"
        />
      </div>
    </div>
    <template v-else>
      <template v-if="input">
        <div h-20 v-html="t('issue')" />
      </template>
      <template v-else>
        <div h-20 box-border pt6 v-html="t('find')" />
      </template>
    </template>
  </div>
  <div flex>
    <div w="50%">
      <h1 pl2>
        {{ t('inputs') }}
      </h1>
      <div ref="editor" h-100 />
    </div>
    <div w="50%">
      <h1 pl2>
        {{ t('outputs') }}
      </h1>
      <div ref="editorResult" h-100 />
    </div>
  </div>
  <h1 pl2>
    {{ t('render') }}
  </h1>
  <div pb20 data-v-display v-html="display" />
</template>

<style scoped></style>
