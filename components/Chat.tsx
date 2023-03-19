import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';
import { requestAPI } from '../utils';

interface Message {
    author: string;
    content: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (author: string, content: string) => {
        setMessages((prevMessages) => [...prevMessages, { author, content }]);
    };

    const handleUserMessage = async (message: string) => {
        addMessage('User', message);

        // Make an API call to ChatGPT with the user's message
        // and add the response to the chat history.
        const chatGPTResponse = await fetchChatGPTResponse(message);
        addMessage('ChatGPT', chatGPTResponse);
    };

    const handleSave = () => {
        const chatText = messages
            .map((message) => `--${message.author}--\n\n${message.content}`)
            .join('\n\n\n');

        const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'chat_history.txt';
        link.click();
        URL.revokeObjectURL(href);
    };

    const handleClear = () => {
        setMessages([]);
    };

    const handleExport = () => {
        const data = JSON.stringify(messages);
        const blob = new Blob([data], {
            type: 'application/json;charset=utf-8'
        });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'chat_history.json';
        link.click();
        URL.revokeObjectURL(href);
    };

    const handleImport = (importedMessages: Message[]) => {
        setMessages(importedMessages);
    };

    return (
        <div className="bg-base-100 p-8 min-h-screen flex flex-col w-screen">
            <ChatHeader
                onSave={handleSave}
                onClear={handleClear}
                onExport={handleExport}
                onImport={handleImport}
            />
            <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col flex-grow">
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
