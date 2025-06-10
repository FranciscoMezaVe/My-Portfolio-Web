import type { RouteRecordRaw } from 'vue-router'

export const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: () => import('./views/NotFoundView.vue'),
  },
]
