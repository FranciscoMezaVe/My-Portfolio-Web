import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.store'

export const useAuth = () => {
  const authStore = useAuthStore()

  const isAuth = computed(() => {
    return authStore.userCredential != null || authStore.user != null
  })

  return {
    isAuth,
  }
}
