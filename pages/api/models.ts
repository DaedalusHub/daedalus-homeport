import {VercelRequest, VercelResponse} from '@vercel/node';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function fetchModels(type: string) {
    const response = await openai.listModels();
    if (type === "any") {
        return response.data.data.map((model) => model.id);
    }

    const uniqueModels = new Set<string>();

    response.data.data.forEach((model) => {
        if (model.id.startsWith(type)) {
            if (model.id.startsWith("gpt-4")) {
                uniqueModels.add("gpt-4");
            } else if (model.id.startsWith("gpt-3.5-turbo")) {
                uniqueModels.add("gpt-3.5-turbo");
            } else {
                uniqueModels.add(model.id);
            }
        }
    });

    return Array.from(uniqueModels);
}



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

    try {
        const models = await fetchModels(req.query.type as string);
        res.status(200).json({ models });
    } catch (error) {
        console.error(`Error fetching models: ${error.message}`);
        res.status(500).json({
            error: {
                message: 'An error occurred while fetching the models.'
            }
        });
    }
}
