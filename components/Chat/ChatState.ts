import { useState } from 'react';
import { ChatMessage } from '@/core/chatHelpers';

export const useChatState = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const addMessage = (author: string, content: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: author, content }
        ]);
    };

    return { messages, addMessage, setMessages };
};
