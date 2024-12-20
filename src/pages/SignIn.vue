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
        await axios.post(
            import.meta.env.VITE_BACKEND_URL + '/api/user/login',
            { username: username.value, password: password.value }
        ).then(response => {
            if (response.status === 200) {
                // Update global state for login
                authStore.login(response.data.token) 

                snackbarMessage.value = 'Sign in successful!'
                snackbarColor.value = '#c6007e'
                snackbar.value = true
                router.push('/conversations')
            } else {
                throw new Error(response.data.message || 'Sign-in failed.')
            }
        })
        .catch(err => {
            snackbarMessage.value = 'Error: ' + err.response.data.error || 'An error occurred during sign-in.'
            snackbarColor.value = 'black'
            snackbar.value = true
            throw new Error(err || 'Sign-in failed.')
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
  