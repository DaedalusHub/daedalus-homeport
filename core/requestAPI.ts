// Start of file: requestAPI.ts
import { ChatMessage } from '@/components/Chat/chatHelpers';

export async function requestAPI(
    model: string,
    prompt: string,
    messageHistory: ChatMessage[]
): Promise<ChatMessage> {
    const sanitizedMessageHistory = messageHistory.map(
        ({ role, content, key }) => ({
            role,
            content,
            key
        })
    );

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model,
            prompt,
            messageHistory: sanitizedMessageHistory
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error?.message || 'Unknown error occurred');
    }

    return data.message as ChatMessage;
}

// End of file: requestAPI.ts
