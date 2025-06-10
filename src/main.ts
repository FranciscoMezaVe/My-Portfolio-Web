import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify } from './plugins/themes'
import { createPinia } from 'pinia'
import './plugins/firebase'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount('#app')
