<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <!-- Navigation Drawer for Mobile -->
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <!-- Logo/Brand -->
        <v-toolbar-title>
          Online Harms Chat
        </v-toolbar-title>
  
        <!-- Navigation Links -->
        <v-spacer></v-spacer>
        <v-btn text class="d-none d-md-flex" @click="goToHome">Home</v-btn>
        <v-btn text class="d-none d-md-flex" v-if="auth.isLoggedIn" @click="goToConversations">Conversations</v-btn>
        <v-btn text class="d-none d-md-flex" @click="goToAbout">About</v-btn>
  
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

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
  const router = useRouter()
  const drawer = ref(false)
  
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
/* Add any additional custom styles here */
.v-btn {
  font-weight: bold;
}
</style>
