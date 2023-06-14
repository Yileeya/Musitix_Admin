<template>
  <select class="form-select" :value="status" @change="$emit('update:status', $event.target.value)">
    <option :value="''">狀態</option>
    <option v-for="status in activityStatusFields" :value="status.id">{{ status.title }}</option>
  </select>
</template>

<script setup>
import activityStatusFields from '@/formFields/activityStatusFields'

defineProps({
  status: String
})

defineEmits(['update:status'])
</script>
