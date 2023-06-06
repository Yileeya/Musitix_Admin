<template>
  <ckeditor :editor="editor" :config="config" v-model="editorData" />
</template>

<script setup>
import { ref, watch } from 'vue'
import * as ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = ref(ClassicEditor)
const editorData = ref(props.modelValue ? props.modelValue : '')
const config = ref({
  placeholder: '請輸入內容',
  removePlugins: ['Title', 'ImageInsert', 'ImageUpload', 'SimpleUploadAdapter']
})

watch(
  () => props.modelValue,
  (newVal) => {
    editorData.value = newVal
  }
)

watch(editorData, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>
