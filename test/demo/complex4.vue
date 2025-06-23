<script lang="ts" setup>
import { i18nHelper } from '@i18n/i18n.helper'
import fileExcel from '@renderer/apps/nextim/assets/message/file/file-excel.svg'
import filePdf from '@renderer/apps/nextim/assets/message/file/file-pdf.svg'
import filePpt from '@renderer/apps/nextim/assets/message/file/file-ppt.svg'
import fileUnknow from '@renderer/apps/nextim/assets/message/file/file-unknow.svg'
import fileWord from '@renderer/apps/nextim/assets/message/file/file-word.svg'
import ZProgress from '@renderer/apps/nextim/components/widgets/progress/ZProgress.vue'
import { msgStore, useMessageStore } from '@renderer/apps/nextim/stores/message'
import type { Message } from '@renderer/apps/nextim/stores/message.type'
import { useSettingStore } from '@renderer/apps/nextim/stores/setting'
import { zUnsafePreload } from '@src/preload'
import { vElementVisibility } from '@vueuse/components'
import { filesize } from 'filesize'
import { throttle } from 'lodash-es'
import { computed, onMounted, ref, watchEffect } from 'vue'

const settings = useSettingStore()
const shouldDownloadOptShow = computed(() => {
  return !msgUIState.value.fileExists
})
const fileDownloadedPath = computed(() => {
  return msgStore.messageUIStateDict[
    `${props.msg.channel_id}_${props.msg.cmid}`
  ].fileDownloadedPath
})
const shouldUploadDetailShow = computed(() => {
  return fileDirection.value === 'upload'
})
const shouldUploadOptShow = computed(() => {
  return !(msgUIState.value.fileUploaded && msgUIState.value.status == 0)
})
onMounted(async () => {
  // updateProgressStatus()
  // await msgStore.messageUIStateDict[
  //   `${props.msg.channel_id}_${props.msg.cmid}`
  // ].checkFileDownloadPath()
})

const msgUIState = computed(() => {
  return msgStore.messageUIStateDict[
    `${props.msg.channel_id}_${props.msg.cmid}`
  ]
})
const fileDirection = computed(() => {
  return msgUIState.value.fileDirection
})
// const progressStatus = ref('paused' as 'started' | 'paused')
const progressStatus = computed({
  set(val: 'started' | 'paused') {
    msgUIState.value.downloadStatus = val
  },
  get() {
    return msgUIState.value.downloadStatus
  },
})
const uploadStatus = computed({
  set(val: any) {
    msgUIState.value.uploadStatus = val
  },
  get() {
    return msgUIState.value.uploadStatus
  },
})
const downloadStatus = ref('idle')
const props = defineProps<{
  url?: string
  mimeType?: string
  name: string
  size?: number
  progress: number
  msg: Message
  filePath?: string //仅用于上传逻辑中的使用
  self: boolean
}>()
watchEffect(() => {
  if (!props.filePath) {
    progressStatus.value = 'paused'
  } else {
    downloadStatus.value = 'downloaded'
  }
})
const messageStore = useMessageStore()
const opening = false

const tryOpen = async () => {
  try {
    console.log('tryOpen', msgUIState, props.filePath)
    if (props.self) {
      //打开自己上传的文件
      const filePath = await zUnsafePreload.invokeRoute({
        channel: 'message',
        route: 'getUploadFilePath',
        payload: {
          channelId: props.msg.channel_id,
          cmid: props.msg.cmid,
        },
      })
      console.log('filePath', filePath)
      if (filePath) {
        const exists = await messageStore.openFile({
          filePath,
          channelId: props.msg.channel_id,
          cmid: props.msg.cmid,
        })
        if (!exists) {
          console.log('文件不存在还原ui状态')
          msgStore.messageUIStateDict[
            `${props.msg.channel_id}_${props.msg.cmid}`
          ].resetFile()
        }
      } else {
        msgStore.remindFileNotFound(props.msg.channel_id, props.msg.cmid)
        msgStore.messageUIStateDict[
          `${props.msg.channel_id}_${props.msg.cmid}`
        ].resetFile()
      }
    } else {
      //获取路径
      const filePath = await zUnsafePreload.invokeRoute({
        channel: 'message',
        route: 'getFilePath',
        payload: {
          channelId: props.msg.channel_id,
          cmid: props.msg.cmid,
        },
      })
      if (filePath) {
        const exists = await messageStore.openFile({
          filePath,
          channelId: props.msg.channel_id,
          cmid: props.msg.cmid,
        })
        if (!exists) {
          msgStore.messageUIStateDict[
            `${props.msg.channel_id}_${props.msg.cmid}`
          ].resetFile()
        }
      } else {
        msgStore.remindFileNotFound(props.msg.channel_id, props.msg.cmid)
        msgStore.messageUIStateDict[
          `${props.msg.channel_id}_${props.msg.cmid}`
        ].resetFile()
      }
    }
  } catch (e) {}
}
const tryOpenThrottled = throttle(tryOpen, 1000, {
  leading: true,
  trailing: true,
})
//progress应该来源于uploadCache
const downloadProgress = computed(() => {
  return msgUIState.value.downloadProgress
})
const showName = computed(() => {
  return ellipsis(props.name, 50)
})
const showSize = computed(() => {
  if (isDownloading.value) {
    return i18nHelper.get().file.downloading
  }
  if (uploadStatus.value === 'started' && shouldUploadOptShow.value) {
    return i18nHelper.get().file.uploading
  }
  return filesize(props.size, { base: 2, standard: 'jedec' })
})
const ellipsis = (str, len) => {
  if (typeof str !== 'string') {
    return ''
  }
  if (str.length <= len) return str
  const len2 = len / 2
  return `${str.substring(0, len2)}...${str.substring(str.length - len2)}`
}
const iconUrl = computed(() => {
  if (!props.mimeType || props.mimeType === 'application/octet-stream') {
    return fileUnknow
  }
  if (props.mimeType.includes('application/pdf')) {
    return filePdf
  }
  //excel number
  if (
    props.mimeType.includes('application/vnd.ms-excel') ||
    props.mimeType.includes('application/vnd.apple.numbers') ||
    props.mimeType.includes(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ) ||
    props.mimeType.includes('text/csv')
  ) {
    return fileExcel
  }
  //word pages
  if (
    props.mimeType.includes('application/msword') ||
    props.mimeType.includes(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ) ||
    props.mimeType.includes('application/vnd.apple.pages')
  ) {
    return fileWord
  }
  //ppt
  if (props.mimeType.includes('application/vnd.ms-powerpoint')) {
    return filePpt
  }
  return fileUnknow
})
const canAutoDownload = computed(() => {
  //如果是视频，下载20M以内
  //非视频,autodownload under 100M
  if (props.mimeType?.indexOf('video') === 0) {
    return props.size < 20 * 1024 * 1024
  }
  return props.size < 100 * 1024 * 1024
})
const download = () => {
  if (msgStore.checkDownloadingMsgCache(props.msg.channel_id, props.msg.cmid)) {
    return
  }
  msgStore.addDownloadingMsg(props.msg.channel_id, props.msg.cmid)
  messageStore.downloadFile({
    channelId: props.msg.channel_id,
    cmid: props.msg.cmid,
    fileId: props.url,
    fileName: props.name,
    size: props.size,
  })
}
const isDownloading = computed(() => {
  return messageStore.checkDownloadingMsgCache(
    props.msg.channel_id,
    props.msg.cmid,
  )
})
const pauseUpload = () => {
  msgStore.pauseUpload({
    channelId: props.msg.channel_id,
    cmid: props.msg.cmid,
  })
}
const resumeUpload = () => {
  msgStore.resumeUpload({
    channelId: props.msg.channel_id,
    cmid: props.msg.cmid,
  })
}

const uploadStart = () => {
  resumeUpload()
}
const uploadStop = () => {
  pauseUpload()
}
const downloadStart = () => {
  if (msgStore.checkDownloadingMsgCache(props.msg.channel_id, props.msg.cmid)) {
    return
  }
  msgStore.addDownloadingMsg(props.msg.channel_id, props.msg.cmid)
  messageStore.downloadFile({
    channelId: props.msg.channel_id,
    cmid: props.msg.cmid,
    fileId: props.url,
    fileName: props.name,
    size: props.size,
  })
}
const downloadStop = () => {
  msgStore.pauseDownload({
    channelId: props.msg.channel_id,
    cmid: props.msg.cmid,
  })
}
const tryAutoDownload = async () => {
  // if (!settings.auto_download||props.self)return
  const autoDownloaded = messageStore.autoDownloadCache.exists([
    props.msg.channel_id,
    props.msg.cmid,
  ])
  if (autoDownloaded || !canAutoDownload.value) {
    return
  }
  const filePath = await zUnsafePreload.invokeRoute({
    channel: 'message',
    route: 'getFilePath',
    payload: {
      channelId: props.msg.channel_id,
      cmid: props.msg.cmid,
    },
  })
  //曾经下载过，手动删除过，不再自动下载
  if (filePath) return
  if (
    canAutoDownload.value &&
    !isDownloading.value &&
    progressStatus.value === 'paused' &&
    shouldDownloadOptShow.value &&
    !msgStore.checkDownloadingMsgCache(props.msg.channel_id, props.msg.cmid)
  ) {
    msgStore.addDownloadingMsg(props.msg.channel_id, props.msg.cmid)
    if (
      messageStore.autoDownloadCache.exists([
        props.msg.channel_id,
        props.msg.cmid,
      ])
    )
      return

    msgStore.autoDownloadCache.add([props.msg.channel_id, props.msg.cmid], {
      channelId: props.msg.channel_id,
      cmid: props.msg.cmid,
    })
    progressStatus.value = 'started'
    messageStore.autoDownloadFile({
      channelId: props.msg.channel_id,
      cmid: props.msg.cmid,
      fileId: props.url,
      fileName: props.name,
      size: props.size,
    })
  }
}
const updateProgressStatus = () => {
  progressStatus.value = isDownloading.value ? 'started' : 'paused'
}
const onElementVisibility = async (state: any) => {
  updateProgressStatus()
  if (state) {
    await msgStore.messageUIStateDict[
      `${props.msg.channel_id}_${props.msg.cmid}`
    ].checkFileDownloadPath()
    if (settings.auto_download) {
      tryAutoDownload()
    }
  }
}
// const onIntersectionObserver = async ([
//   { isIntersecting }
// ]: IntersectionObserverEntry[]) => {
//   console.log('onIntersectionObserver')
//   updateProgressStatus()
//   if (!settings.auto_download) return
//   if (isIntersecting) {
//     await msgStore.messageUIStateDict[
//       `${props.msg.channel_id}_${props.msg.cmid}`
//     ].checkFileDownloadPath()
//     tryAutoDownload()
//   }
// }
</script>
<template>
  <div
    class="file-item"
    @click.stop="tryOpenThrottled"
    v-element-visibility="onElementVisibility"
  >
    <!--    <div class="icon" :class="iconType"></div>-->
    <img class="icon" :src="iconUrl" alt="" />
    <div class="info">
      <div class="info__name">
        {{ showName }}
      </div>
      <div class="info__status">
        <div class="info__status__upload" v-if="shouldUploadDetailShow">
          <div>
            {{ showSize }}
          </div>
          <div class="info__status__upload__opt" v-if="shouldUploadOptShow">
            <div
              v-if="msgUIState.fileSpeed && uploadStatus === 'started'"
              style="
                display: inline-block;
                overflow: hidden;
                max-width: 80px;
                line-height: 20px;
                text-align: right;
              "
              class="mr-2"
            >
              {{ msgUIState.fileSpeed }}
            </div>
            <div
              style="
                display: inline-block;
                max-width: 50px;
                line-height: 20px;
                text-align: right;
              "
            >
              <span v-if="uploadStatus === 'started'">
                {{ (progress * 100).toFixed(0) }}%
              </span>
              <span v-else>{{ i18nHelper.get().file.paused }}</span>
            </div>
            <ZProgress
              style="margin-left: 4px"
              v-model:model-value="uploadStatus"
              :size="20"
              action="upload"
              :progress="progress"
              type="circle"
              @start="uploadStart"
              @stop="uploadStop"
            >
            </ZProgress>
          </div>
        </div>
        <div v-if="fileDirection === 'download'" class="info__status__download">
          <div>
            {{ showSize }}
          </div>
          <div v-if="shouldDownloadOptShow" class="info__status__download__opt">
            <div
              v-if="msgUIState.fileSpeed && isDownloading"
              style="
                display: inline-block;
                overflow: hidden;
                max-width: 80px;
                line-height: 20px;
                text-align: right;
              "
            >
              {{ msgUIState.fileSpeed }}
            </div>
            <div
              v-if="isDownloading"
              style="
                display: inline-block;
                width: 34px;
                line-height: 20px;
                text-align: right;
              "
            >
              {{ (downloadProgress * 100).toFixed(0) }}%
            </div>
            <ZProgress
              style="margin-left: 4px"
              v-model:model-value="progressStatus"
              :size="20"
              action="download"
              :progress="downloadProgress"
              type="circle"
              @start="downloadStart"
              @stop="downloadStop"
            >
            </ZProgress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.file-item {
  display: flex;
  flex-direction: row;
  width: 240px;
  height: 50px;
  //垂直剧中
  align-items: center;

  .info {
    margin-left: 12px;
    width: 100%;

    .info__name {
      font-size: 12px;
      font-weight: 500;
      //最多两行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      //行间距为2px
      line-height: 16px;
    }

    .info__status {
      font-size: 12px;
      margin-top: 4px;
      height: 20px;
      .info__status__upload {
        display: flex;
        //垂直居中
        align-items: center;

        .info__status__upload__opt {
          display: flex;
          margin-left: auto;
        }
      }

      .arco-progress-size-large .arco-progress-line-text {
        font-size: 12px !important;
        margin-left: 4px;
      }

      .info__status__pause:hover {
        color: #4b7bff;
      }
      .info__status__resume:hover {
        color: #4b7bff;
      }

      .info__status__download {
        display: flex;
        color: var(--gray-04, #8b91a0);
        align-items: center;

        .progress {
          margin-left: 4px;
        }

        .info__status__download__opt {
          display: flex;
          margin-left: auto;
        }
      }
    }
  }
}
</style>
