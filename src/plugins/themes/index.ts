import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { darkTheme } from './themes'
import { VFileUpload, VFileUploadItem } from 'vuetify/labs/VFileUpload'

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
  defaults: {
    global: {
      class: 'custom-font',
    },
  },
  components: {
    VFileUpload,
    VFileUploadItem,
  },
})
