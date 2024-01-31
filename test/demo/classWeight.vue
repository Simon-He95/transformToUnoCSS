<script setup lang="ts">
const nihao = ref(true)
</script>

<template>
  <div class="red" style="height: 100%; transform: scale(1.5);" :class="[nihao?'w-10':'bg-red']">
    nihao
  </div>
  <div>hi</div>
</template>

<style scoped>
.red {
  background-color: red;
  width: 100%;
}

div.red {
  background-color: yellow;
}
</style>
