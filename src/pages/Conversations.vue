<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <!-- Conversations List -->
        <v-card class="conversation-card">
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
        <v-card class="conversation-card">
          <v-card-title>
            <h2>{{ currentConversation ? currentConversation.title : 'Select a conversation' }}</h2>
          </v-card-title>
          <v-card-text class="d-flex flex-column conversation-text" style="height: 70vh; overflow-y: auto;">
            <div v-if="currentConversation">
                <div v-for="(message, index) in currentConversation.messages" :key="index" :class="['message-wrapper', message.author === Author.HUMAN ? 'user-wrapper' : 'bot-wrapper']">
                    <!-- User's message rendering -->
                    <div
                      v-if="message.author === Author.HUMAN"
                      class="user-message"
                      v-html="message.text"
                    ></div>
                    <!-- Bot's message rendering -->
                    <div
                      v-else
                      class="bot-message"
                      v-html="message.text"
                    ></div>
                </div>

            </div>
            <div v-else>
              <p>No conversation selected. Please select a conversation to start chatting.</p>
            </div>
          </v-card-text>
          <div v-if="isLoading" class="loading-animation">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>

          <v-card-actions class="d-flex justify-end chat-input-actions">            
              <v-textarea
                v-model="newMessage"
                placeholder="Type your message..."
                variant="outlined"
                rows="2"
                auto-grow
                class="flex-grow-1  integrated-input"
                @keydown="handleKeyDown"
              />
            <v-btn 
              @click="sendMessage" 
              :disabled="isLoading" 
              :loading="isLoading" 
              color="primary">
              <template v-slot:default>
                <span v-if="!isLoading">Send</span>
              </template>
            </v-btn>


          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import DOMPurify from 'dompurify';
import axios from 'axios'
import { useAuthStore } from '@/stores/auth' 

const auth = useAuthStore()
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('')

enum Author {
  HUMAN = 'HUMAN',
  GPT = 'GPT',
}

interface Message {
  author: Author;
  text: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  title: string;
  lastMessage: string;
  createdAt: string;
  messages: Message[];
}

const conversations = ref<Conversation[]>([])
const selectedConversation = ref<Conversation | null>(null)
const newMessage = ref('')
const isLoading = ref(false);

function createDefaultConversation(): Conversation {
  return {
    id: 0,
    title: '',
    lastMessage: '',
    createdAt: new Date().toISOString(),
    messages: [],
  };
}

const currentConversation = computed<Conversation>(() => {
  if (selectedConversation.value) {
    return selectedConversation.value;
  }
  return createDefaultConversation();
});

const mapAuthorToEnum = (author: string): Author => {
  switch (author) {
    case 'HUMAN':
      return Author.HUMAN;
    case 'GPT':
      return Author.GPT;
    default:
      throw new Error(`Unknown author: ${author}`);
  }
}

const fetchConversations = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL + '/api/chats?limit=5000',
      { headers: { Authorization: `Bearer ${auth.user}` } },
    );

    if (response.status === 200) {
      conversations.value = response.data.data.map((chat: any) => {
        const messages: Message[] = chat.Messages ? chat.Messages.map((msg: any) => ({
          author: mapAuthorToEnum(msg.Author),
          text: msg.Text,
          createdAt: msg.CreatedAt,
        })) : [];

        return {
          id: chat.ID,
          title: `Conversation ${chat.ID}`,
          lastMessage: messages.length > 0 ? messages[messages.length - 1].text : '',
          createdAt: chat.CreatedAt,
          messages,
        };
      });
    } else {
      throw new Error(response.data.message || 'Error fetching chat history.');
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.error || 'An error occurred while fetching chat history.';
      snackbarMessage.value = 'Error: ' + errorMessage;
    } else {
      snackbarMessage.value = 'Error: An unexpected error occurred.';
    }
    snackbarColor.value = 'black';
    snackbar.value = true;
  }
}

const selectConversation = (conversation: Conversation) => {
  selectedConversation.value = conversation
}

const sendMessage = async () => {
  const sanitizedMessage = DOMPurify.sanitize(newMessage.value.trim());
  if (sanitizedMessage) {
    addMessageToConversation(Author.HUMAN, sanitizedMessage);
    isLoading.value = true;
    try {
      const payload = currentConversation.value.id !== 0 
        ? { chat_id: currentConversation.value.id, message: sanitizedMessage }
        : { message: sanitizedMessage };

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/chats/message',
        payload,
        { headers: { Authorization: `Bearer ${auth.user}` } },
      );

      if (response.status === 200) {
        const gptMessage = response.data;
        if (currentConversation.value.id === 0) {
          const message: Message = {
            author: Author.HUMAN,
            text: sanitizedMessage,
            createdAt: new Date().toISOString(),
          };
          const newConversation: Conversation = {
            id: response.data.id,
            title: `Conversation ${response.data.id}`,
            lastMessage: sanitizedMessage,
            createdAt: new Date().toISOString(),
            messages: [message],
          };
          selectedConversation.value = newConversation;
        }
        addMessageToConversation(Author.GPT, gptMessage.Text, gptMessage.CreatedAt);
        await updateSelectedConversation();
      } else {
        throw new Error(response.data.message || 'Sending message failed.');
      }
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  }
}

const addMessageToConversation = (author: Author, text: string, createdAt?: string) => {
  const message: Message = {
    author,
    text,
    createdAt: createdAt || new Date().toISOString(),
  };
  if (currentConversation.value) {
    currentConversation.value.messages.push(message);
    currentConversation.value.lastMessage = text;
  }
  newMessage.value = '';
}

const handleError = (err: any) => {
  snackbarMessage.value = 'Error: ' + (err.response?.data?.error || 'An error occurred while sending the message.');
  snackbarColor.value = 'black';
  snackbar.value = true;
}

const updateSelectedConversation = async () => {
  await fetchConversations();
  if (currentConversation.value) {
    const updatedConversation = conversations.value.find(
      (conv) => conv.id === currentConversation.value.id
    );
    if (updatedConversation) {
      selectedConversation.value = updatedConversation;
    }
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); 
      sendMessage(); 
  }
};

onMounted(() => {
  fetchConversations();
})
</script>

<style scoped>
.conversation-card {
  display: flex;
  flex-direction: column;
  height: calc(85vh - 10px); /* Adjust height to fill the viewport */
}

.conversation-text {
  flex: 1; /* Ensures this section takes all available space */
  overflow-y: auto; /* Adds scrolling to the messages */
  padding: 16px; /* Add padding for better readability */
}

.chat-input-actions {
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e0e0e0; /* Separate input from messages visually */
}

.chat-textarea {
  flex: 1;
  margin-right: 16px;
  border-radius: 16px;
  border: none;
  box-shadow: none;
}

.selected-conversation {
  background-color: #f0f0f0;
}

.user-message {
  background-color: #c6007e1b;
  border-radius: 30px;
  padding: 15px;
  max-width: 70%; 
}

.bot-message {
  background-color: #c6007e59;
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

.user-message, .bot-message {
  white-space: pre-wrap; /* Preserves spaces and line breaks */
  word-wrap: break-word; /* Ensures long words are wrapped */
}

.loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
}

.dot {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #c6007e;
  border-radius: 50%;
  animation: bounce 1.5s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
