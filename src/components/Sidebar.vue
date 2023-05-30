<template>
  <sidebar-menu :menu="menu"></sidebar-menu>
</template>

<script setup>
import { SidebarMenu } from 'vue-sidebar-menu'
import { ref } from 'vue'

const menu = ref([
  {
    href: '/qrcode',
    title: '活動報到',
    icon: 'fa fa-qrcode fa-lg'
  }
])
</script>

<style scoped></style>
