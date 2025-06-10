import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserRepositories } from '../services/githubService'
import type { GitHubRepository } from '../types/GitHubRepository'

export const useRepositoriesStore = defineStore('Repositories', () => {
  const error = ref<string>()
  const repositories = ref<GitHubRepository[]>([])

  async function fetchRepositories(username = import.meta.env.VITE_GITHUB_USERNAME) {
    try {
      repositories.value = await getUserRepositories(username)
    } catch (err) {
      error.value = 'Oops, an error ocurred while loading repositories, try again later.'
      console.error(err)
    }
  }

  return {
    error,
    repositories,
    fetchRepositories,
  }
})
