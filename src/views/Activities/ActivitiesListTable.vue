<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th style="width: 120px">狀態</th>
          <th>活動名稱</th>
          <th colspan="2">日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="4" class="text-center">
            <loading-spinner />
          </td>
        </tr>
        <tr v-else-if="!activities.length">
          <td colspan="4" class="text-center">無資料</td>
        </tr>
        <template v-else>
          <tr v-for="activity in activities" :key="activity._id">
            <td title="status">
              <div class="status-tag" :class="[`status-${activity.status}`]">
                {{ showActivityStatus(activity.status) }}
              </div>
            </td>
            <td>{{ activity.title }}</td>
            <td>
              {{ showActivityDate(activity.startDate, activity.endDate) }}
            </td>
            <td class="btn-area">
              <template v-if="dateIsAfterToday(activity.startDate)">
                <!--今天之後的活動才可操作-->
                <div v-if="activity.status === 1">
                  <!--未上架，可編輯-->
                  <button
                    class="btn btn-sm btn-warning"
                    @click="handleActivity('publish', activity._id)"
                  >
                    上架
                  </button>
                  <button class="btn btn-sm btn-primary" @click="emitChangeRouterId(activity._id)">
                    編輯
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="handleActivity('cancel', activity._id)"
                  >
                    取消
                  </button>
                </div>
                <div v-if="activity.status === 2">
                  <!--已上架，只可停辦-->
                  <button
                    class="btn btn-sm btn-secondary"
                    @click="handleActivity('shutDown', activity._id)"
                  >
                    停辦
                  </button>
                </div>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { dateFormatUTC } from '@/utils/dateFormat'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useToast } from 'vue-toastification'
import activityStatusFields from '@/formFields/activityStatusFields'
import { publishActivity, cancelActivity } from '@/apis/activities/activities'
import { pageLoadingStore } from '@/stores/pageLoading'

defineProps(['loading', 'activities'])
const emit = defineEmits(['routerChange', 'refresh'])

const showActivityDate = (startDate, endDate) => {
  const startDateFormat = dateFormatUTC(startDate, 'YYYY-MM-DD')
  const endDateFormat = dateFormatUTC(endDate, 'YYYY-MM-DD')
  if (startDateFormat === endDateFormat) return startDateFormat
  else return startDateFormat + '  至  ' + endDateFormat
}

const showActivityStatus = (statusId) => {
  const match = _.find(activityStatusFields, (field) => field.id === statusId)
  return match.title
}

const dateIsAfterToday = (startDate) => {
  const today = dayjs()
  const compareDate = dayjs(startDate)
  return today.isBefore(compareDate)
}

const emitChangeRouterId = (activityId) => {
  emit('routerChange', activityId)
}

const pageLoading = pageLoadingStore()
const Toast = useToast()

const handleActivity = async (target, activityId) => {
  pageLoading.changeLoadingStatus(true)
  try {
    let res = null
    if (target === 'publish') res = await publishActivity(activityId)
    else res = await cancelActivity(activityId)
    if (res.status === 200) {
      let text = null
      if (target === 'publish') text = '上架'
      else if (target === 'cancel') text = '取消'
      else text = '停辦'
      Toast.success(`${text}成功！`)
      emit('refresh')
    } else {
      Toast.error('操作失敗。')
    }
  } catch (error) {
    Toast.error(error.response.data.message)
  }
  pageLoading.changeLoadingStatus(false)
}
</script>

<style scoped lang="scss">
.table {
  td,
  th {
    vertical-align: middle;

    &.btn-area {
      text-align: right;
      max-width: 200px;

      .btn {
        margin: 0 5px;
      }
    }
    .status-tag {
      width: max-content;
      padding: 3px 15px;
      border-radius: 15px;
      color: white;
      background-color: #898989;
      &.status-1 {
        background-color: #ef5b69;
      }
      &.status-2 {
        background-color: transparent;
        color: black;
      }
    }
  }

  thead th {
    background-color: #c7c7c7;
  }
}
</style>
