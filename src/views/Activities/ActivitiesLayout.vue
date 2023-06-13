<template>
  <div class="container">
    <search @search="fetchSearch" />
  </div>
</template>

<script setup>
import Search from '@/views/Activities/Search.vue'
import { getActivities } from '@/apis/activities/activities'

const fetchSearch = async (searchQuery) => {
  await getActivities(searchQuery)
}
</script>

<style scoped></style>
