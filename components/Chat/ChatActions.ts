import {
    ChatMessage,
    exportToJson,
    saveMessagesToFile
} from '@/core/chatHelpers';
import { requestAPI } from '@/core/requestAPI';

export const handleUserMessage = async (
    selectedModel: string,
    message: string,
    addMessage: (author: string, content: string) => void,
    setLoading: (loading: boolean) => void
) => {
    addMessage('User', message);
    setLoading(true);

    const response = await requestAPI(selectedModel, message);
    setLoading(false);
    addMessage(selectedModel, response.content);
};

export const handleSave = (messages: ChatMessage[]) => {
    saveMessagesToFile(messages);
};

export const handleClear = (setMessages: (messages: ChatMessage[]) => void) => {
    setMessages([]);
};

export const handleExport = (messages: ChatMessage[]) => {
    exportToJson(messages);
};

export const handleImport = (
    importedMessages: ChatMessage[],
    setMessages: (messages: ChatMessage[]) => void
) => {
    setMessages(importedMessages);
};
