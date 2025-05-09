<script setup lang="ts"></script>

<template>
  <div id="test" style="background: red; width: 100%; line-height: 20px">
    <div class="red yellow green">
      n1
    </div>
    <div class="red">
      n2
    </div>
  </div>
</template>

<style scoped>
#test div.red.yellow.green:nth-last-child(1) {
  color: yellow;
}
</style>
