import { ChatMessage } from '@/components/Chat/chatHelpers';

export async function requestAPI(
    model: string,
    prompt: string,
    messageHistory: ChatMessage[]
): Promise<ChatMessage> {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model, prompt, messageHistory })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error?.message || 'Unknown error occurred');
    }

    return data.message as ChatMessage;
}
