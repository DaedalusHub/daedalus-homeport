import React, { useEffect, useState } from 'react';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';
import ModelSelector from './ModelSelector';
import { useChatState } from './ChatState';
import {
    handleClear,
    handleExport,
    handleImport,
    handleSave,
    handleUserMessage
} from './ChatActions';

const ChatUI: React.FC = () => {
    const { messages, addMessage, setMessages } = useChatState();

    const [models, setModels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    return (
        <div className="bg-base-100 p-8 min-h-fit h-1/2 flex flex-col w-screen">
            <ChatHeader
                onSave={() => handleSave(messages)}
                onClear={() => handleClear(setMessages)}
                onExport={() => handleExport(messages)}
                onImport={
                    (importedMessages) =>
                        handleImport(importedMessages, setMessages) // Change this line
                }
            />
            <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col flex-grow">
                <ChatHistory messages={messages} />
                <div className="flex align-center mt-4 w-full">
                    <ModelSelector
                        models={models}
                        selectedModel={selectedModel}
                        onModelSelect={setSelectedModel}
                    />
                    <ChatInput
                        onSubmit={(message) =>
                            handleUserMessage(
                                selectedModel,
                                message,
                                addMessage,
                                setLoading,
                                messages
                            )
                        }
                        isLoading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatUI;
