import React from 'react';
import RoleLabel from './RoleLabel';
import useMessageContent from './useMessageContent';

interface MessageProps {
    role: string;
    content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
    const messageContent = useMessageContent(content);

    return (
        <div
            className={`rounded-lg p-4 mb-4 ${
                role === 'user' ? 'bg-neutral' : 'bg-neutral-focus'
            }`}
        >
            <div className="flex items-start">
                <RoleLabel role={role} />
                <div className="ml-4 flex-grow">
                    <div>{messageContent}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
