<template>
  <RouterView />
  <Transition name="fade">
    <loading-layout v-if="loading" />
  </Transition>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingLayout from '@/components/LoadingLayout.vue'
import { pageLoadingStore } from '@/stores/pageLoading'
import { computed } from 'vue'

const pageLoading = pageLoadingStore()
const loading = computed(() => pageLoading.loading)
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
