import fs from 'fs';
import { CreateChatCompletionRequest, CreateCompletionRequest} from "openai";

export interface PromptConfig {
    inputs: string[];
    maxTokens?: number;
    stopOutput?: string;
    promptFile?: string;
    model?: string;
    format?: string;
    stop?: string;
}

export const prompts: Record<string, PromptConfig> = {
    topic: {
        inputs: [],
    },
    supplementalTopics: {
        inputs: ["topic"],
    },
    servicesSummary: {
        inputs: ["topic", "supplementalTopics"],
    },
    problemStatement: {
        inputs: ["topic", "supplementalTopics"],
    },
    scenario: {
        inputs: ["topic", "supplementalTopics"],
    },
    story: {
        inputs: ["scenario"],
    },
    learningObjectives: {
        inputs: ["scenario"]
    },
    tasks: {
        inputs: ["learningObjectives"],
    },
    additionalDocumentation: {
        inputs: ["scenario"]
    },
    cloudFormation: {
        inputs: ["tasks"],
        model: 'gpt-3.5-turbo-0301',
    },
    lambdaValidator: {
        inputs: ["tasks","cloudFormation"],
        model: 'gpt-3.5-turbo-0301',
    },
    iamPolicy: {
        inputs: ["tasks","cloudFormation"],
        model: 'gpt-3.5-turbo-0301',
    },
    problemInput: {
        inputs: [],
    },
    problemServices: {
        inputs: ["problemInput"],
    },
};

function mdToString(strings: TemplateStringsArray, ...values: any[]): string {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += values[i];
        }
    }
    return result;
}

export function generateConfig(type: string, inputs: Record<string, string> = {}) {
    const { maxTokens = 3000, stop = '"""', promptFile, model = 'text-davinci-003', format = 'text'  } = prompts[type];
    let prompt = '"""\n';
    const markdown = fs.readFileSync(`public/prompts/${(promptFile || type)}.md`, 'utf-8');
    prompt += mdToString`${markdown}`;
    if (prompt.length === 0 || prompt === 'undefined') {
        throw new Error('Prompt is empty');
    }
    Object.keys(inputs).forEach((key) => {
        prompt = prompt.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), inputs[key]);
    });
    prompt += '\n"""\n"""';
    console.log(`model: ${model} stop: ${stop} format: ${format}`)
    console.log(prompt);


    if (model === 'gpt-3.5-turbo-0301') {
        return {
            model: model,
            temperature: 0.6,
            max_tokens: maxTokens,
            top_p: 1,
            frequency_penalty: 1.5,
            presence_penalty: 1,
            stop: stop,
            messages: generateMessages(prompt),
        } as CreateChatCompletionRequest
    } else {
        return {
            model: model,
            temperature: 0.6,
            max_tokens: maxTokens,
            top_p: 1,
            frequency_penalty: 1.5,
            presence_penalty: 1,
            stop: stop,
            prompt: prompt,
        } as CreateCompletionRequest

    }
}

function generateMessages(prompt: string) {
    return [{role: "system", content: "You create configuration files for users."},
        {role: "assistant", content: "What would you like me to write code for?"},
        {role: "user", content: prompt},
    ];
}