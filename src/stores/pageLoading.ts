import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const pageLoadingStore = defineStore('pageLoading', () => {
  const loading = ref<boolean>(false)
  const content = ref<string>('')

  const changeLoadingStatus = (status: boolean) => {
    loading.value = status
  }

  const changeLoadingContent = (text: string) => {
    content.value = text
  }

  watch(loading, (newValue) => {
    if (!newValue) {
      content.value = ''
    }
  })

  return { loading, changeLoadingStatus, content, changeLoadingContent }
})
