<template>
  <div class="container">
    <search :loading="loading" @search="fetchSearch" @router-change="routerChange" />
    <activities-list-table
      :loading="loading"
      :activities="activities"
      @router-change="routerChange"
      @refresh="fetchSearch"
    />
  </div>
</template>

<script setup>
import Search from '@/views/Activities/Search.vue'
import ActivitiesListTable from '@/views/Activities/ActivitiesListTable.vue'
import { getActivities } from '@/apis/activities/activities'
import { ref } from 'vue'
import _ from 'lodash'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const Toast = useToast()
const loading = ref(false)
const activities = ref([])

const handleFetchError = () => {
  activities.value = []
  Toast.error('活動獲取錯誤。')
}

const fetchSearch = async (searchQuery) => {
  loading.value = true
  try {
    let res = await getActivities(searchQuery)
    if (res.status === 200) {
      activities.value = _.map(res.data.data, (activity) => {
        return {
          _id: activity._id,
          title: activity.title,
          startDate: activity.startDate,
          endDate: activity.endDate,
          status: activity.status
        }
      })
    } else {
      handleFetchError()
    }
  } catch (error) {
    handleFetchError()
  }
  loading.value = false
}

const router = useRouter()
const routerChange = (activityId) => {
  router.push(`/activity/${activityId}`)
}
</script>

<style scoped></style>
