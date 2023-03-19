import { CreateChatCompletionRequest } from 'openai';

export function createChatCompletionRequest(
    model: string,
    prompt: string
): CreateChatCompletionRequest {
    return {
        model: model || 'gpt-3.5-turbo',
        temperature: 0.6,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 1.5,
        presence_penalty: 1,
        stop: ['\nUser:', '\nAssistant:'],
        messages: [
            {
                role: 'system',
                content: 'You are a helpful code writer assisting the user.'
            },
            {
                role: 'user',
                content: prompt
            }
        ]
    };
}
