<template>
  <div class="input-check-in">
    <input v-model="ticketId" class="form-control" placeholder="請輸入票券編號" />
    <button
      class="btn btn-black"
      :disabled="!ticketId || qrcodeCheckIn.isFetching"
      @click="emitCheckIn"
    >
      報到
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { qrcodeCheckInStore } from '@/stores/qrcodeCheckIn'

const qrcodeCheckIn = qrcodeCheckInStore()

const ticketId = ref<string>('')

const emitCheckIn = () => {
  qrcodeCheckIn.setTicketId(ticketId.value)
}

//報到成功，清空輸入框
watch(
  () => qrcodeCheckIn.orderInfo,
  (newVal) => {
    if (newVal) ticketId.value = ''
  }
)
</script>

<style scoped lang="scss">
.input-check-in {
  display: flex;
  gap: 15px;

  .btn-black {
    flex-basis: 75px;
  }
}
</style>
