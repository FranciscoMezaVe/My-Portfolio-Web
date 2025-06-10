<template>
  <div>
    <v-dialog class="w-md-75 w-lg-50">
      <template #activator="{ props: activatorProps }">
        <v-btn
          size="x-small"
          class="ma-2"
          v-bind="activatorProps"
          color="primary"
          icon="mdi-pencil"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        />
      </template>

      <template #default="{ isActive }">
        <v-card>
          <v-card-title>Edit text</v-card-title>

          <v-card-text>
            <v-textarea
              v-model="editableText"
              label="Texto"
              auto-grow
              outlined
              :disabled="isSubmitting"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="red"
              variant="text"
              @click="isActive.value = false"
              :disabled="isSubmitting"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              variant="text"
              @click="submitText(isActive)"
              :loading="isSubmitting"
              :disabled="isSubmitting || !editableText.trim()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import type { TextType } from '../types/TextType'

// Props
const props = defineProps<{
  textType: TextType
}>()

// Emit
const emit = defineEmits<{
  submit: [data: TextType]
}>()

// Estado local
const editableText = ref(props.textType?.text ?? '')
const isSubmitting = ref(false)

// Sincronizar si cambia desde el padre
watch(
  () => props.textType.text,
  (newVal) => {
    editableText.value = newVal
  },
)

// Enviar el nuevo texto
async function submitText(isActive: Ref<boolean>) {
  const text = editableText.value.trim()
  if (!text) return

  isSubmitting.value = true

  try {
    emit('submit', {
      id: props.textType.id,
      text,
    })
    isActive.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>
