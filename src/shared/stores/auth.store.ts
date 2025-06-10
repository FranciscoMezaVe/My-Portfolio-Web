import type { User, UserCredential } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as service from '@/shared/services/auth.service'

export const useAuthStore = defineStore('Auth', () => {
  const userCredential = ref<UserCredential | null>(null)
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    const loginResult = await service.login(email, password)

    isLoading.value = false

    if (!loginResult.success) {
      error.value = loginResult.error.code
      return false
    }

    userCredential.value = loginResult.data
    user.value = userCredential.value.user
    return true
  }

  async function logout() {
    isLoading.value = true
    await service.logout()

    clearUser()
    error.value = null
    isLoading.value = false
  }
  async function setUser(data: User) {
    user.value = data
  }

  async function clearUser() {
    user.value = null
    userCredential.value = null
  }

  async function getCurrentUser(): Promise<User | null> {
    user.value = await service.getCurrentUser()
    return user.value
  }

  return {
    userCredential,
    user,
    isLoading,
    error,
    login,
    logout,
    setUser,
    clearUser,
    getCurrentUser,
  }
})
