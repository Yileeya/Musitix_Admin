<template>
  <section class="qrcode-layout">
    <div class="qrcode-reader">
      <qrcode-reader />
    </div>
  </section>
</template>

<script setup>
import QrcodeReader from '@/views/QrCode/QrcodeReader.vue'
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
