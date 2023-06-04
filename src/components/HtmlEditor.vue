<template>
  <ckeditor :editor="editor" v-model="editorData" />
</template>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = ref(ClassicEditor)
const editorData = ref(props.modelValue ? props.modelValue : '<p>請輸入內容</p>')

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
