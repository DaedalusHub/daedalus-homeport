import { ChatCompletionRequest } from 'openai';
import { ChatMessage } from '@/components/Chat/chatHelpers';

export function createChatCompletionRequest(
    model: string,
    userMessage: string,
    messageHistory: ChatMessage[]
): ChatCompletionRequest {
    return {
        model: model,
        messages: [
            ...messageHistory,
            {
                role: 'user',
                content: userMessage
            }
        ],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };
}
