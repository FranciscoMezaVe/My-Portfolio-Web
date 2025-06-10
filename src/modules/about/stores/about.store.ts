import type { TextType } from '@/shared/types/TextType'
import { defineStore } from 'pinia'
import * as service from '../services/aboutService'
import { reactive, ref } from 'vue'
import type { ProfileType } from '../types/profileType'

export const useAboutStore = defineStore('About', () => {
  const error = ref<string>()
  const description = ref<TextType>()
  const personalStatement = ref<TextType>()
  const skills = ref<TextType[]>()
  const ProfileState = reactive<ProfileType>({
    id: 'Profile',
    job: '',
    name: '',
    basement: '',
    base64Image: '',
  })

  async function fetchAboutDescription() {
    try {
      const result = await service.GetAboutDescription()

      description.value = (result ?? {
        id: 'Description',
        text: 'Aqui puedes poner tu Texto',
      }) as TextType
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred a errore while loading about info, try again.'
      description.value = {
        id: 'Description',
        text: 'Aqui puedes poner tu Texto',
      }
    }
  }

  async function fetchSkills() {
    try {
      skills.value = await service.getSkills()
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred a errore while loading skills info, try again.'
    }
  }

  async function fetchAboutPersonalStatement() {
    try {
      const result = await service.GetAboutPersonalStatemet()

      personalStatement.value = (result ?? {
        id: 'PersonalStatement',
        text: 'Aqui puedes poner tu Texto',
      }) as TextType
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred a errore while loading about info, try again.'
      personalStatement.value = {
        id: 'PersonalStatement',
        text: 'Aqui puedes poner tu Texto',
      }
    }
  }
  async function fetchAll() {
    await fetchAboutDescription()
    await fetchAboutPersonalStatement()
    await fetchSkills()
    await LoadProfile()
  }

  async function SetAboutInfo(data: TextType) {
    try {
      await service.SetAboutInfo(data)

      // Actualiza dinámicamente el valor correspondiente
      switch (data.id) {
        case 'Description':
          description.value = data
          break
        case 'PersonalStatement':
          personalStatement.value = data
          break
        default:
          console.warn(`Unknown TextType id: ${data.id}`)
          break
      }
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, occurred an error while setting about info, try again.'
    }
  }

  async function addSkill(skill: TextType) {
    try {
      const skillToSend = { text: skill.text }
      const skillId = await service.AddSkill(skillToSend)

      if (skills.value) {
        skills.value.push({ id: skillId, text: skill.text })
      }
    } catch (err) {
      console.error(err)
      error.value = 'Oops! An error occurred while adding the skill. Please try again.'
    }
  }

  async function removeSkill(id: string) {
    try {
      await service.removeSkill(id)
      skills.value = skills.value?.filter((skill) => skill.id !== id)
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, occurred an error while remove skill, try again.'
    }
  }

  async function setProfile(profile: ProfileType) {
    try {
      await service.setProfile(profile)
      Object.assign(ProfileState, profile)
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred an error while setting profile, try again'
    }
  }

  async function LoadProfile(): Promise<void> {
    try {
      const profile = await service.getProfile()
      Object.assign(ProfileState, profile)
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred an error while getting profile, try again'
    }
  }

  return {
    error,
    description,
    personalStatement,
    skills,
    ProfileState,
    fetchAll,
    SetAboutInfo,
    fetchSkills,
    addSkill,
    removeSkill,
    setProfile,
    LoadProfile,
  }
})
