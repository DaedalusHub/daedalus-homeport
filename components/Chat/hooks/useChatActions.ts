import { ChatMessageType, exportToJson, saveMessagesToFile } from "@/components/Chat/utils/chatHelpers";
import { requestAPI } from "@/components/Chat/utils/requestAPI";

export const handleUserMessage = async (
    selectedModel: string,
    message: string,
    addMessage: (author: string, content: string, key: string) => void,
    setPendingResponse: (pending: boolean) => void,
    messageHistory: ChatMessageType[]
) => {
    const key = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    addMessage("user", message, key);
    setPendingResponse(true);

    const response = await requestAPI(selectedModel, message, messageHistory);
    setPendingResponse(false);
    addMessage("assistant", response.content, key);
};

export const handleSave = (messages: ChatMessageType[]) => {
    saveMessagesToFile(messages);
};

export const handleClear = (setMessages: (messages: ChatMessageType[]) => void) => {
    setMessages([]);
};

export const handleExport = (messages: ChatMessageType[]) => {
    exportToJson(messages);
};

export const handleImport = (
    importedMessages: ChatMessageType[],
    setMessages: (messages: ChatMessageType[]) => void
) => {
    const messagesWithKey = importedMessages.map((message) => ({
        ...message,
        key: `${Date.now()}-${Math.random().toString(36).substring(2)}`
    }));
    setMessages(messagesWithKey);
};

