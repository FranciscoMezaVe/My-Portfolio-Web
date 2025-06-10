import axios from 'axios'
import type { GitHubRepository } from '../types/GitHubRepository'

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
})

export const getUserRepositories = async (username: string): Promise<GitHubRepository[]> => {
  try {
    const response = await githubApi.get<GitHubRepository[]>(`/users/${username}/repos`)
    return response.data
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return []
  }
}
