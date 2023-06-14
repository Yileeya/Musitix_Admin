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
                  <button class="btn btn-sm btn-warning">上架</button>
                  <button class="btn btn-sm btn-primary">編輯</button>
                  <button class="btn btn-sm btn-danger">取消</button>
                </div>
                <div v-if="activity.status === 2">
                  <!--已上架，只可停辦-->
                  <button class="btn btn-sm btn-secondary">停辦</button>
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
import activityStatusFields from '@/formFields/activityStatusFields'

defineProps(['loading', 'activities'])

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
        background-color: #80e8b7;
        color: black;
      }
    }
  }

  thead th {
    background-color: #c7c7c7;
  }
}
</style>
