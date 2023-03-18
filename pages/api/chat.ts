import { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';
import { configureChatCompletion } from '@/core/configureChatCompletion';

interface OpenAIError extends Error {
    response?: {
        status: number;
        data: unknown;
    };
}

interface OpenAIResponseData {
    json: () => Promise<unknown>;
}

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

    const config = configureChatCompletion(req.body.topic);
    try {
        const completion = await openai.createChatCompletion(config);
        let response = completion.data.choices?.[0]?.message?.content;
        response = response?.trim();
        console.log(response);
        res.status(200).json({ result: response });
    } catch (error: unknown) {
        if ((error as OpenAIError).response) {
            const openaiError = error as OpenAIError;
            if (openaiError.response?.status) {
                console.error(
                    openaiError.response.status,
                    openaiError.response.data
                );
                const responseData = openaiError.response
                    .data as OpenAIResponseData;
                const data = await responseData.json();
                res.status(openaiError.response.status).json(data);
            } else if (error instanceof Error) {
                console.error(
                    `Error with OpenAI API request: ${error.message}`
                );
                res.status(500).json({
                    error: {
                        message: 'An error occurred during your request.'
                    }
                });
            } else {
                console.error(
                    `Unexpected error with OpenAI API request: ${error}`
                );
                res.status(500).json({
                    error: {
                        message:
                            'An unexpected error occurred during your request.'
                    }
                });
            }
        }
    }
}
