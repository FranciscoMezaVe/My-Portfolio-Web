import type { RouteRecordRaw } from 'vue-router'

export const contactRoutes: RouteRecordRaw[] = [
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./views/ContactView.vue'),
  },
]
