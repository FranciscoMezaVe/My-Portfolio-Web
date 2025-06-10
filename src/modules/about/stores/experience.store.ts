import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as service from '../services/experienceService'
import type { TimelineEditType } from '../types/timelineEditType'

export const useExperienceStore = defineStore('experience', () => {
  const experiences = ref<TimelineEditType[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadExperiences() {
    loading.value = true
    try {
      experiences.value = await service.fetchExperiences()
    } catch (err) {
      error.value = 'Error while loading experiences, try again later'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function addNewExperience(exp: TimelineEditType) {
    try {
      const newExperience = await service.addExperience(exp)
      experiences.value.push(newExperience)
    } catch (err) {
      error.value = 'Error adding experience'
      console.error(err)
    }
  }

  async function updateExperience(exp: TimelineEditType) {
    try {
      const index = experiences.value.findIndex((e) => e.id == exp.id)

      if (index == -1) {
        error.value = "Experience doesn't exists"
        console.error(error.value)
        return
      }

      await service.updateExperience(exp)
      experiences.value[index] = exp
    } catch (err) {
      console.error(err)
      error.value = 'Ocurred error while update experiences'
    }
  }

  async function removeExperience(id: string) {
    await service.deleteExperience(id)
    experiences.value = experiences.value.filter((e) => e.id !== id)
  }

  return {
    experiences,
    loading,
    error,
    loadExperiences,
    addNewExperience,
    removeExperience,
    updateExperience,
  }
})
