<template>
  <section class="info-section">
    <template v-for="field in activityInfoFields" :key="field.id">
      <div class="form-group">
        <label>{{ field.name }}</label>
        <extended-date-picker
          class="date-picker"
          v-if="field.id === 'dateRange'"
          range
          type="datetime"
          placeholder="請選擇日期區間"
          :model-value="formatDateTime"
          @update:modelValue="(value) => updateDateValue(value)"
        />
        <template v-else>
          <input
            class="form-control"
            v-model="activity.information[field.id]"
            :placeholder="`請輸入${field.name}`"
          />
          <template v-if="field.id === 'mainImageUrl'">
            <upload-img-button
              :class-names="'btn btn-primary'"
              :disabled="uploadButtonDisabled"
              @upload-image="uploadImage"
            />
            <img class="check-img" :src="activity.information.mainImageUrl" alt="預覽" />
          </template>
        </template>
      </div>
    </template>
  </section>
</template>

<script setup>
import activityInfoFields from '@/formFields/activityInfoFields'
import { activityHandle } from '@/stores/activityHandle'
import ExtendedDatePicker from '@/components/ExtendedDatePicker.vue'
import UploadImgButton from '@/components/UploadImgButton.vue'
import { uploadActivityImage } from '@/apis/activities/activities'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useToast } from 'vue-toastification'

const activity = activityHandle()

//轉換date模式，供時間套件使用
const formatDateTime = computed(() => {
  if (!activity.information.startDate) return []
  return [
    dayjs(activity.information.startDate).toDate(),
    dayjs(activity.information.endDate).toDate()
  ]
})

//更新時間
const updateDateValue = (dateRangeValue) => {
  activity.information.startDate = dateRangeValue[0] ? dateRangeValue[0].toISOString() : null
  activity.information.endDate = dateRangeValue[1] ? dateRangeValue[1].toISOString() : null
}

const Toast = useToast()
const uploadButtonDisabled = ref(false)
const uploadImage = async (file) => {
  uploadButtonDisabled.value = true
  try {
    let res = await uploadActivityImage(file)
    if (res.status === 200) {
      Toast.success('圖片上傳成功！')
      activity.information.mainImageUrl = res.data.data
    } else {
      Toast.error('圖片上傳失敗！')
    }
  } catch (error) {
    Toast.error('圖片上傳失敗！')
  }
  uploadButtonDisabled.value = false
}
</script>

<style scoped lang="scss">
.info-section {
  .form-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin: 15px 0;

    label {
      width: 100px;
    }

    .form-control {
      flex: 1;
    }

    .date-picker {
      width: 370px;
    }

    .check-img {
      max-width: 100%;
    }
  }
}
</style>
