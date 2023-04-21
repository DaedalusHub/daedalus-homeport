import {ChatMessage} from '@/components/Chat/chatHelpers';
import {encode} from "gpt-3-encoder";
import {CreateChatCompletionRequest} from "openai";


function getPromptTokens(model: string, messageHistory: ChatMessage[], userMessage: string) {
    const prompt = [...messageHistory, {
        role: 'user',
        content: userMessage
    }].map((message) => message.content).join('\n');
    const encoded = encode(prompt)
    return encoded.length;
}


export function createChatCompletionRequest(
    model: string,
    userMessage: string,
    messageHistory: ChatMessage[]
): CreateChatCompletionRequest {
    console.log('model', model);
    const maxTokens = model.startsWith('gpt-4') ? 8000 : 4000;
    console.log('maxTokens', maxTokens);
    const promptTokens = getPromptTokens(model, messageHistory, userMessage);
    console.log('promptTokens', promptTokens);
    const availableTokens = maxTokens - promptTokens;
    console.log('availableTokens', availableTokens);
    const reducedTokens = Math.max(0, availableTokens);
    console.log('reducedTokens', reducedTokens);


    return {
        model: model,
        messages: [
            ...messageHistory,
            {
                role: 'user',
                content: userMessage,
            },
        ],
        max_tokens: reducedTokens,
        n: 1,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };
}
