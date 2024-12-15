<template>
  <v-app>
    <v-app-bar app color="primary" :elevation="1">
        <!-- Navigation Drawer for Mobile -->
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <!-- Logo/Brand -->
        <img
          src="@/assets/IRLAB_LOGO.png"
          alt="Logo"
          class="mr-2"
          contain
        />
        <v-toolbar-title class="code-font">
          Oh! Chatbot
        </v-toolbar-title>
  
        <!-- Navigation Links -->
        <v-spacer></v-spacer>
        <v-btn class="d-none d-md-flex" @click="goToHome">Home</v-btn>
        <v-btn class="d-none d-md-flex" v-if="auth.isLoggedIn" @click="goToConversations">Conversations</v-btn>
        <v-btn class="d-none d-md-flex" @click="goToAbout">About</v-btn>
  
        <!-- Sign In/Sign Up -->
        <v-btn outlined color="secondary" class="ml-3" @click="auth.isLoggedIn ? logout() : goToSignIn()">{{ auth.isLoggedIn ? 'Logout' : 'Sign In' }}</v-btn>
      </v-app-bar>
  
      <!-- Drawer -->
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item @click="goToHome">Home</v-list-item>
          <v-list-item v-if="auth.isLoggedIn" @click="goToConversations">Conversations</v-list-item>
          <v-list-item @click="goToAbout">About</v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      variant="outlined"
      multi-line
    >
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn
          color="black"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const auth = useAuthStore()
const router = useRouter()
const drawer = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('')

const goToHome = () => {
  router.push('/')
}
const goToConversations = () => {
  router.push('/conversations')
}
const goToAbout = () => {
  router.push('/about')
}
const goToSignIn = () => {
  router.push('/signin')
}
const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.v-btn {
  font-weight: bold;
}
.code-font {
    font-family: 'Fira Code', monospace; 
    font-size: 2.4rem;
}
</style>
