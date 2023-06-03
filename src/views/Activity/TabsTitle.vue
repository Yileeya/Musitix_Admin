<template>
  <section class="title-nav">
    <div
      class="title-tab"
      :class="[{ active: title.id === currentTab }]"
      v-for="title in titles"
      :key="title.id"
      @click="$emit('update:currentTab', title.id)"
    >
      {{ title.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps(['currentTab'])
defineEmits(['update:currentTab'])

const titles = ref([
  {
    id: 'information',
    name: '基本資料'
  },
  {
    id: 'content',
    name: '內容與注意事項'
  },
  {
    id: 'scheduleTickets',
    name: '場次/票種設定'
  }
])
</script>

<style scoped lang="scss">
.title-nav {
  display: flex;
  background-color: white;
  gap: 15px;
  width: fit-content;
  align-items: flex-end;
  .title-tab {
    width: 12em;
    text-align: center;
    font-size: 18px;
    padding: 10px;
    &.active {
      font-weight: bold;
      border-bottom: 2px solid;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
