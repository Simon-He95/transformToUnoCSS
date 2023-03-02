<script setup lang="ts"></script>

<template>
  <div class="red" name="hi" haha>
    nihao
  </div>
  <div class="yellow">
    hi
  </div>
</template>

<style scoped>
.red[haha] {
  background-color: red;
}

.red[class='red'] {
  width: 100%;
}

.red[name='hi'] {
  height: 100%;
}

.red + div {
  height: 100%;
}
</style>
