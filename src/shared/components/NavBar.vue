<template>
  <v-app-bar border-sm density="compact">
    <v-container class="d-flex justify-space-between align-center">
      <!-- Título -->
      <v-app-bar-title class="d-flex align-center ga-2">
        <div class="d-flex align-center">
          <v-icon icon="mdi-briefcase" />
          <span class="ml-2">Portfolio</span>
        </div>
      </v-app-bar-title>

      <!-- Botones en md y mayores -->
      <div class="d-none d-md-flex align-center">
        <v-btn rounded="pill" density="comfortable" to="/home">
          <v-icon size="small" icon="mdi-home" />
          <span class="ml-1">Home</span>
        </v-btn>

        <v-btn rounded="pill" density="comfortable" to="/about">
          <v-icon size="small" icon="mdi-account" />
          <span class="ml-1">About</span>
        </v-btn>

        <v-btn rounded="pill" density="comfortable" to="/contact">
          <v-icon size="small" icon="mdi-mailbox" />
          <span class="ml-1">Contact</span>
        </v-btn>

        <v-btn
          :href="gitHubUrl"
          class="ml-2"
          variant="tonal"
          density="comfortable"
          icon="mdi-github"
        />
        <v-btn
          v-if="linkedInUrl"
          :href="linkedInUrl"
          class="ml-2"
          variant="tonal"
          density="comfortable"
          icon="mdi-linkedin"
        />

        <v-btn
          v-if="auth.isAuth.value"
          @click="logout"
          class="ml-2"
          variant="tonal"
          density="comfortable"
          icon="mdi-logout"
        />
      </div>

      <!-- Botón menú para sm -->
      <v-btn icon class="d-md-none" @click="drawer = true">
        <v-icon icon="mdi-menu" />
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- Navigation Drawer para sm -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="d-md-none">
    <v-list>
      <v-list-item prepend-icon="mdi-home" title="Home" to="/home" @click="drawer = false" />

      <v-list-item prepend-icon="mdi-account" title="About" to="/about" @click="drawer = false" />
      <v-list-item
        prepend-icon="mdi-mailbox"
        title="Contact"
        to="/contact"
        @click="drawer = false"
      />
      <v-divider class="my-2" />
      <v-list-item :href="gitHubUrl" prepend-icon="mdi-github" title="GitHub" />
      <v-list-item
        v-if="linkedInUrl"
        :href="linkedInUrl"
        prepend-icon="mdi-linkedin"
        title="LinkedIn"
      />
      <v-list-item
        v-if="auth.isAuth.value"
        @click="logout"
        prepend-icon="mdi-logout"
        title="Logout"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useAuthStore } from '../stores/auth.store'

const drawer = ref(false)
const gitHubUrl = 'https://github.com/' + import.meta.env.VITE_GITHUB_USERNAME
const linkedInUrl = import.meta.env.VITE_LINKEDIN_URL

const auth = useAuth()
const authStore = useAuthStore()

async function logout() {
  await authStore.logout()
}
</script>
