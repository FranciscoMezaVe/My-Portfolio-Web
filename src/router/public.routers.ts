import { homeRoutes } from '@/modules/home/home.routes'
import { aboutRoutes } from '@/modules/about/about.routes'
import { contactRoutes } from '@/modules/contact/contact.routes'
import { notFoundRoutes } from '@/modules/notFound/notFound.routes'
import type { RouteRecordRaw } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { authRoutes } from '@/modules/auth/auth.routes'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PublicLayout,
    children: [...homeRoutes, ...aboutRoutes, ...contactRoutes, ...notFoundRoutes, ...authRoutes],
  },
]

export default publicRoutes
