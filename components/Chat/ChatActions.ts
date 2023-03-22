import {ChatMessage, exportToJson, saveMessagesToFile} from '@/components/Chat/chatHelpers';
import {requestAPI} from '@/core/requestAPI';

export const handleUserMessage = async (
    selectedModel: string,
    message: string,
    addMessage: (author: string, content: string, key: string) => void,
    setLoading: (loading: boolean) => void,
    messageHistory: ChatMessage[]
) => {
    const key = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    addMessage('user', message, key);
    setLoading(true);

    const response = await requestAPI(selectedModel, message, messageHistory);
    setLoading(false);
    addMessage('assistant', response.content, key);
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
    // Add unique key to each imported message
    const messagesWithKey = importedMessages.map((message) => ({
        ...message,
        key: `${Date.now()}-${Math.random().toString(36).substring(2)}`
    }));
    setMessages(messagesWithKey);
};
