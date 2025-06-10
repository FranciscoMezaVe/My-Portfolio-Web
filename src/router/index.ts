import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import publicRoutes from '@/router/public.routers'
import { useAuthStore } from '@/shared/stores/auth.store'

const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...baseRoutes, ...publicRoutes],
})

router.beforeEach(async (to, from, next) => {
  const useAuth = useAuthStore()
  const currentUser = await useAuth.getCurrentUser()
  if (to.matched.some((record) => record.meta.requiredNotAuth)) {
    if (currentUser) {
      next({ path: '/home' })
    }
  }

  next()
})

export default router
