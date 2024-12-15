<template>
  <v-container>
    <h1 class="code-font">Oh! Chatbot</h1>

    <!-- Step 1 -->
    <v-row align="center">
      <v-col cols="6" md="6">
        <img src="@/assets/chatbot.svg" alt="Step 1 Graphic" width="100%" />
      </v-col>
      <v-col cols="6" md="6">
        <h2>Chatbot for Content Moderators Supports</h2>
        <p>Oh (Online harms) chatbot is designed specifically for content moderators, providing assistance in identifying and addressing harmful content.</p>
      </v-col>
    </v-row>

    <!-- Step 2 -->
    <v-row align="center">
      <v-col cols="6" md="6" order="2"> 
        <img src="@/assets/analysis.svg" alt="Step 2 Graphic" width="100%" />
      </v-col>
      <v-col cols="6" md="6" order="1">
        <h2>Detect Online Harms with LLMs</h2>
        <p>Leveraging the power of large language models (LLMs), our tool can accurately detect a wide range of online harms, including hate speech, misinformation, and hyperpartisan news. This advanced technology enables proactive identification of harmful content, allowing moderators to act swiftly to mitigate its impact.</p>
      </v-col>
    </v-row>

    <!-- Step 3 -->
    <v-row align="center">
      <v-col cols="6" md="6">
        <img src="@/assets/safe.svg" alt="Step 3 Graphic" width="100%" />
      </v-col>
      <v-col cols="6" md="6">
        <h2>Make Social Networks Safer</h2>
        <p>By utilizing our innovative chatbot and detection capabilities, social networks can become safer environments for users. Our solution empowers moderators to maintain community standards, reduce harmful interactions, and foster a positive online atmosphere for all users.</p>
      </v-col>
    </v-row>

    <!-- Invitation to join -->
    <v-row justify="center" class="invitation" v-if="auth.isLoggedIn" >
      <v-col cols="12" md="8" class="text-center">
        <h2>Join our community of content moderators!</h2>
        <p class="mb-4">Ready to get started? Sign in to your existing account or create a new one to access powerful features that will help you make social networks safer.</p>
        <v-btn rounded="xl" size="x-large" @click="goToSignIn" color="primary" class="mr-4">Sign In</v-btn>
        <v-btn rounded="xl" size="x-large" @click="goToSignUp" color="secondary">Sign Up</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const goToSignIn = () => {
  router.push('/signin')
}

const goToSignUp = () => {
  router.push('/signup')
}
</script>
  
<style scoped>
.invitation {
  padding-top: 64px;
}
.code-font {
    font-family: 'Fira Code', monospace; 
    font-size: 5rem;
    color: #c6007e; 
    text-align: center;
}
</style>
  