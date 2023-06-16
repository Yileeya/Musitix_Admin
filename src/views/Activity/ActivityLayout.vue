<template>
  <div class="activity-layout container">
    <tabs-title :current-tab="currentTab" @update:current-tab="(newVal) => (currentTab = newVal)" />
    <div v-if="!pageLoading.loading">
      <information v-show="currentTab === 'information'" />
      <content v-show="currentTab === 'content'" />
      <schedule-tickets v-show="currentTab === 'scheduleTickets'" />
    </div>
  </div>
  <button
    v-if="!pageLoading.loading"
    class="btn btn-primary btn-lg fix-button"
    @click="saveActivity"
  >
    儲存
  </button>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import TabsTitle from '@/views/Activity/TabsTitle.vue'
import Information from '@/views/Activity/Information.vue'
import Content from '@/views/Activity/Content.vue'
import ScheduleTickets from '@/views/Activity/ScheduleTickets.vue'
import { activityHandle } from '@/stores/activityHandle'
import { pageLoadingStore } from '@/stores/pageLoading'
import { getActivity, postActivity, patchActivity } from '@/apis/activities/activities'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const currentTab = ref<string>('information')

const pageLoading = pageLoadingStore()
// 初始化活動資料
const activityData = activityHandle()
onBeforeMount(() => {
  activityData.reset()
})

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

const saveActivity = async () => {
  pageLoading.changeLoadingStatus(true)
  const saleDateRange = activityData.getSaleDateRange
  const submitForm = {
    ...activityData.information,
    ...{
      HtmlContent: activityData.HtmlContent,
      HtmlNotice: activityData.HtmlNotice,
      schedules: activityData.schedules,
      saleStartDate: saleDateRange[0],
      saleEndDate: saleDateRange[1]
    }
  }

  try {
    let res = null
    if (routeParamsId === 'new') res = await postActivity(submitForm)
    else res = await patchActivity(routeParamsId, submitForm)
    if (res.status === 200) {
      Toast.success(`${routeParamsId === 'new' ? '新增' : '編輯'}成功！`)
      await router.push('/activities')
    } else {
      Toast.error('儲存失敗。')
    }
  } catch (error: any) {
    Toast.error(error.response.data.message)
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
