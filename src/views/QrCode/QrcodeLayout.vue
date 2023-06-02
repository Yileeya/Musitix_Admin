<template>
  <section class="qrcode-layout">
    <div class="qrcode-reader">
      <qrcode-reader />
      <input-check-in :is-refresh="isRefresh" />
    </div>
  </section>
</template>

<script setup lang="ts">
import QrcodeReader from '@/views/QrCode/QrcodeReader.vue'
import InputCheckIn from '@/views/QrCode/InputCheckIn.vue'
import { postQrcodeCheckIn } from '@/apis/activities/qrcode'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { pageLoadingStore } from '@/stores/pageLoading'
import { qrcodeCheckInStore } from '@/stores/qrcodeCheckIn'

const pageLoading = pageLoadingStore()
const qrcodeCheckIn = qrcodeCheckInStore()
const Toast = useToast()

const isRefresh = ref<boolean>(false)

watch(
  () => qrcodeCheckIn.ticketId,
  async (newVal) => {
    if (!newVal) return
    await fetchQrcodeCheckIn()
  }
)

const fetchQrcodeCheckIn = async () => {
  pageLoading.changeLoadingStatus(true)
  pageLoading.changeLoadingContent('報到中請稍後...')
  isRefresh.value = false
  try {
    let res = await postQrcodeCheckIn(qrcodeCheckIn.ticketId)
    if (res.status === 200) {
      if (res.data.data === undefined) {
        //已使用
        Toast.error(res.data.message)
        resetQrcodeInfo()
      } else {
        qrcodeCheckIn.setOrderInfo(res.data.data)
        Toast.success('報到成功')
        isRefresh.value = true
      }
    }
  } catch (err: any) {
    Toast.error(err.response.data.message)
    resetQrcodeInfo()
  }
  pageLoading.changeLoadingStatus(false)
}

const resetQrcodeInfo = () => {
  qrcodeCheckIn.setTicketId('')
  qrcodeCheckIn.setOrderInfo(null)
}
</script>

<style scoped lang="scss">
.qrcode-layout {
  padding: 30px 15px;

  .qrcode-reader {
    width: 400px;
    @media (max-width: 992px) {
      width: 300px;
      margin: auto;
    }
  }
}
</style>
