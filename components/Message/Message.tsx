import React from 'react';
import { ChatMessage } from '@/components/Chat/chatHelpers';
import RoleLabel from './RoleLabel';
import useMessageContent from './useMessageContent';

const Message: React.FC<ChatMessage> = ({ role, content }) => {
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
