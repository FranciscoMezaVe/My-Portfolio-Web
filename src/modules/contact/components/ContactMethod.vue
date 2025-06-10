<template>
  <v-card class="d-flex align-center pa-4 mb-4" elevation="3" rounded="lg">
    <v-avatar color="primary" size="40">
      <v-icon :icon="contactMethod.icon" color="white" />
    </v-avatar>

    <div class="ml-4">
      <div class="text-subtitle-1 font-weight-medium">
        {{ contactMethod.methodName }}
      </div>
      <div class="text-body-2 text-grey-darken-1">
        {{ contactMethod.MethodInfo }}
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { IContactMethod } from '../Types/IContactMethod'

defineProps<{
  contactMethod: IContactMethod
}>()
</script>

<style scoped></style>
