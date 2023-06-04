<template>
  <div class="activity-layout container">
    <tabs-title :current-tab="currentTab" @update:current-tab="(newVal) => (currentTab = newVal)" />
    <information v-show="currentTab === 'information'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabsTitle from '@/views/Activity/TabsTitle.vue'
import Information from '@/views/Activity/Information.vue'

const currentTab = ref<string>('information')
</script>

<style scoped lang="scss">
.activity-layout {
  margin: 30px;
}
</style>
