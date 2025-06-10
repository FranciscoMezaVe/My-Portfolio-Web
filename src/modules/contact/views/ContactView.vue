<template>
  <v-container>
    <div class="d-flex align-center">
      <div>
        <h1>Get in Touch</h1>
        <div class="d-flex align-center justify-center">
          <v-fade-transition hide-on-leave>
            <v-progress-circular v-if="isLoading" color="primary" indeterminate size="40" />
            <div v-else>
              <p class="text-justify">
                {{ displayText }}
              </p>
            </div>
          </v-fade-transition>
        </div>
      </div>
      <ButtonEditText
        v-if="auth.isAuth.value"
        @submit="submitDescription"
        :text-type="contactStore.contact"
      />
    </div>

    <v-divider class="my-10"></v-divider>

    <div>
      <h2>Contact methods</h2>
      <div class="d-lg-flex ga-lg-5 justify-center">
        <ContactMethod
          class="mt-4 w-lg-50"
          :contact-method="item"
          v-for="item in contactsMethods"
          :key="item.id"
        />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useContactStore } from '../stores/contact.store'
import ContactMethod from '../components/ContactMethod.vue'
import type { IContactMethod } from '../Types/IContactMethod'
import ButtonEditText from '@/shared/components/ButtonEditText.vue'
import type { TextType } from '@/shared/types/TextType'
import { useAuth } from '@/shared/composables/useAuth'

const contactStore = useContactStore()
const auth = useAuth()
const isLoading = ref(true)

onMounted(async () => {
  await contactStore.fetchContact()
  isLoading.value = false
})

const displayText = computed(
  () =>
    contactStore.contact?.text ||
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsa praesentium eligendi saepe earum soluta quisquam necessitatibus dicta facere, nobis distinctio itaque. Reprehenderit sit autem sunt impedit praesentium voluptatibus neque.',
)

async function submitDescription(data: TextType) {
  await contactStore.setContact(data)
}

const contactsMethods: IContactMethod[] = [
  {
    id: 'linkedin',
    icon: 'mdi-linkedin',
    methodName: 'LinkedIn',
    MethodInfo: import.meta.env.VITE_LINKEDIN_URL,
  },
  {
    id: 'github',
    icon: 'mdi-github',
    methodName: 'GitHub',
    MethodInfo: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`,
  },
  {
    id: 'email',
    icon: 'mdi-email',
    methodName: 'Email',
    MethodInfo: import.meta.env.VITE_EMAIL,
  },
]
</script>

<style scoped></style>
