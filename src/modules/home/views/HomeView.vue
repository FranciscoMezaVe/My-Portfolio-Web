<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="5" class="d-flex align-center justify-center">
        <v-avatar rounded="xl" size="220">
          <v-img v-if="useHome.profileImage !== ''" :src="useHome.profileImage"></v-img>
          <v-img v-else src="/src/assets/profile.svg" />
        </v-avatar>
      </v-col>

      <v-col cols="12" md="7">
        <div>
          <div class="d-flex">
            <h1>{{ useHome.title.text !== '' ? useHome.title.text : 'Title' }}</h1>
            <ButtonEditText
              v-if="auth.isAuth.value"
              @submit="submitTtitle"
              :text-type="useHome.title!"
            />
          </div>
          <div class="d-flex justify-center align-center">
            <v-fade-transition hide-on-leave>
              <v-progress-circular v-if="isLoading" indeterminate color="primary" size="40" />
              <div v-else class="d-flex align-center">
                <p class="text-body-2 text-justify">
                  {{ useHome.description?.text }}
                </p>
                <ButtonEditText
                  v-if="auth.isAuth.value"
                  @submit="submitText"
                  :text-type="useHome.description!"
                />
              </div>
            </v-fade-transition>
          </div>
        </div>
        <div class="d-flex justify-center ma-sm-3 ma-md-12 ga-4">
          <v-btn :disabled="isLoading" size="small" :href="urlRepositoriesGitHub" color="primary"
            >View All Projects</v-btn
          >
          <v-btn size="small" to="/about" color="primary">About me</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-divider class="ma-5"></v-divider>
    <v-row class="pa-5 justify-center">
      <div class="d-flex flex-column align-center w-100">
        <h2>Featured Projects</h2>

        <v-fade-transition hide-on-leave>
          <div v-if="isLoading" class="text-center my-6">
            <v-progress-circular indeterminate color="primary" size="40" />
          </div>

          <RepositoriesCard
            v-else
            class="w-lg-66 mx-auto"
            :repositories="useRepositories.repositories"
          />
        </v-fade-transition>
      </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRepositoriesStore } from '@/shared/stores/repositories.store'
import RepositoriesCard from '@/shared/components/RepositoriesCard.vue'
import { useHomeStore } from '../stores/home.store'
import ButtonEditText from '@/shared/components/ButtonEditText.vue'
import type { TextType } from '@/shared/types/TextType'
import { useAuth } from '@/shared/composables/useAuth'

const useRepositories = useRepositoriesStore()
const useHome = useHomeStore()
const isLoading = ref(true)
const auth = useAuth()
const gitHubUserName = import.meta.env.VITE_GITHUB_USERNAME
const urlRepositoriesGitHub = 'https://github.com/' + gitHubUserName + '?tab=repositories'

onMounted(async () => {
  try {
    if (!useRepositories.repositories.length) {
      isLoading.value = true
      await Promise.all([useRepositories.fetchRepositories(), useHome.loadAll()])
    }
  } finally {
    isLoading.value = false
  }
})

async function submitText(data: TextType) {
  await useHome.SetHomeDescription(data)
}

async function submitTtitle(data: TextType) {
  await useHome.setHomeTitle(data)
}
</script>

<style scoped></style>
