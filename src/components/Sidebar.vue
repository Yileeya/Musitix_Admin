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
  },
  {
    href: '/activities',
    title: '活動管理',
    icon: 'fa fa-cogs fa-lg'
  }
  // {
  //   href: '/activity/new',
  //   title: '新增活動',
  //   icon: 'fa fa fa-pencil-square-o fa-lg'
  // }
])
</script>

<style scoped></style>
