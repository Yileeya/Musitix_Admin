<template>
  <div class="admin-layout">
    <navbar />
    <sidebar />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.admin-layout {
  background-color: #f2f4f7;
  min-height: 100vh;
}
</style>
