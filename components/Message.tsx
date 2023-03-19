import React from 'react';

export interface MessageProps {
    author: string;
    content: string;
}

const Message: React.FC<MessageProps> = ({ author, content }) => (
    <div
        className={`rounded-lg p-4 mb-4 ${
            author === 'User' ? 'bg-neutral' : 'bg-neutral-focus'
        }`}
    >
        <div className="flex items-start">
            <div
                className={`w-24 rounded px-2 py-1 text-white text-center ${
                    author === 'User' ? 'bg-primary' : 'bg-secondary'
                }`}
            >
                <strong className="font-bold">{author}</strong>
            </div>
            <div className="ml-4 flex-grow">
                <span>{content}</span>
            </div>
        </div>
    </div>
);

export default Message;
