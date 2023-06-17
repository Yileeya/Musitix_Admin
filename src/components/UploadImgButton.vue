<template>
  <button @click="handleFileInputClick" :class="[props.classNames]" :disabled="props.disabled">
    <slot>請選擇上傳檔案</slot>
  </button>
  <input
    type="file"
    ref="fileInput"
    style="display: none"
    accept="image/*"
    @change="handleFileInputChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['disabled', 'classNames'])
const emit = defineEmits(['uploadImage'])

const fileInput = ref(null)

const handleFileInputClick = () => {
  fileInput.value.click()
}

const handleFileInputChange = () => {
  const file = fileInput.value.files[0]
  const formData = new FormData()
  formData.append('image', file)
  emit('uploadImage', formData)
}
</script>
