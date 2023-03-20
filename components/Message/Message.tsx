import React from 'react';
import { ChatMessage } from '@/core/chatHelpers';
import RoleLabel from './RoleLabel';
import useMessageContent from './useMessageContent';

const Message: React.FC<ChatMessage> = ({ role, content, isLoading }) => {
    const messageContent = useMessageContent(content);

    return (
        <div
            className={`rounded-lg p-4 mb-4 ${
                role === 'User' ? 'bg-neutral' : 'bg-neutral-focus'
            }`}
        >
            <div className="flex items-start">
                <RoleLabel role={role} />
                <div className="ml-4 flex-grow">
                    <div>{messageContent}</div>
                    {isLoading && (
                        <span className="ml-2 animate-spin">
                            <i className="fas fa-circle-notch"></i>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
