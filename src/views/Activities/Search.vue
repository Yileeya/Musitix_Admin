<template>
  <section class="search-section">
    <status-select v-model:status="searchQuery.status" />
    <extended-date-picker
      class="date-picker"
      v-model="searchQuery.dateRange"
      range
      type="date"
      placeholder="請選擇日期區間"
    />
    <input v-model="searchQuery.subject" class="form-control" placeholder="請輸入關鍵字" />
    <button class="btn-primary btn" @click="search" :disabled="loading">搜尋</button>
  </section>
</template>

<script setup>
import StatusSelect from '@/views/Activities/StatusSelect.vue'
import { ref } from 'vue'
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'

defineProps(['loading'])
const emit = defineEmits(['search'])

const searchQuery = ref({
  status: '',
  dateRange: [],
  subject: ''
})

const search = () => {
  const { dateRange, ...searchOption } = searchQuery.value
  searchOption.eventStartDate = dateRange.length ? dateRange[0].toISOString() : ''
  searchOption.eventEndDate = dateRange.length ? dateRange[1].toISOString() : ''
  emit('search', searchOption)
}
</script>

<style scoped lang="scss">
.search-section {
  padding: 30px 0;
  display: flex;
  gap: 20px;
  align-items: center;
  .form-select {
    width: auto;
  }
  .form-control {
    max-width: 350px;
  }
}
</style>
