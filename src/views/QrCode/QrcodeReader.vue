<template>
  <div class="stream" :class="[{ 'bg-dark': !camera || errorMsg }]">
    <qrcode-stream :camera="camera ? 'auto' : 'off'" @decode="onDecode" @init="onInit">
      <div class="frame"></div>
    </qrcode-stream>
  </div>
  <button
    v-if="!errorMsg"
    class="btn btn-camera"
    :class="[camera ? 'btn-secondary' : 'btn-primary']"
    @click="camera = !camera"
  >
    {{ camera ? '關閉' : '開啟' }}鏡頭
  </button>
  <p class="error-msg text-center" v-if="errorMsg">{{ errorMsg }}</p>
  {{ qrCodeResult }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const qrCodeResult = ref<string>('')
const errorMsg = ref<string>('')
const camera = ref<boolean>(true)

function onDecode(data: any) {
  qrCodeResult.value = data
}

const onInit = async (promise: any) => {
  try {
    await promise
  } catch (error) {
      console.log(error)
    const errorWithName = error as { name?: string }
    if (errorWithName?.name === 'NotAllowedError') {
      errorMsg.value = '錯誤：需要授予相機訪問權限'
    } else if (errorWithName?.name === 'NotFoundError') {
      errorMsg.value = '錯誤：設備上找不到相機'
    } else if (errorWithName?.name === 'NotSupportedError') {
      errorMsg.value = '錯誤：需要安全上下文（HTTPS、localhost）'
    } else if (errorWithName?.name === 'NotReadableError') {
      errorMsg.value = '錯誤：相機是否已被使用？'
    } else if (errorWithName?.name === 'OverconstrainedError') {
      errorMsg.value = '錯誤：安裝的相機不適用'
    } else if (errorWithName?.name === 'StreamApiNotSupportedError') {
      errorMsg.value = '錯誤：此瀏覽器不支援流式 API'
    } else if (errorWithName?.name === 'InsecureContextError') {
      errorMsg.value = '錯誤：相機訪問僅在安全上下文中允許。請使用 HTTPS 或 localhost，而非 HTTP。'
    } else {
      errorMsg.value = `錯誤：相機錯誤（${errorWithName?.name}）`
    }
  }
}
</script>

<style scoped lang="scss">
.stream {
  width: 100%;
  height: 300px;

  .frame {
    border-style: solid;
    border-width: 2px;
    border-color: red;
    height: 200px;
    width: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
}

.btn-camera {
  width: 100%;
  margin: 10px auto;
}

.error-msg {
  color: red;
}
</style>
