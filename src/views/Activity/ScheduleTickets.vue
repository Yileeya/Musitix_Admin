<template>
  <section class="schedule-tickets table-responsive">
    <div class="add-schedule-btn">
      <button type="button" class="btn btn-primary" @click="addSchedule">增加場次</button>
    </div>
    <table
      v-for="(schedule, scheduleIndex) in activity.schedules"
      :key="'schedule' + scheduleIndex"
    >
      <thead>
        <tr>
          <th colspan="4">
            <div class="form-group">
              <label>場次名稱</label>
              <input
                v-model="schedule.scheduleName"
                class="form-control"
                placeholder="請輸入場次名稱"
              />
              <button
                class="btn btn-danger"
                v-if="activity.schedules.length > 1"
                @click="removeSchedule(scheduleIndex)"
              >
                移除場次
              </button>
            </div>
            <div class="date-picker-group">
              <div class="form-group" v-for="index in 2">
                <label>{{ index === 1 ? '起訖區間' : '販售區間' }}</label>
                <extended-date-picker
                  class="date-picker"
                  range
                  type="datetime"
                  :model-value="
                    index === 1
                      ? formatDate(schedule.startTime, schedule.endTime)
                      : formatDate(schedule.saleStartTime, schedule.saleEndTime)
                  "
                  :disabled-date="
                    (date) => disabledDate(date, index === 1 ? 'scheduleDate' : 'scheduleSaleDate')
                  "
                  :placeholder="'請選擇' + (index === 1 ? '起訖' : '販售') + '區間'"
                  :disabled="!activityHandle().information.startDate"
                  @update:modelValue="(value) => updateDateValue(value, index, scheduleIndex)"
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="title-tr">
          <td v-for="titleIndex in 3">
            <span v-if="titleIndex === 1">票種名稱</span>
            <span v-else-if="titleIndex === 2">價格</span>
            <span v-else>總數</span>
          </td>
          <td></td>
        </tr>
        <tr
          v-for="(ticketCategory, ticketCategoryIndex) in schedule.ticketCategories"
          :key="`schedule_${scheduleIndex}_ticketCategory_${ticketCategoryIndex}`"
        >
          <td title="categoryName">
            <input
              v-model="ticketCategory.categoryName"
              class="form-control"
              placeholder="請輸入票種名稱"
              type="text"
            />
          </td>
          <td title="price">
            <input
              v-model.number="ticketCategory.price"
              class="form-control"
              placeholder="請輸入價格"
              type="number"
            />
          </td>
          <td title="totalQuantity">
            <input
              v-model.number="ticketCategory.totalQuantity"
              class="form-control"
              placeholder="請輸入總數"
              type="number"
              @change="ticketCategory.remainingQuantity = ticketCategory.totalQuantity"
            />
          </td>
          <td>
            <button
              v-if="ticketCategoryIndex + 1 === schedule.ticketCategories.length"
              type="button"
              class="btn btn-sm btn-secondary"
              :disabled="!isAllValuesPresent(ticketCategory)"
              @click="addTicketCategory(scheduleIndex)"
            >
              <i class="fa fa-plus" />
            </button>
            <button
              v-if="schedule.ticketCategories.length > 1"
              type="button"
              class="btn btn-sm btn-secondary"
              @click="removeTicketCategory(scheduleIndex, ticketCategoryIndex)"
            >
              <i class="fa fa-minus" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'
import { activityHandle } from '@/stores/activityHandle'
import _ from 'lodash'
import dayjs from 'dayjs'

const activity = activityHandle()

// 判斷是否都有值
function isAllValuesPresent(values) {
  return !_.some(values, (value) => !value)
}

// format日期格式，供日期組件使用
const formatDate = (startDate, endDate) => {
  if (!startDate) return []
  return [dayjs(startDate).toDate(), dayjs(endDate).toDate()]
}

// 更新日期，並轉換格式
const updateDateValue = (value, index, scheduleIndex) => {
  if (index === 1) {
    //起訖
    activity.schedules[scheduleIndex].startTime = value[0] ? value[0].toISOString() : null
    activity.schedules[scheduleIndex].endTime = value[1] ? value[1].toISOString() : null
  } else {
    //銷售
    activity.schedules[scheduleIndex].saleStartTime = value[0] ? value[0].toISOString() : null
    activity.schedules[scheduleIndex].saleEndTime = value[1] ? value[1].toISOString() : null
  }
}

// 侷限選擇日期
function disabledDate(date, target) {
  const activityStartDate = activityHandle().information.startDate
  const activityEndDate = activityHandle().information.endDate
  const startDate = new Date(activityStartDate).setHours(0, 0, 0, 0)
  if (target === 'scheduleDate') {
    //需在活動日期之中挑選
    const endDate = new Date(activityEndDate).setHours(0, 0, 0, 0)
    return date < startDate || date > endDate
  } else {
    //需在日期活動開始之前
    return date > startDate
  }
}

//票種操作(增加/移除)
const addTicketCategory = (scheduleIndex) => {
  const newTicketCategory = activityHandle().getDefaultTicketCategory
  activity.schedules[scheduleIndex].ticketCategories.push({ ...newTicketCategory })
}
const removeTicketCategory = (scheduleIndex, ticketCategoryIndex) => {
  activity.schedules[scheduleIndex].ticketCategories.splice(ticketCategoryIndex, 1)
}

//場次操作(增加移除)
const addSchedule = () => {
  const newSchedule = activityHandle().getDefaultSchedule
  activity.schedules.unshift({
    ...newSchedule,
    scheduleName: `場次${activity.schedules.length + 1}`
  })
}
const removeSchedule = (scheduleIndex) => {
  activity.schedules.splice(scheduleIndex, 1)
}
</script>

<style scoped lang="scss">
.schedule-tickets {
  padding: 30px 0;

  .add-schedule-btn {
    float: right;
    margin-bottom: 10px;
    margin-top: -30px;
  }

  table {
    width: 100%;
    margin-bottom: 50px;

    td,
    th {
      padding: 15px;
    }

    thead {
      background-color: #989898;
      color: white;

      .form-group {
        display: flex;
        gap: 15px;
        align-items: baseline;

        .form-control {
          flex: 1;
        }
      }

      .date-picker-group {
        display: flex;
        gap: 30px;
        margin-top: 20px;

        .date-picker {
          width: 370px;
        }
      }
    }

    tbody {
      background-color: #e4e4e4;

      .title-tr {
        font-weight: bold;
        text-align: center;

        td {
          padding: 10px 0 0;
        }
      }

      .btn-sm {
        margin: 0 5px;
      }
    }
  }
}
</style>
