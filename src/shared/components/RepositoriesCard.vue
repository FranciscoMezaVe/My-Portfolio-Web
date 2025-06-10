<template>
  <div>
    <v-card
      v-for="repository in repositories"
      :key="repository.id"
      class="mt-2 elevation-3 rounded-xl transition-fast-in-fast-out hover:scale-105"
    >
      <v-row>
        <v-col cols="8">
          <v-card-title>{{ repository.name }}</v-card-title>
          <v-card-subtitle>
            <v-chip v-if="repository.language" class="ma-2" color="info">
              <v-icon start icon="mdi-code-tags" />
              {{ repository.language }}
            </v-chip>
            <v-chip
              v-for="topic in repository.topics"
              :key="topic.length"
              class="ma-1"
              size="small"
            >
              #{{ topic }}
            </v-chip>

            {{ formatDate(repository.created_at) }}
          </v-card-subtitle>
          <v-card-text>{{ repository.description }}</v-card-text>
        </v-col>
        <v-col cols="4" class="d-flex justify-center align-center">
          <v-avatar size="100" class="mx-auto my-4">
            <v-icon size="100" color="primary" icon="mdi-github" />
          </v-avatar>
        </v-col>
      </v-row>
      <div class="d-flex align-center justify-center w-100 ga-4 mb-2">
        <v-btn
          v-if="repository.homepage"
          :href="repository.homepage"
          target="_blank"
          icon="mdi-open-in-new"
          variant="tonal"
          size="small"
        />
        <v-btn
          v-if="repository.html_url"
          :href="repository.html_url"
          target="_blank"
          prepend-icon="mdi-github"
          text="View project"
          variant="tonal"
          class="mb-2"
        />
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { GitHubRepository } from '@/shared/types/GitHubRepository'

defineProps<{
  repositories: GitHubRepository[]
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped></style>
