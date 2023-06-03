import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'qrcode',
        name: 'qrcode',
        meta: { requiresAuth: true },
        component: () => import('@/views/QrCode/QrcodeLayout.vue')
      },
      {
        path: 'activity/:id',
        name: 'activity',
        component: () => import('@/views/Activity/ActivityLayout.vue')
      }
    ]
  }
]
export default routes
