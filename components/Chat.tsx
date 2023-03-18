import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import { requestAPI } from '../utils';

interface Message {
    author: string;
    content: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (author: string, content: string) => {
        setMessages([...messages, { author, content }]);
    };

    const handleUserMessage = async (message: string) => {
        addMessage('User', message);

        // Make an API call to ChatGPT with the user's message
        // and add the response to the chat history.
        const chatGPTResponse = await fetchChatGPTResponse(message);
        addMessage('ChatGPT', chatGPTResponse);
    };

    return (
        <div className="bg-base-100 p-8 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Chat with ChatGPT</h1>
            <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <ChatHistory messages={messages} />
                <ChatInput onSubmit={handleUserMessage} />
            </div>
        </div>
    );
};

async function fetchChatGPTResponse(message: string): Promise<string> {
    return await requestAPI(message, 'chat');
}

export default Chat;
