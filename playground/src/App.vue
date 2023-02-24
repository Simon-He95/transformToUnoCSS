<script setup lang="ts">
import { computed, ref } from 'vue'
import { transformToUnocss } from 'transform-to-unocss'
const message = ref('')
const transform = computed(() => {
  return transformToUnocss(message.value)
})
</script>

<template>
  <div w="100%" h="100%" flex justify-center items-center flex-col p="y-10">
    <input
      v-model="message"
      class="!outline-none"
      w="40%"
      text-4
      placeholder="输入css值，如:width:100rem..."
      type="text"
      autocomplete="off"
      p="x6 y4"
      border-1
    >
    <div v-if="transform">
      <h2>结果：</h2>
      <div>{{ transform }}</div>
    </div>
    <div v-else>
      <div v-if="message">
        <h2>当前值不对，或匹配错误！</h2>
        如果你输入的是一个合法的值，你可以再这里添加你的例子。
        <a
          href="https://github.com/geekris1/unocss-reverse/issues"
          target="_blank"
        >issues</a>
        <div />
      </div>
      <div v-else>
        <h2>正在开发中...</h2>

        你可以在<a
          href="https://github.com/Simon-He95/transformToUnocss"
          target="_blank"
        ><b>transform-to-unocss</b></a>查看现在支持的属性，进行体验。
      </div>
    </div>
  </div>
</template>

<style scoped></style>
