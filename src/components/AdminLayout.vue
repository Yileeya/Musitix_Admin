<template>
  <div class="admin-layout">
    <sidebar />
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped lang="scss">
.admin-layout {
  background-color: #f2f4f7;
  min-height: 100vh;
}
</style>
