import React from 'react';
import Message from '../Message/Message';
import { ChatMessage } from '@/components/Chat/chatHelpers';

export interface ChatHistoryProps {
    messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => (
    <div className="overflow-y-auto max-h-screen-50 md:max-h-screen-75 flex-grow mb-6">
        {Array.isArray(messages) &&
            messages.map((message, index) => (
                <Message
                    key={index}
                    role={message.role}
                    content={message.content}
                />
            ))}
    </div>
);

export default ChatHistory;
