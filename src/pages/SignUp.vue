<template>
    <v-container fluid fill-height class="d-flex align-center justify-center">
      <v-row class="flex-grow-1" justify="center" align="center">

        <v-col cols="12" md="4"> <!-- Illustration Column -->
            <v-img src="@/assets/signup.svg" alt="Illustration" contain />
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>
              <h2>Create Account</h2>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  variant="outlined"
                  required
                  clearable
                  style="margin-bottom: 16px;"
                ></v-text-field>
                
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                  clearable
                  style="margin-bottom: 16px;"
                ></v-text-field>
                
                <v-text-field
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  required
                  clearable
                  style="margin-bottom: 16px;"
                ></v-text-field>
                
                <v-row justify="center">
                    <v-col cols="auto">
                        <v-btn rounded="xl" type="submit" color="primary">Sign Up</v-btn>
                    </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <div style="text-align: center; margin-top: 16px;">
            <p>
              Already have an account? 
              <router-link to="/signin" style="color: #c6007e; text-decoration: none;">Sign In</router-link>
            </p>
          </div>
        </v-col>


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
      </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth' 

const router = useRouter() 
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const valid = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('')

// Validation rules
const usernameRules = [
  (v: string) => !!v || 'Username is required',
  (v: string) => (v && v.length >= 3) || 'Username must be at least 3 characters long',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 6) || 'Password must be at least 6 characters long',
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Password confirmation is required',
  (v: string) => v === password.value || 'Passwords must match',
]

const submitForm = async () => {
  if (valid.value) {
    // Call the backend API
    await axios.post(
      'http://192.168.1.122:8085/api/user/signup',
      { username: username.value, password: password.value },
      { withCredentials: true }
    ).then(response => {
      // Handle success response
      if (response.status === 200) {
        // Update global state for login
        authStore.login(response.data.token) 

        snackbarMessage.value = 'Sign up successful!'
        snackbarColor.value = '#c6007e'
        snackbar.value = true
        router.push('/conversations')
      } else {
        throw new Error(response.data.message || 'Sign-up failed.')
      }
    })
    .catch(err => {
      snackbarMessage.value = 'Error: ' + err.response.data.error || 'An error occurred during sign-up.'
      snackbarColor.value = 'black'
      snackbar.value = true
      throw new Error(err || 'Sign-up failed.')
    })
  } else {
    snackbarMessage.value = 'Please fix the errors in the form.'
    snackbarColor.value = 'black'
    snackbar.value = true
  }
}

</script>

<style scoped>
.v-container {
    min-height: 70vh; /* Ensure the container takes the full height of the viewport */
}
</style>
