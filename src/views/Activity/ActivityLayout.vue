<template>
  <div class="activity-layout">
    <tabs-title :current-tab="currentTab" @update:current-tab="(newVal) => (currentTab = newVal)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabsTitle from '@/views/Activity/TabsTitle.vue'

const currentTab = ref<string>('information')
</script>

<style scoped lang="scss">
.activity-layout {
  margin: 30px 0;
}
</style>
