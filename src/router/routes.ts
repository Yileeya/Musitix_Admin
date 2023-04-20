import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/TodoView.vue')
  }
]
export default routes
