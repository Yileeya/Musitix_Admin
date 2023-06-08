<template>
  <section class="activity-content">
    <div class="btn-div">
      <button class="btn btn-sm btn-primary" @click="exportExample">匯入範例</button>
    </div>
    <div class="form-group" v-for="i in 2" :key="i">
      <label>{{ i === 1 ? '活動內容' : '購票說明' }}</label>
      <html-editor v-if="i === 1" v-model="activityInfo.HtmlContent" />
      <html-editor v-else v-model="activityInfo.HtmlNotice" />
    </div>
  </section>
</template>

<script setup lang="ts">
import HtmlEditor from '@/components/HtmlEditor.vue'
import { activityHandle } from '@/stores/activityHandle'
import activityHtmlDemo from '@/demo/activityHtml'

const activityInfo = activityHandle()

const exportExample = () => {
  activityInfo.HtmlContent = activityHtmlDemo.HtmlContent
  activityInfo.HtmlNotice = activityHtmlDemo.HtmlNotice
}
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
