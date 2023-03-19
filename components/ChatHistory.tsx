import React from 'react';
import Message, { MessageProps } from './Message';

export interface ChatHistoryProps {
    messages: MessageProps[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => (
    <div className="overflow-y-auto max-h-screen-50 md:max-h-screen-75 flex-grow mb-6">
        {messages.map((message, index) => (
            <Message
                key={index}
                author={message.author}
                content={message.content}
            />
        ))}
    </div>
);

export default ChatHistory;
