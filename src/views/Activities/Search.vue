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
  <div class="add-btn-div">
    <button class="btn-primary btn" @click="emitChangeRouter">新增活動</button>
  </div>
</template>

<script setup>
import StatusSelect from '@/views/Activities/StatusSelect.vue'
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'
import { ref } from 'vue'
import dayjs from 'dayjs'

defineProps(['loading'])
const emit = defineEmits(['search', 'routerChange'])

const searchQuery = ref({
  status: '',
  dateRange: [dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()],
  subject: ''
})

const search = () => {
  const { dateRange, ...searchOption } = searchQuery.value
  searchOption.eventStartDate = dateRange.length ? dateRange[0].toISOString() : ''
  searchOption.eventEndDate = dateRange.length ? dateRange[1].toISOString() : ''
  emit('search', searchOption)
}

const emitChangeRouter = () => {
  emit('routerChange', 'new')
}

//預設搜尋一個月內容
search()
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
.add-btn-div {
  text-align: right;
  margin: -30px 0 10px;
}
</style>
