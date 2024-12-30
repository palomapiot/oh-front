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
      localStorage.setItem('user', JSON.stringify(userData))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    initializeAuth() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
      }
    },
  },
})
