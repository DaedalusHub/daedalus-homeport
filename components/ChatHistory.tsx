import React from 'react';
import Message, { MessageProps } from './Message';

export interface ChatHistoryProps {
    messages: MessageProps[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => (
    <div>
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
