import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatHistory from './components/ChatHistory';
import ChatHeader from './components/ChatHeader';
import ChatModelSelector from './components/ChatModelSelector';
import {
    handleClear,
    handleExport,
    handleImport,
    handleSave,
    handleUserMessage
} from '@/components/Chat/hooks/useChatActions';
import { useModels } from '@/components/Chat/hooks/useModels';
import { useChatState } from '@/components/Chat/hooks/useChatState';

const ChatUI: React.FC = () => {
    const {
        messages,
        addMessage,
        setMessages,
        pendingResponse,
        setPendingResponse
    } = useChatState();
    const models = useModels();

    const [selectedModel, setSelectedModel] = useState<string>('gpt-3.5-turbo');

    return (
        <div
            className="bg-base-100 p-8 min-h-fit h-1/2 flex flex-col w-screen"
            data-testid="chatui"
        >
            <ChatHeader
                onSave={() => handleSave(messages)}
                onClear={() => handleClear(setMessages)}
                onExport={() => handleExport(messages)}
                onImport={(importedMessages) =>
                    handleImport(importedMessages, setMessages)
                }
            />
            <div className="flex items-center justify-between mb-4">
                <ChatModelSelector
                    models={models}
                    selectedModel={selectedModel}
                    onModelSelect={setSelectedModel}
                />
            </div>
            <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col flex-grow">
                <ChatHistory
                    messages={messages}
                    pendingResponse={pendingResponse}
                />

                <ChatInput
                    onSubmit={(message) =>
                        handleUserMessage(
                            selectedModel,
                            message,
                            addMessage,
                            setPendingResponse,
                            messages
                        )
                    }
                />
            </div>
        </div>
    );
};

export default ChatUI;
