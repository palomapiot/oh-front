<template>
    <v-container fluid fill-height class="d-flex align-center justify-center">
        <v-row class="flex-grow-1" justify="center" align="center">
            <v-col cols="12" md="4"> <!-- Card Column -->
                <v-card>
                    <v-card-title>
                        <h2>Sign In</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                            <v-text-field
                                v-model="username"
                                :rules="usernameRules"
                                label="Username"
                                required
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                            
                            <v-row justify="center">
                                <v-col cols="auto">
                                    <v-btn rounded="xl" type="submit" color="primary">Sign In</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>

                <div style="text-align: center; margin-top: 16px;">
                    <p>
                        Don't have an account? 
                        <router-link to="/signup" style="color: #c6007e; text-decoration: none;">Register</router-link>
                    </p>
                </div>

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
            </v-col>

            <v-col cols="12" md="4"> <!-- Illustration Column -->
                <v-img src="@/assets/signin.svg" alt="Illustration" contain />
            </v-col>
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
const valid = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('')
  
// Validation rules
const usernameRules = [
    (v: string) => !!v || 'Username is required',
]

const passwordRules = [
    (v: string) => !!v || 'Password is required',
]
  
const submitForm = async () => {
    if (valid.value) {
        try {
        // Call the backend API
        /*const response = await axios.post(
            'https://your-backend.com/signin',
            { username: username.value, password: password.value },
            { withCredentials: true }
        )*/

        await new Promise((resolve) => setTimeout(resolve, 100));

        // Mock response
        const response = {
            status: 200,
            data: {
            success: true,
            message: 'Sign in successful!',
            user: {
                username: 'paloma',
                cookie: '1234'
            }
            },
        };

        // Handle success response
        if (response.status === 200 && response.data.success) {
            authStore.login(response.data.user) 

            snackbarMessage.value = 'Sign in successful!'
            snackbarColor.value = 'success'
            snackbar.value = true

            // Update global or parent state for login (e.g., with Pinia or Vuex)
            console.log('User is now logged in.')
        } else {
            throw new Error(response.data.message || 'Sign-in failed.')
        }
        } catch (error) {
        // Handle error responses
        snackbarMessage.value = error.message || 'An error occurred during sign-in.'
        snackbarColor.value = 'error'
        snackbar.value = true
        }
    } else {
        snackbarMessage.value = 'Please fix the errors in the form.'
        snackbarColor.value = 'error'
        snackbar.value = true
    }
    router.push('/conversations')
}
  
</script>

<style scoped>
.v-container {
    min-height: 70vh; /* Ensure the container takes the full height of the viewport */
}
</style>
  