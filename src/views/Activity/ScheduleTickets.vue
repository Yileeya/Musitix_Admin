<template>
  <section class="schedule-tickets table-responsive">
    <div class="add-schedule-btn">
      <button type="button" class="btn btn-primary" @click="addSchedule">增加場次</button>
    </div>
    <table v-for="(schedule, scheduleIndex) in schedules" :key="'schedule' + scheduleIndex">
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
                v-if="schedules.length > 1"
                @click="removeSchedule(scheduleIndex)"
              >
                移除場次
              </button>
            </div>
            <div class="date-picker-group">
              <div class="form-group" v-for="index in 2">
                <label>{{ index === 1 ? '起訖區間' : '販售區間' }}</label>
                <extended-date-picker
                  :model-value="
                    index === 1
                      ? [schedule.startTime, schedule.endTime]
                      : [schedule.saleStartTime, schedule.saleEndTime]
                  "
                  :disabled-date="
                    (date:any) => disabledDate(date, index === 1 ? 'scheduleDate' : 'scheduleSaleDate')
                  "
                  class="date-picker"
                  range
                  type="datetime"
                  :disabled="!activityHandle().information.dateRange.length"
                  :placeholder="'請選擇' + (index === 1 ? '起訖' : '販售') + '區間'"
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

<script setup lang="ts">
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'
import { activityHandle } from '@/stores/activityHandle'
import _ from 'lodash'

const schedules = activityHandle().schedules

// 判斷是否都有值
function isAllValuesPresent(values: any) {
  return !_.some(values, (value) => !value)
}

const updateDateValue = (value: Array<string>, index: number, scheduleIndex: number) => {
  if (index === 1) {
    //起訖
    schedules[scheduleIndex].startTime = value.length ? value[0] : null
    schedules[scheduleIndex].endTime = value.length ? value[1] : null
  } else {
    //銷售
    schedules[scheduleIndex].saleStartTime = value.length ? value[0] : null
    schedules[scheduleIndex].saleEndTime = value.length ? value[1] : null
  }
}

function disabledDate(date: any, target: string) {
  const activityDate = activityHandle().information?.dateRange
  const startDate = new Date(activityDate[0]).setHours(0, 0, 0, 0)
  if (target === 'scheduleDate') {
    const endDate = new Date(activityDate[1]).setHours(0, 0, 0, 0)
    return date < startDate || date > endDate
  } else {
    return date > startDate
  }
}

//票種操作(增加/移除)
const addTicketCategory = (scheduleIndex: number) => {
  const newTicketCategory = activityHandle().getDefaultTicketCategory
  schedules[scheduleIndex].ticketCategories.push({ ...newTicketCategory })
}
const removeTicketCategory = (scheduleIndex: number, ticketCategoryIndex: number) => {
  schedules[scheduleIndex].ticketCategories.splice(ticketCategoryIndex, 1)
}

//場次操作(增加移除)
const addSchedule = () => {
  const newSchedule = activityHandle().getDefaultSchedule
  schedules.unshift({
    ...newSchedule,
    scheduleName: `場次${schedules.length + 1}`
  })
}
const removeSchedule = (scheduleIndex: number) => {
  schedules.splice(scheduleIndex, 1)
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
