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
    <a class="btn btn-sm btn-secondary" href="https://unsplash.com/s/photos/band" target="_blank">圖片素材網</a>
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
  width: fit-content;
  align-items: flex-end;
  .title-tab {
    width: 12em;
    text-align: center;
    font-size: 18px;
    padding: 10px;
    background-color: white;
    border-top: 2px solid white;
    &.active {
      font-weight: bold;
      border-bottom: 2px solid;
      border-top: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .btn-secondary {
    margin: 0 20px;
  }
}
</style>
