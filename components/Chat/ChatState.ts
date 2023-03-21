import { useState } from 'react';
import { ChatMessage } from '@/components/Chat/chatHelpers';

export const useChatState = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const addMessage = (author: string, content: string) => {
        const newMessage = { id: Date.now().toString(), role: author, content };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return { messages, addMessage, setMessages };
};
