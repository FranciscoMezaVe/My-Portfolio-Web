<template>
  <div>
    <v-btn
      icon="mdi-plus"
      density="comfortable"
      size="x-small"
      color="primary"
      @click="openDialog"
    />
    <v-dialog v-model="isActiveDialog" class="w-md-75 w-lg-50">
      <v-card>
        <v-card-title> Add Skill </v-card-title>
        <v-card-text>
          <v-text-field label="SVG URL" v-model="svgUrl.text"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="isActiveDialog = false">Cancel</v-btn>
          <v-btn color="primary" :disabled="svgUrl.text == ''" @click="handleSubmit"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { TextType } from '@/shared/types/TextType'
import { ref } from 'vue'

const isActiveDialog = ref(false)
const svgUrl = ref<TextType>({ id: '', text: '' })

const openDialog = () => {
  isActiveDialog.value = true
  svgUrl.value.text = ''
}

const emits = defineEmits<{
  (e: 'submit', data: TextType): void
}>()

const handleSubmit = async () => {
  isActiveDialog.value = false
  try {
    emits('submit', svgUrl.value!)
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped></style>
