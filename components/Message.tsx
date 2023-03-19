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
        <strong className="font-bold">{author}: </strong>
        <span>{content}</span>
    </div>
);

export default Message;
