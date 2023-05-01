import React from 'react';
import Message from '@/components/Chat/components/Message/Message';
import { ChatMessageType } from '@/components/Chat/utils/chatHelpers';

export interface ChatHistoryProps {
    messages: ChatMessageType[];
    pendingResponse: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
    messages,
    pendingResponse
}) => (
    <div className="overflow-y-auto max-h-screen-50 md:max-h-screen-75 flex-grow mb-6">
        {Array.isArray(messages) &&
            messages.map((message, index) => (
                <Message
                    key={index}
                    role={message.role}
                    rawContent={message.content}
                />
            ))}
        {pendingResponse && (
            <div className="flex items-center justify-center mt-4">
                <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        )}
    </div>
);

export default ChatHistory;
