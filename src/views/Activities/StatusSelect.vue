<template>
  <select class="form-select" :value="status" @change="$emit('update:status', $event.target.value)">
    <option :value="''">狀態</option>
    <option v-for="status in statusOptions" :value="status">{{ status }}</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  status: String
})

defineEmits(['update:status'])
const statusOptions = ref(['已上架', '未上架', '已結束', '已取消', '已停辦'])
</script>
