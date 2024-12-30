/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // Use your auth store
  const isLoggedIn = authStore.isLoggedIn // Check if the user is logged in

  // Define routes that require authentication
  const protectedRoutes = ['/conversations']

  // Check if the user is accessing a protected route
  if (protectedRoutes.includes(to.path) && !isLoggedIn) {
    next({ path: '/SignIn' }) // Redirect to Sign In if not logged in
  } else {
    next() // Proceed to the requested route
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
