<template>
  <div class="activity-layout container">
    <tabs-title :current-tab="currentTab" @update:current-tab="(newVal) => (currentTab = newVal)" />
    <information v-show="currentTab === 'information'" />
    <content v-show="currentTab === 'content'" />
    <schedule-tickets v-show="currentTab === 'scheduleTickets'" />
  </div>
  <button class="btn btn-primary btn-lg fix-button" @click="saveActivity">儲存</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabsTitle from '@/views/Activity/TabsTitle.vue'
import Information from '@/views/Activity/Information.vue'
import Content from '@/views/Activity/Content.vue'
import ScheduleTickets from '@/views/Activity/ScheduleTickets.vue'
import { activityHandle } from '@/stores/activityHandle'

const currentTab = ref<string>('information')

const activityData = activityHandle()
const saveActivity = () => {
  let submitForm = { ...activityData.formatResult }
  submitForm.HtmlContent = activityData.HtmlContent
  submitForm.HtmlNotice = activityData.HtmlNotice
  submitForm.schedules = [...activityData.schedules]
  console.log(submitForm)
}
</script>

<style scoped lang="scss">
.activity-layout {
  padding: 30px;
}
.fix-button {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
</style>
