import { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';
import { createChatCompletionRequest } from '@/components/Chat/utils/createChatCompletionRequest';
import { getLogger } from '@/lib/logger';

const log = getLogger('Chat');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function (req: VercelRequest, res: VercelResponse) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    'OpenAI API key not configured, please follow instructions in README.md'
            }
        });
        return;
    }

    const { model, prompt, messageHistory } = req.body;

    const completionRequest = createChatCompletionRequest(
        model,
        prompt,
        messageHistory
    );

    try {
        console.log(`Generating completion for model ${model}`);
        console.log(`Messages in history: ${messageHistory.length}`);
        console.log(`Prompt: ${prompt}`);
        const openaiResponse = await openai.createChatCompletion(
            completionRequest
        );

        if (!openaiResponse.data.model.startsWith(model)) {
            log.error(
                `Model mismatch: requested ${model}, received ${openaiResponse.data.model}`
            );
        }

        console.log(openaiResponse.data.choices[0]);
        console.log(
            `Completion generated for model ${openaiResponse.data.model}`
        );
        console.log(
            `Prompt tokens used: ${openaiResponse.data.usage?.prompt_tokens}`
        );
        console.log(
            `Completion tokens used: ${openaiResponse.data.usage?.completion_tokens}`
        );
        res.status(200).json(openaiResponse.data.choices[0]);
    } catch (error) {
        if (error instanceof Error && 'response' in error && error.response) {
            const openaiError = error as {
                response: { status: number; data: any };
            };
            const responseData = openaiError.response.data;
            res.status(openaiError.response.status).json(responseData);
        } else if (error instanceof Error) {
            console.error(`Error generating completion: ${error.message}`);
            res.status(500).json({
                error: {
                    message:
                        'An error occurred while generating the completion.'
                }
            });
        } else {
            console.error('Unknown error');
            res.status(500).json({
                error: {
                    message: 'An unknown error occurred.'
                }
            });
        }
    }
}
