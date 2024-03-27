<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="styl">
$prefix-cls = name-app

.size {
  width: 100%
  height: 100%
}

html,
body {
  @extend .size
  padding: 0 !important
  margin: 0
  overflow: hidden
  #app {
    @extend .size
  }
}
.$prefix-cls-grey-mode {
  filter: grayscale(100%);
}

</style>
