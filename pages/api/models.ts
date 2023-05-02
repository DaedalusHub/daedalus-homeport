import { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';
import { getLogger } from '@/lib/logger';

const log = getLogger('Chat');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function fetchModels(type: string) {
    const response = await openai.listModels();
    if (type === 'any') {
        return response.data.data.map((model) => model.id);
    }

    const uniqueModels = new Set<string>();

    log.info(`Found ${response.data.data.length} models`);
    log.info(`Filtering models by type ${type}`);

    response.data.data.forEach((model) => {
        if (model.id.startsWith(type)) {
            if (model.id.startsWith('gpt-4')) {
                uniqueModels.add('gpt-4');
            } else if (model.id.startsWith('gpt-3.5-turbo')) {
                uniqueModels.add('gpt-3.5-turbo');
            } else {
                uniqueModels.add(model.id);
            }
        }
    });
    log.info(`Models: ${Array.from(uniqueModels).join(', ')}`);

    return Array.from(uniqueModels);
}

export default async function (req: VercelRequest, res: VercelResponse) {
    if (!configuration.apiKey) {
        log.error(
            'OpenAI API key not configured, please follow instructions in README.md'
        );
        res.status(500).json({
            error: {
                message:
                    'OpenAI API key not configured, please follow instructions in README.md'
            }
        });
        return;
    }

    try {
        log.info('Request received for fetching models');
        const models = await fetchModels(req.query.type as string);
        res.status(200).json({ models });
    } catch (error) {
        log.error(`Error fetching models: ${(error as Error).message}`);
        res.status(500).json({
            error: {
                message: 'An error occurred while fetching the models.'
            }
        });
    }
}
