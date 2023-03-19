import { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';
import { createChatCompletionRequest } from '@/core/createChatCompletionRequest';

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

    const { model, prompt } = req.body;

    const completionRequest = createChatCompletionRequest(model, prompt);

    try {
        console.log(`Generating completion for model ${model}...`);
        console.log(`Prompt: ${prompt}`);
        const openaiResponse = await openai.createChatCompletion(
            completionRequest
        );
        console.log(openaiResponse.data.choices[0]);
        res.status(200).json(openaiResponse.data.choices[0]);
    } catch (error) {
        if (error instanceof Error && 'response' in error && error.response) {
            const openaiError = error;
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
