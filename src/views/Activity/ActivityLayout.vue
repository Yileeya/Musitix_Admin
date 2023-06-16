<template>
  <div class="activity-layout container">
    <tabs-title :current-tab="currentTab" @update:current-tab="(newVal) => (currentTab = newVal)" />
    <div v-if="!pageLoading.loading">
      <information v-show="currentTab === 'information'" />
      <content v-show="currentTab === 'content'" />
      <schedule-tickets v-show="currentTab === 'scheduleTickets'" />
    </div>
  </div>
  <button v-if="!pageLoading.loading" class="btn btn-primary btn-lg fix-button" @click="saveActivity">儲存</button>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import TabsTitle from '@/views/Activity/TabsTitle.vue'
import Information from '@/views/Activity/Information.vue'
import Content from '@/views/Activity/Content.vue'
import ScheduleTickets from '@/views/Activity/ScheduleTickets.vue'
import { activityHandle } from '@/stores/activityHandle'
import { pageLoadingStore } from '@/stores/pageLoading'
import { getActivity } from '@/apis/activities/activities'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const currentTab = ref<string>('information')

const pageLoading = pageLoadingStore()
// 初始化活動資料
const activityData = activityHandle()
onBeforeMount(() => {
  activityData.reset()
})

const saveActivity = () => {}

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()
const Toast = useToast()

const handleFetchError = async () => {
  Toast.error('活動獲取錯誤。')
  await activityData.reset()
  await router.push('/activities')
}

const fetchActivity = async () => {
  pageLoading.changeLoadingStatus(true)
  try {
    let res = await getActivity(routeParamsId)
    if (res.status === 200) {
      const activity = res.data.data
      const { HtmlNotice, HtmlContent, schedules, ...info } = activity
      activityData.HtmlNotice = activity.HtmlNotice
      activityData.HtmlContent = activity.HtmlContent
      activityData.schedules = activity.schedules
      activityData.information = { ...info }
    } else {
      await handleFetchError()
    }
  } catch (error) {
    await handleFetchError()
  }
  pageLoading.changeLoadingStatus(false)
}

if (routeParamsId !== 'new') {
  fetchActivity()
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
