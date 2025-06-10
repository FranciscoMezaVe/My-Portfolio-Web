import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as service from '../services/educationService'
import type { TimelineEditType } from '../types/timelineEditType'

export const useEducationStore = defineStore('education', () => {
  const educations = ref<TimelineEditType[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEducations() {
    loading.value = true
    try {
      educations.value = await service.fetchEducation()
    } catch (err) {
      error.value = 'Error while loanding educations, try again later'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function addNewEducation(data: TimelineEditType) {
    await service.addEducation(data)
    educations.value.push(data)
  }

  async function updateEducation(exp: TimelineEditType) {
    try {
      const index = educations.value.findIndex((e) => e.id == exp.id)

      if (index == -1) {
        error.value = "Experience doesn't exists"
        console.error(error.value)
        return
      }

      await service.updateEducation(exp)
      educations.value[index] = exp
    } catch (err) {
      console.error(err)
      error.value = 'Ocurred error while update education'
    }
  }

  async function removeEducation(id: string) {
    await service.deleteEducation(id)
    educations.value = educations.value.filter((e) => e.id !== id)
  }

  return {
    educations,
    loading,
    error,
    loadEducations,
    addNewEducation,
    removeEducation,
    updateEducation,
  }
})
