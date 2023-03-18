import React from 'react';

export interface MessageProps {
    author: string;
    content: string;
}

const Message: React.FC<MessageProps> = ({ author, content }) => (
    <div
        className={`flex items-center space-x-2 ${
            author === 'User' ? 'justify-end' : ''
        }`}
    >
        <strong
            className={`${
                author === 'User' ? 'text-theme-500' : 'text-theme-400'
            } font-semibold`}
        >
            {author}:
        </strong>
        <span className="text-theme-800">{content}</span>
    </div>
);

export default Message;
