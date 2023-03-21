import {
    ChatMessage,
    exportToJson,
    saveMessagesToFile
} from '@/components/Chat/chatHelpers';
import { requestAPI } from '@/core/requestAPI';

export const handleUserMessage = async (
    selectedModel: string,
    message: string,
    addMessage: (author: string, content: string) => void,
    setLoading: (loading: boolean) => void,
    messageHistory: ChatMessage[]
) => {
    addMessage('user', message);
    setLoading(true);

    const response = await requestAPI(selectedModel, message, messageHistory);
    setLoading(false);
    addMessage('assistant', response.content);
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
