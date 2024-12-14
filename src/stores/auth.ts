// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user, // Check if the user is logged in
  },
  actions: {
    login(userData: any) {
      this.user = userData
    },
    logout() {
      this.user = null
    },
  },
})
