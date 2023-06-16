<template>
  <section class="info-section">
    <template v-for="field in activityInfoFields" :key="field.id">
      <div class="form-group">
        <label>{{ field.name }}</label>
        <extended-date-picker
          class="date-picker"
          v-if="field.id === 'dateRange'"
          range
          type="datetime"
          placeholder="請選擇日期區間"
          :model-value="formatDateTime"
          @update:modelValue="(value) => updateDateValue(value)"
        />
        <template v-else>
          <input
            class="form-control"
            v-model="activity.information[field.id]"
            :placeholder="`請輸入${field.name}`"
          />
          <button disabled v-if="field.id === 'mainImageUrl'" class="btn btn-primary">
            上傳圖片
          </button>
        </template>
      </div>
    </template>
  </section>
</template>

<script setup>
import activityInfoFields from '@/formFields/activityInfoFields'
import { activityHandle } from '@/stores/activityHandle'
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'
import { computed } from 'vue'
import dayjs from 'dayjs'

const activity = activityHandle()

//轉換date模式，供時間套件使用
const formatDateTime = computed(() => {
  if (!activity.information.startDate) return []
  return [
    dayjs(activity.information.startDate).toDate(),
    dayjs(activity.information.endDate).toDate()
  ]
})

//更新時間
const updateDateValue = (dateRangeValue) => {
  activity.information.startDate = dateRangeValue[0] ? dateRangeValue[0].toISOString() : null
  activity.information.endDate = dateRangeValue[1] ? dateRangeValue[1].toISOString() : null
}
</script>

<style scoped lang="scss">
.info-section {
  .form-group {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 15px 0;

    label {
      width: 100px;
    }

    .form-control {
      flex: 1;
    }

    .date-picker {
      width: 370px;
    }
  }
}
</style>
