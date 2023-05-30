import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    meta: { requiresAuth: true },
    component: () => import('@/views/QrCode/QrcodeLayout.vue')
  }
]
export default routes
