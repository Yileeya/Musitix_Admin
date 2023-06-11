<template>
  <div class="activity-layout container">
    <tabs-title :current-tab="currentTab" @update:current-tab="(newVal) => (currentTab = newVal)" />
    <information v-show="currentTab === 'information'" />
    <content v-show="currentTab === 'content'" />
    <schedule-tickets v-show="currentTab === 'scheduleTickets'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabsTitle from '@/views/Activity/TabsTitle.vue'
import Information from '@/views/Activity/Information.vue'
import Content from '@/views/Activity/Content.vue'
import ScheduleTickets from '@/views/Activity/ScheduleTickets.vue'

const currentTab = ref<string>('information')
</script>

<style scoped lang="scss">
.activity-layout {
  padding: 30px;
}
</style>
