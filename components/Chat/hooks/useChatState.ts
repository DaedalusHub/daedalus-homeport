import { useState } from 'react';
import { ChatMessageType } from '@/components/Chat/utils/chatHelpers';

export const useChatState = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [pendingResponse, setPendingResponse] = useState<boolean>(false);

    const addMessage = (author: string, content: string) => {
        const newMessage = {
            key: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
            role: author,
            content
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return {
        messages,
        addMessage,
        setMessages,
        pendingResponse,
        setPendingResponse
    };
};
