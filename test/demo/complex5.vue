<template>
  <div
    class="avatar"
    :style="{
      width: size,
      height: size,
    }"
  >
    <img
      class="w-full h-full"
      v-if="avatar && !failedImg"
      :src="avatar"
      alt="avatar"
      draggable="false"
      @error="failedImg = true"
    />
    <img
      v-else-if="!isOneToOne && (failedImg || !avatar)"
      class="w-full h-full p-1"
      draggable="false"
      :src="computedSrc"
      :style="{
        background: computedBg,
      }"
    />
    <img
      class="w-full h-full"
      v-else-if="isOneToOne && (failedImg || !avatar)"
      draggable="false"
      src="https://storage-zm-s3.cdn.zenmen.com/zmchat-avatar/66c2701be4acd73673516aa62a4bc4f1+9cbbf63d-28e8-4111-be5e-094c7446ff6d"
    />
    <div
      :class="['unread-cnt', isMute ? 'mute' : '']"
      v-if="unreadCnt && unreadCnt > 0"
    >
      {{ unreadCnt > 99 ? '99+' : unreadCnt }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

import bg_0 from '@renderer/apps/nextim/assets/channel/default_group_avatar_0.svg'
import bg_1 from '@renderer/apps/nextim/assets/channel/default_group_avatar_1.svg'
import bg_2 from '@renderer/apps/nextim/assets/channel/default_group_avatar_2.svg'
import bg_3 from '@renderer/apps/nextim/assets/channel/default_group_avatar_3.svg'
import bg_4 from '@renderer/apps/nextim/assets/channel/default_group_avatar_4.svg'
import bg_5 from '@renderer/apps/nextim/assets/channel/default_group_avatar_5.svg'

const getImage = (index: number) => {
  switch (index) {
    case 0:
      return bg_0
    case 1:
      return bg_1
    case 2:
      return bg_2
    case 3:
      return bg_3
    case 4:
      return bg_4
    case 5:
      return bg_5
    default:
      break
  }
}
const colorArray: string[] = [
  '#DC26261a',
  '#D977061a',
  '#7C3AED1a',
  '#EA580C1a',
  '#0596691a',
  '#0D94881a',
]

function randomBackgroundColor(seed: number): number {
  // console.log('seed', seed)
  const index = seed % colorArray.length
  return index
}
const props = withDefaults(
  defineProps<{
    avatar?: string
    name: string
    unreadCnt?: number
    colorSeed: number
    isMute?: boolean
    size?: string
    isOneToOne: boolean
  }>(),
  {
    size: '32px',
    isMute: false,
  },
)
// console.log(props.avatar)
const failedImg = ref(false)

const bgColorIdx = computed(() => {
  const res = randomBackgroundColor(props.colorSeed)
  return res
})
const computedSrc = computed(() => {
  const index = bgColorIdx.value
  switch (index) {
    case 0:
      return bg_0
    case 1:
      return bg_1
    case 2:
      return bg_2
    case 3:
      return bg_3
    case 4:
      return bg_4
    case 5:
      return bg_5
    default:
      break
  }
})
const computedBg = computed(() => {
  return colorArray[bgColorIdx.value]
})
</script>
<style lang="scss" scoped>
.avatar {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  position: relative;
  img {
    border-radius: 8px;
    object-fit: contain;
  }
  .unread-cnt {
    position: absolute;
    right: -8px;
    top: -8px;
    display: flex;
    padding: 0px 3px;
    min-width: 18px;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #fff;
    background: #ff6b6b;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    color: #fff;
    &.mute {
      background: #94a1b6;
    }
  }
}
</style>
