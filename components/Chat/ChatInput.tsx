import React, { useState } from 'react';

export interface ChatInputProps {
    onSubmit: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
    const [message, setMessage] = useState('');
    const buttonClass = isLoading
        ? 'bg-ghost text-white px-6 py-2.5 rounded-r animate-pulse cursor-wait'
        : 'bg-primary text-white px-6 py-2.5 rounded-r';
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        onSubmit(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="ml-4 flex flex-grow">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full border-2 border-primary focus:border-primary focus:ring-0 rounded-l p-2 bg-base-300 text-base-content"
            />
            <button type="submit" className={buttonClass}>
                {isLoading ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
};

export default ChatInput;
