<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { TimelineEditType } from '../types/timelineEditType'

const props = defineProps<{
  data?: TimelineEditType
  icon?: string
}>()

const emit = defineEmits<{
  submit: [data: TimelineEditType]
}>()

const isSubmitting = ref(false)

// Local editable copy (not tied to props directly)
const localEditableData = ref<TimelineEditType>({
  id: '',
  title: '',
  place: '',
  fromDate: '',
  toDate: '',
})

// Called when dialog is opened
function initializeLocalData() {
  localEditableData.value = {
    id: props.data?.id ?? '',
    title: props.data?.title ?? '',
    place: props.data?.place ?? '',
    fromDate: props.data?.fromDate ?? '',
    toDate: props.data?.toDate ?? '',
  }
}

// Submit edited details
async function submitDetails(isActive: Ref<boolean>) {
  isSubmitting.value = true

  try {
    emit('submit', { ...localEditableData.value })
    isActive.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <v-dialog class="w-md-75 w-lg-50">
      <template #activator="{ props: activatorProps }">
        <v-btn
          density="comfortable"
          class="ma-2"
          size="x-small"
          :icon="icon ?? 'mdi-pencil'"
          color="primary"
          v-bind="activatorProps"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          @click="
            () => {
              initializeLocalData()
            }
          "
        />
      </template>

      <template #default="{ isActive }">
        <v-card>
          <v-card-title>Edit Details</v-card-title>

          <v-card-text>
            <v-text-field
              v-model="localEditableData.title"
              label="Title"
              outlined
              :disabled="isSubmitting"
              dense
            />
            <v-text-field
              v-model="localEditableData.place"
              label="Place"
              outlined
              :disabled="isSubmitting"
              dense
            />
            <v-text-field
              v-model="localEditableData.fromDate"
              label="From"
              outlined
              dense
              :disabled="isSubmitting"
            />
            <v-text-field
              v-model="localEditableData.toDate"
              label="To"
              outlined
              dense
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
              @click="submitDetails(isActive)"
              :loading="isSubmitting"
              :disabled="isSubmitting || !localEditableData.title.trim()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
