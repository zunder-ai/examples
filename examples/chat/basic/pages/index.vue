<template>
    <ZChatPage>
        <template #messages>
            <ZChatMessages :messages="chatMessages" />
        </template>
        <template #input>
            <ZChatInput @submit="handleSubmit" :loading="loading" placeholder="Type your message here..." />
        </template>
    </ZChatPage>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ChatMessage } from '~/services/chatService';
import { useRuntimeConfig, useFetch } from '#app';

const chatMessages = ref<ChatMessage[]>([]);
const loading = ref(false);

const config = useRuntimeConfig();
console.log('Config:', config.public.useSimulatedChat);
const apiEndpoint = config.public.useSimulatedChat ? '/api/chat-test' : '/api/chat';

watch(chatMessages, (newMessages) => {
    console.log('Chat messages updated:', newMessages);
}, { deep: true });

const handleSubmit = async (text: string) => {
    // Add user message
    chatMessages.value.push({
        isUser: true,
        avatar: 'U',
        content: text,
    });
    console.log('Chat messages after user input:', chatMessages.value);

    loading.value = true;

    try {
        const { data, error } = await useFetch(apiEndpoint, {
            method: 'POST',
            body: { message: text },
        });

        if (error.value) {
            throw error.value;
        }

        const aiMessage: ChatMessage = data.value as ChatMessage;
        chatMessages.value.push(aiMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        // Handle error (e.g., show an error message to the user)
    } finally {
        loading.value = false;
    }
};
</script>