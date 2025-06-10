<template>
  <div>
    <v-btn
      @click="activateDialog"
      color="primary"
      icon="mdi-pencil"
      size="x-small"
      density="default"
    />
    <v-dialog v-model="isActiveDialog" class="w-md-75 w-lg-50">
      <v-card>
        <v-card-title>Profile</v-card-title>
        <v-card-text>
          <!--IMAGE-->
          <v-file-upload clearable show-size v-model="imageModel">
            <template v-slot:item="{ props: itemProps }">
              <v-file-upload-item v-bind="itemProps" lines="one" nav>
                <template v-slot:prepend>
                  <v-avatar size="32" rounded></v-avatar>
                </template>

                <template v-slot:clear="{ props: clearProps }">
                  <v-btn color="primary" v-bind="clearProps"></v-btn>
                </template>
              </v-file-upload-item>
            </template>
          </v-file-upload>

          <!--FIELDS-->
          <v-text-field label="Name" v-model="profile.name" />
          <v-text-field label="Job" v-model="profile.job" />
          <v-text-field label="Basement" v-model="profile.basement" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="isActiveDialog = false">Cancel</v-btn>
          <v-btn @click="HandleSubmit" :disabled="!isFormValid" color="primary" variant="text">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, shallowRef, watch } from 'vue'
import type { ProfileType } from '../types/profileType'
import { fileToBase64 } from '@/shared/utilities/ImageUtilities'

const isActiveDialog = ref(false)

const profile = reactive<ProfileType>({
  id: 'Profile',
  name: '',
  job: '',
  basement: '',
  base64Image: '',
})

const imageModel = shallowRef<File>()

const emits = defineEmits<{
  (e: 'submit', data: ProfileType): void
}>()

const props = defineProps<{
  model?: ProfileType
}>()

watch(
  () => props.model,
  (newModel) => {
    if (!newModel) return
    Object.assign(profile, newModel)
  },
  { immediate: true },
)

function activateDialog() {
  isActiveDialog.value = true
  if (props.model) {
    Object.assign(profile, props.model)
  } else {
    // Reiniciar el estado si no hay modelo
    Object.assign(profile, {
      id: 'Profile',
      name: '',
      job: '',
      basement: '',
      base64Image: '',
    })
  }
}

function areAllFieldsFilled(obj: Record<string, string>, excludeKeys: string[] = []): boolean {
  return Object.entries(obj)
    .filter(([key]) => !excludeKeys.includes(key))
    .every(([_, value]) => value.trim() !== '')
}

const isFormValid = computed(() => areAllFieldsFilled(profile, ['base64Image']))

async function HandleSubmit() {
  try {
    isActiveDialog.value = false

    if (imageModel.value) {
      profile.base64Image = await fileToBase64(imageModel.value)
    }

    emits('submit', profile)
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped></style>
