<template>
  <v-timeline fill-dot truncate-line="both" side="end">
    <v-timeline-item dot-color="primary">
      <template #icon>
        <v-icon v-if="icon" :icon="icon" />
      </template>

      <div class="font-weight-bold">
        <strong>{{ item.title }}</strong>
      </div>
      <div class="text-caption mb-2">{{ item.place }}</div>
      <div class="text-caption font-weight-thin">{{ item.fromDate }} - {{ item.toDate }}</div>

      <div v-if="editable" class="d-flex gap-5 ma-1">
        <v-btn
          density="comfortable"
          class="ma-2"
          size="x-small"
          icon="mdi-delete"
          color="red"
          @click="$emit('delete', item.id)"
        />
        <EditTimelineButtons @submit="(data) => $emit('edit', data)" :data="item" />
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import EditTimelineButtons from '../components/EditTimelineButtons.vue'
import type { TimelineEditType } from '../types/timelineEditType'

defineProps<{
  item: TimelineEditType
  editable?: boolean
  icon: string
}>()

defineEmits<{
  (e: 'delete', id: string): void
  (e: 'edit', data: TimelineEditType): void
}>()
</script>
