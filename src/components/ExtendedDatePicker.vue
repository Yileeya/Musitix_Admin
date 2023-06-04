<template>
  <date-picker
    v-bind="$attrs"
    :value="modelValue"
    :lang="langObject"
    @change="emitValue"
    @clear="emitValue([])"
  />
</template>

<script setup>
import 'vue-datepicker-next/locale/zh-tw'
import DatePicker from 'vue-datepicker-next'
import { ref } from 'vue'

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const langObject = ref({
  formatLocale: {
    firstDayOfWeek: 7
  }
})

function emitValue(value) {
  emit('update:modelValue', value)
}
</script>
