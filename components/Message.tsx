import React from 'react';

export interface MessageProps {
    author: string;
    content: string;
}

const Message: React.FC<MessageProps> = ({ author, content }) => (
    <div>
        <strong>{author}: </strong>
        <span>{content}</span>
    </div>
);

export default Message;
