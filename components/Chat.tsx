import React, { useEffect, useState } from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';
import ModelSelector from './ModelSelector';
import {
    ChatMessage,
    exportToJson,
    saveMessagesToFile
} from '@/core/chatHelpers';
import { requestAPI } from '@/core/requestAPI';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('gpt-3.5-turbo');

    useEffect(() => {
        async function fetchModels() {
            const response = await fetch('/api/models?type=gpt');
            const data = await response.json();
            setModels(data.models.sort() || []);
        }

        fetchModels();
        setSelectedModel('gpt-3.5-turbo');
    }, [setSelectedModel]);

    const addMessage = (author: string, content: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: author, content }
        ]);
    };

    const handleUserMessage = async (message: string) => {
        addMessage('User', message);

        const response = await requestAPI(selectedModel, message);
        addMessage(selectedModel, response.content);
    };

    const handleSave = () => {
        saveMessagesToFile(messages);
    };

    const handleClear = () => {
        setMessages([]);
    };

    const handleExport = () => {
        exportToJson(messages);
    };

    const handleImport = (importedMessages: ChatMessage[]) => {
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
                <div className="flex align-center mt-4 w-full">
                    <ModelSelector
                        models={models}
                        selectedModel={selectedModel}
                        onModelSelect={setSelectedModel}
                    />
                    <ChatInput onSubmit={handleUserMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
