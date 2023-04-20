import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'
import CKEditor from '@ckeditor/ckeditor5-vue'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

//vee-validate
import { defineRule } from 'vee-validate'
defineRule('required', (value: string | any[]) => {
  if (!value || !value.length) {
    return 'This field is required'
  }
  return true
})
defineRule('email', (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true
  }
  // Check if email
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return 'This field must be a valid email'
  }
  return true
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CKEditor)
app.mount('#app')
