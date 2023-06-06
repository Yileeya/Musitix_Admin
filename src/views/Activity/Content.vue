<template>
  <section class="activity-content">
    <div class="btn-div">
      <button class="btn btn-sm btn-primary">匯入範例</button>
    </div>
    <div class="form-group" v-for="i in 2" :key="i">
      <label>{{ i === 1 ? '活動內容' : '購票說明' }}</label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { activityHandle } from '@/stores/activityHandle'

const activityInfo = activityHandle()
</script>

<style scoped lang="scss">
.activity-content {
  position: relative;

  .btn-div {
    position: absolute;
    right: 0;
    top: -15px;
  }

  .form-group {
    margin: 20px 0;

    label {
      margin-bottom: 8px;
    }
  }
}
</style>
