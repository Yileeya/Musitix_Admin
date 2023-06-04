<template>
  <section class="info-section">
    <template v-for="field in activityInfoFields" :key="field.id">
      <div class="form-group">
        <label>{{ field.name }}</label>
        <extended-date-picker
          class="date-picker"
          v-if="field.id === 'dateRange'"
          v-model="activityInfo.dateRange"
          range
          type="datetime"
          placeholder="請選擇日期區間"
        />
        <template v-else>
          <input
            class="form-control"
            v-model="activityInfo[field.id]"
            :placeholder="`請輸入${field.name}`"
          />
          <button v-if="field.id === 'mainImageUrl'" class="btn btn-primary">上傳圖片</button>
        </template>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import activityInfoFields from '@/formFields/activityInfoFields'
import { activityHandle } from '@/stores/activityHandle'
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'

const activityInfo = activityHandle().information
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
