<template>
  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
</template>

<script setup lang="ts">
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { AutoImage } from '@ckeditor/ckeditor5-image'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing'
import { Image, ImageResize } from '@ckeditor/ckeditor5-image'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Font } from '@ckeditor/ckeditor5-font'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { DocumentList } from '@ckeditor/ckeditor5-list'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'

import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = ref(ClassicEditor)
const editorData = ref(props.modelValue ? props.modelValue : '')
const editorConfig = {
  placeholder: '請輸入內容',
  plugins: [
    Alignment,
    Essentials,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    Paragraph,
    SourceEditing,
    AutoImage,
    Image,
    ImageResize,
    Font,
    Heading,
    DocumentList,
    MediaEmbed
  ],
  toolbar: {
    items: [
      'heading',
      '|',
      'fontColor',
      'fontBackgroundColor',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'alignment',
      'bulletedList',
      'numberedList',
      'mediaEmbed',
      '|',
      'undo',
      'redo',
      'sourceEditing'
    ]
  }
}

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
