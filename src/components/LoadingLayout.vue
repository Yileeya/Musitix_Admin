<template>
  <div class="loading-layout">
    <loading-spinner />
    <p v-if="content">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import { pageLoadingStore } from '@/stores/pageLoading'
import { computed } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const pageLoading = pageLoadingStore()
const content = computed(() => pageLoading.content)
</script>

<style scoped lang="scss">
.loading-layout {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 9999;
  background-color: rgba(182, 182, 182, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    color: black;
    letter-spacing: 1px;
    margin: 10px 0;
  }
}
</style>
