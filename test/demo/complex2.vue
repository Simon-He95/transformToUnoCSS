<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    loading?: boolean
    title?: string
  }>(),
  {
    loading: () => false,
  },
)
</script>

<template>
  <div class="z-loading">
    <div class="z-loading__bg" v-if="loading"></div>
    <div
      class="-z-loader bg-slate-950/80 rounded-md h-[84px] flex flex-col justify-center items-center p-4"
      v-if="loading"
    >
      <img
        class="z-load-icon"
        src="@renderer/apps/nextim/assets/loading.svg"
        alt=""
      />
      <div
        v-if="title"
        class="text-center text-slate-50 text-sm font-normal mt-2"
      >
        {{ title }}
      </div>
    </div>

    <slot> </slot>
  </div>
</template>
<style scoped lang="scss">
.z-loading {
  position: relative;
  width: 100%;
  //height: 100%;
  top: 0;
  bottom: 0;
  .z-loading__bg {
    position: absolute;
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    z-index: 999;
  }
}
.-z-loader {
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 88px;
  height: 84px;
  transform: translate(-50%, -50%);
}
.z-load-icon {
  //loading 旋转动画
  animation: rotate 1s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
