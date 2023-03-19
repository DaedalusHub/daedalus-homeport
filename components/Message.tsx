import React from 'react';
import { ChatMessage } from '@/core/chatHelpers';

const Message: React.FC<ChatMessage> = ({ role, content }) => (
    <div
        className={`rounded-lg p-4 mb-4 ${
            role === 'User' ? 'bg-neutral' : 'bg-neutral-focus'
        }`}
    >
        <div className="flex items-start">
            <div
                className={`min-w-fit w-24 rounded px-2 py-1 text-white text-center ${
                    role === 'User' ? 'bg-primary' : 'bg-secondary'
                }`}
            >
                <strong className="font-bold">{role}</strong>
            </div>
            <div className="ml-4 flex-grow">
                <span>{content}</span>
            </div>
        </div>
    </div>
);

export default Message;
