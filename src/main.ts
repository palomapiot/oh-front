/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

registerPlugins(app)

const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
