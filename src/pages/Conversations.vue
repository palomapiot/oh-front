<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <!-- Conversations List -->
        <v-card>
          <v-card-title>
            <h3>My Conversations</h3>
          </v-card-title>
          <v-list>
            <v-list-item-group v-model="selectedConversation">
              <v-list-item
                v-for="(conversation, index) in conversations"
                :key="index"
                @click="selectConversation(conversation)"
                :class="{ 'selected-conversation': selectedConversation === conversation }"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ conversation.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ conversation.lastMessage }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <!-- Current Conversation -->
        <v-card>
          <v-card-title>
            <h2>{{ currentConversation ? currentConversation.title : 'Select a conversation' }}</h2>
          </v-card-title>
          <v-card-text class="d-flex flex-column" style="height: 70vh; overflow-y: auto;">
            <div v-if="currentConversation">
                <div v-for="(message, index) in currentConversation.messages" :key="index" :class="['message-wrapper', message.sender === 'user' ? 'user-wrapper' : 'bot-wrapper']">
                    <div :class="{'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot'}">
                        <strong>{{ message.sender }}:</strong> {{ message.text }}
                    </div>
                </div>

            </div>
            <div v-else>
              <p>No conversation selected. Please select a conversation to start chatting.</p>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">            
            <v-textarea
              v-model="newMessage"
              label="Type your message..."
              @keyup.enter="sendMessage"
              variant="outlined"
              auto-grow
              rows="2"
              class="flex-grow-1 integrated-input"
              @keyup="handleKeyDown"
            ></v-textarea>
            <v-btn @click="sendMessage" color="primary">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Sample data for conversations
const conversations = ref([
  {
    title: 'Conversation 1',
    lastMessage: 'See you later!',
    messages: [
      { sender: 'user', text: 'Hello!' },
      { sender: 'bot', text: 'Hi there!' },
      { sender: 'user', text: 'How are you?' },
      { sender: 'bot', text: 'I am fine, thank you!' },
    ],
  },
  {
    title: 'Conversation 2',
    lastMessage: 'Let’s meet tomorrow.',
    messages: [
      { sender: 'user', text: 'Good morning!' },
      { sender: 'bot', text: 'Good morning! How can I help you?' },
    ],
  },
  {
    title: 'Conversation 3',
    lastMessage: 'That sounds great!',
    messages: [
      { sender: 'user', text: 'What do you think?' },
      { sender: 'bot', text: 'I think it’s a good idea!' },
    ],
  },
])

const selectedConversation = ref(null)
const newMessage = ref('')

// Computed property to get the currently selected conversation
const currentConversation = computed(() => selectedConversation.value)

// Method to select a conversation
const selectConversation = (conversation) => {
  selectedConversation.value = conversation
}

// Method to send a message
const sendMessage = () => {
  if (newMessage.value.trim() && currentConversation.value) {
    currentConversation.value.messages.push({
      sender: 'user',
      text: newMessage.value,
    })
    // Simulate bot response
    currentConversation.value.messages.push({
      sender: 'bot',
      text: 'This is a simulated bot response!',
    })
    newMessage.value = ''
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  // If the Enter key is pressed
  if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); 
      sendMessage(); 
  }
};


</script>

<style scoped>
.selected-conversation {
  background-color: #f0f0f0;
}

.user-message {
  background-color: #d2027b1b;
  border-radius: 30px;
  padding: 15px;
  max-width: 70%; 
}

.bot-message {
  background-color: #d2027b7f;
  border-radius: 30px;
  padding: 15px;
  max-width: 70%;
}

.message-wrapper {
  display: flex;
  margin: 5px;
}

.user-wrapper {
  justify-content: flex-end; /* Align user messages to the right */
}

.bot-wrapper {
  justify-content: flex-start; /* Align bot messages to the left */
}
</style>
