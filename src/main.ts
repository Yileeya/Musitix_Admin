import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'
import { toast, options } from './plugins/toastification'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)

app.use(createPinia()).use(router).use(toast, options).mount('#app')
