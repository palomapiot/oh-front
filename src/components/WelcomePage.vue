<!-- src/components/WelcomePage.vue -->
<template>
    <v-container>
      <v-row justify="center" align="center" style="height: 40vh;">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <h1>Online Harms Chat</h1>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="goToSignIn" color="primary">Sign In</v-btn>
              <v-btn @click="goToSignUp" color="secondary">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToSignIn = () => {
    router.push('/signin')
  }
  
  const goToSignUp = () => {
    router.push('/signup')
  }
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  