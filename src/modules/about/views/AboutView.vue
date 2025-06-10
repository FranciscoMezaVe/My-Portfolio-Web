<template>
  <v-container class="py-10">
    <v-row>
      <!-- Perfil -->
      <v-col cols="12" md="6">
        <v-card class="pa-6 text-center elevation-3 mb-6">
          <!--Profile-->
          <div class="d-flex justify-center align-center">
            <div>
              <v-avatar size="100" class="mx-auto mb-4">
                <v-img
                  v-if="useAbout.ProfileState.base64Image !== ''"
                  :src="useAbout.ProfileState.base64Image"
                />

                <v-img v-else color="white" src="/src/assets/profile.svg"></v-img>
              </v-avatar>
              <h2 class="mb-1">
                {{ useAbout.ProfileState.name !== '' ? useAbout.ProfileState.name : 'Name' }}
              </h2>
              <p class="text-subtitle-1 font-weight-medium">
                {{ useAbout.ProfileState.job !== '' ? useAbout.ProfileState.job : 'Job' }}
              </p>
              <p class="text-caption">
                {{
                  useAbout.ProfileState.basement !== ''
                    ? useAbout.ProfileState.basement
                    : 'Basement'
                }}
              </p>
              <v-divider class="my-4" />
            </div>
            <ProfileEdit
              v-if="auth.isAuth.value"
              :model="useAbout.ProfileState"
              @submit="setProfile"
            />
          </div>

          <!--Description-->
          <div class="d-flex align-center justify-center">
            <v-fade-transition hide-on-leave>
              <v-progress-circular v-if="isLoading" indeterminate color="primary" size="40" />
              <div v-else class="d-flex align-center">
                <p class="text-body-2 text-justify mb-0 me-2" style="flex: 1">
                  {{ useAbout.description?.text || '' }}
                </p>
                <ButtonEditText
                  v-if="auth.isAuth.value"
                  @submit="submitText"
                  :text-type="useAbout.description!"
                />
              </div>
            </v-fade-transition>
          </div>
        </v-card>

        <!-- Personal Statement -->
        <v-card class="pa-6 elevation-3 mt-6">
          <h3 class="text-h6 mb-3 d-flex align-center justify-between">Personal Statement</h3>
          <div class="d-flex align-center justify-center">
            <v-fade-transition hide-on-leave>
              <v-progress-circular v-if="isLoading" indeterminate color="primary" size="40" />
              <div v-else class="d-flex align-center">
                <p class="text-body-2 text-justify mb-0 me-2">
                  {{ useAbout.personalStatement?.text || '' }}
                </p>
                <ButtonEditText
                  v-if="auth.isAuth.value"
                  @submit="submitText"
                  :text-type="useAbout.personalStatement!"
                />
              </div>
            </v-fade-transition>
          </div>
        </v-card>
      </v-col>

      <!-- Skills + Experience -->
      <v-col cols="12" md="6">
        <!-- Skills -->
        <v-card class="pa-6 elevation-3 mb-6">
          <div class="d-flex">
            <h3 class="text-h6 mb-4 mr-2">Skills</h3>
            <SkillsAddButton v-if="auth.isAuth.value" @submit="addSkill" />
          </div>
          <v-fade-transition hide-on-leave>
            <v-row>
              <v-col cols="12" class="text-center" v-if="isLoading">
                <v-progress-circular indeterminate color="primary" />
              </v-col>

              <template v-else>
                <v-col
                  v-for="item in useAbout.skills"
                  :key="item.id"
                  cols="4"
                  sm="3"
                  md="2"
                  class="d-flex justify-center"
                >
                  <div class="position-relative">
                    <v-avatar size="36" rounded="0">
                      <v-img :alt="item.id" :src="item.text" />
                    </v-avatar>

                    <v-btn
                      v-if="auth.isAuth.value"
                      @click="deleteSkill(item.id)"
                      variant="elevated"
                      icon="mdi-delete"
                      size="x-small"
                      density="comfortable"
                      color="red"
                      class="position-absolute"
                      elevation="3"
                    />
                  </div>
                </v-col>
              </template>
            </v-row>
          </v-fade-transition>
        </v-card>

        <!-- Experience -->
        <v-card class="pa-6 elevation-3 mb-6">
          <div class="d-flex pa-5">
            <h3 class="text-h6 mb-1">Experience</h3>
            <EditTimelineButtons v-if="auth.isAuth.value" @submit="addExperience" icon="mdi-plus" />
          </div>
          <v-fade-transition hide-on-leave>
            <div v-if="isLoading" class="text-center my-6">
              <v-progress-circular indeterminate color="primary" size="40" />
            </div>

            <div v-else>
              <div v-for="item in useExperience.experiences" :key="item.id">
                <CustomTimeline
                  @delete="removeExperience"
                  @edit="editExperiencie"
                  icon="mdi-briefcase"
                  :editable="auth.isAuth.value"
                  :item="item"
                />
              </div>
            </div>
          </v-fade-transition>
        </v-card>

        <!-- Education -->
        <v-card class="pa-6 elevation-3">
          <div class="d-flex pa-5">
            <h3 class="text-h6 mb-1">Education</h3>
            <EditTimelineButtons v-if="auth.isAuth.value" @submit="addEducation" icon="mdi-plus" />
          </div>

          <v-fade-transition hide-on-leave>
            <div v-if="isLoading" class="text-center my-6">
              <v-progress-circular indeterminate color="primary" size="40" />
            </div>

            <div v-else>
              <div v-for="item in useEducation.educations" :key="item.id">
                <CustomTimeline
                  @edit="editEducation"
                  @delete="removeEducation"
                  icon="mdi-school"
                  :editable="auth.isAuth.value"
                  :item="item"
                />
              </div>
            </div>
          </v-fade-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import CustomTimeline from '@/modules/about/components/CustomTimeline.vue'
import ButtonEditText from '@/shared/components/ButtonEditText.vue'
import { useExperienceStore } from '../stores/experience.store'
import { useEducationStore } from '../stores/education.store'
import { useAboutStore } from '../stores/about.store'
import { onMounted, ref } from 'vue'
import type { TextType } from '@/shared/types/TextType'
import { useAuth } from '@/shared/composables/useAuth'
import type { TimelineEditType } from '../types/timelineEditType'
import EditTimelineButtons from '../components/EditTimelineButtons.vue'
import SkillsAddButton from '../components/SkillsAddButton.vue'
import ProfileEdit from '../components/ProfileEdit.vue'
import type { ProfileType } from '../types/profileType'

const auth = useAuth()
const useExperience = useExperienceStore()
const useEducation = useEducationStore()
const useAbout = useAboutStore()

const isLoading = ref(true)

onMounted(async () => {
  if (!useEducation.educations.length || !useExperience.experiences.length) {
    try {
      await Promise.all([
        useExperience.loadExperiences(),
        useEducation.loadEducations(),
        useAbout.fetchAll(),
      ])
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})

async function submitText(data: TextType) {
  try {
    await useAbout.SetAboutInfo(data)
  } catch (err) {
    console.error('Error updating text:', err)
  }
}

async function editExperiencie(data: TimelineEditType) {
  await useExperience.updateExperience(data)
}

async function addExperience(data: TimelineEditType) {
  await useExperience.addNewExperience(data)
}

async function removeExperience(id: string) {
  await useExperience.removeExperience(id)
}

async function editEducation(data: TimelineEditType) {
  await useEducation.updateEducation(data)
}

async function addEducation(data: TimelineEditType) {
  await useEducation.addNewEducation(data)
}

async function removeEducation(id: string) {
  await useEducation.removeEducation(id)
}

async function addSkill(data: TextType) {
  await useAbout.addSkill(data)
}

async function deleteSkill(id: string) {
  await useAbout.removeSkill(id)
}

async function setProfile(profile: ProfileType) {
  await useAbout.setProfile(profile)
}
</script>
