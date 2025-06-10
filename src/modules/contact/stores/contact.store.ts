import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TextType } from '@/shared/types/TextType'
import { contactService } from '../services/contact.service'

export const useContactStore = defineStore('contact', () => {
  const contact = ref<TextType>({ id: 'Description', text: '' })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchContact = async () => {
    isLoading.value = true
    try {
      const result = await contactService.get()
      if (!result) {
        return
      }

      contact.value = result
    } catch (err) {
      error.value = 'Error fetching contact info'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addContact = async (text: Omit<TextType, 'id'>) => {
    const id = await contactService.add(text)
    contact.value = { id, ...text }
  }

  const updateContact = async (updates: Partial<Omit<TextType, 'id'>>) => {
    if (!contact.value) return
    await contactService.update(contact.value.id, updates)
    contact.value = { ...contact.value, ...updates }
  }

  const setContact = async (updates: Partial<Omit<TextType, 'id'>>) => {
    if (!contact.value) return
    await contactService.set(contact.value.id, updates)
    contact.value = { ...contact.value, ...updates }
  }

  return {
    contact,
    isLoading,
    error,
    fetchContact,
    addContact,
    updateContact,
    setContact,
  }
})
