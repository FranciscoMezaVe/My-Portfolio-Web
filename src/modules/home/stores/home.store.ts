import type { TextType } from '@/shared/types/TextType'
import { defineStore } from 'pinia'
import * as service from '../services/homeService'
import { ref } from 'vue'
import { getImageOfProfile } from '@/shared/services/image.service'

export const useHomeStore = defineStore('Home', () => {
  const error = ref<string>()
  const description = ref<TextType>()
  const title = ref<TextType>({ id: 'Title', text: '' })
  const profileImage = ref<string>()

  async function fetchHomeDescription() {
    try {
      const result = await service.GetHomeDescription()

      description.value = (result ?? {
        id: 'Description',
        text: 'Aqui puedes poner tu descripcion',
      }) as TextType
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred a errore while loading home info, try again.'
      description.value = {
        id: 'Description',
        text: 'Aqui puedes poner tu descripcion',
      }
    }
  }

  async function fectHomeTitle() {
    try {
      const result = await service.getHomeTitle()
      if (!result) {
        return
      }

      title.value = result
    } catch (err) {
      console.error(err)
      error.value = 'Oops!, ocurred a errore while loading home title, try again.'
    }
  }

  async function SetHomeDescription(data: TextType) {
    try {
      await service.SetHomeDescription(data)
      description.value = data
    } catch (err) {
      console.error(err)
      error.value = error.value = 'Oops!, ocurred a errore while setting home info, try again.'
    }
  }

  async function setHomeTitle(data: TextType) {
    try {
      await service.setHomeTitle(data)
      title.value = data
    } catch (err) {
      console.error(err)
      error.value = 'Oopd!, ocurred an error while setting home title, try again'
    }
  }

  async function loadProfileImage() {
    try {
      profileImage.value = await getImageOfProfile()
    } catch (err) {
      console.error(err)
    }
  }

  async function loadAll() {
    await fetchHomeDescription()
    await loadProfileImage()
    await fectHomeTitle()
  }

  return {
    error,
    description,
    profileImage,
    title,
    fetchHomeDescription,
    SetHomeDescription,
    loadProfileImage,
    setHomeTitle,
    loadAll,
    fectHomeTitle,
  }
})
