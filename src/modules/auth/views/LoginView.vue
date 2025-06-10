<template>
  <v-container class="mt-16 d-flex justify-center">
    <v-card class="pa-6" max-width="550" width="100%">
      <v-card-title class="mb-5 text-h5 text-center">Admin Login</v-card-title>

      <v-card-text>
        <v-form :disabled="isLoading" @submit.prevent="submit" ref="isValidForm">
          <v-text-field
            label="Email"
            hint="Enter your email"
            persistent-hint
            v-model="email"
            :rules="rulesEmail"
            type="email"
            class="mb-4"
          />

          <v-text-field
            label="Password"
            hint="Enter your password"
            persistent-hint
            v-model="password"
            :rules="rulesPassword"
            type="password"
            class="mb-4"
          />
          <v-fade-transition hide-on-leave>
            <div class="d-flex justify-center">
              <v-progress-circular
                v-if="isLoading"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <div v-else>
                <v-alert
                  v-if="errorMsg"
                  closable
                  icon="mdi-badge-account-horizontal"
                  title="Invalid Credentials"
                  :text="errorMsg"
                  variant="tonal"
                  type="error"
                ></v-alert>
              </div>
            </div>
          </v-fade-transition>
          <v-btn class="mt-3" type="submit" color="primary" block>Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { isValidEmail } from '@/shared/utilities/EmailUtilities'
import { AuthErrorCodes } from 'firebase/auth'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'

const email = ref<string>('')
const password = ref<string>('')
const errorMsg = ref<string | null>(null)
const isLoading = ref(false)

const isValidForm = ref<VForm>()

const rulesEmail = [
  (value: string) => {
    if (!value) {
      return 'You must enter a email'
    }

    if (!isValidEmail(value)) {
      return 'Invalid email'
    }
    return true
  },
]

const rulesPassword = [
  (value: string) => {
    if (!value) {
      return 'You must enter a password'
    }
    return true
  },
]

const useAuth = useAuthStore()
const submit = async () => {
  errorMsg.value = null
  const result = await isValidForm.value!.validate()
  if (!result.valid) return

  try {
    isLoading.value = true
    const loginSuccess = await useAuth.login(email.value, password.value)

    if (!loginSuccess) {
      const errorCode = useAuth.error

      switch (errorCode) {
        case AuthErrorCodes.INVALID_EMAIL:
          errorMsg.value = 'Invalid email'
          break

        case AuthErrorCodes.INVALID_PASSWORD:
          errorMsg.value = 'Invalid password'
          break

        default:
          errorMsg.value = errorCode
          break
      }
      return
    }
    await router.push({ path: '/' })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
