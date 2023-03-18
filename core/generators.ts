export interface GeneratorConfig {
    name: string;
    tab?: string;
    placeholder?: string;
    description: string;
    value: string;
    inputs?: string[];
    maxTokens?: number;
    stopOutput?: string;
    promptFile?: string;
    model?: string;
    format?: string;
    stop?: string;
}

export interface CollectorConfig {
    name: string;
    tab?: string;
    placeholder?: string;
    description: string;
}

export const collectors: Record<string, CollectorConfig> = {
    projectContext: {
        name: 'projectContext',
        tab: 'project',
        placeholder:
            'Background information that provides context for the project.',
        description: 'Context such a design patterns and major frameworks.'
    }
};

export const generators: Record<string, GeneratorConfig> = {
    projectScope: {
        name: 'projectScope',
        tab: 'project',
        placeholder: '',
        description: 'Define or load the project scope.',
        value: '',
        inputs: ['projectBackground'],
        model: 'gpt-3.5-turbo-0301'
    }
};

const initialTabList = [
    {
        tab: 'project',
        order: 1,
        name: 'Project'
    }
];

export const tabs = initialTabList.sort((a, b) => a.order - b.order);
