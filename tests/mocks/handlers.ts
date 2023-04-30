// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
    rest.post('/api/chat', (req, res, ctx) => {
        // Mock the response for the chat endpoint
        return res(
            ctx.status(200),
            ctx.json({
                message: {
                    role: 'assistant',
                    content: "Mocked message reply."
                },
                finish_reason: 'stop',
                index: 0
            })
        );
    }),

    rest.get('/api/models', (req, res, ctx) => {
        // Mock the response for the models endpoint
        return res(
            ctx.status(200),
            ctx.json([
                    {
                        id: 'gpt-3.5-turbo',
                        object: 'model',
                        created: 1677610602,
                        owned_by: 'openai',
                        permission: [ [Object] ],
                        root: 'gpt-3.5-turbo',
                        parent: null
                    },
                    {
                        id: 'gpt-4',
                            object: 'model',
                        created: 1678604602,
                        owned_by: 'openai',
                        permission: [ [Object] ],
                        root: 'gpt-4',
                        parent: null
                    }

            ])
        );
    }),

    rest.post('/api/saveProject', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Project details saved successfully',
            })
        );
    }),

    rest.get('/api/getProjects', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: '1',
                    name: 'Project 1',
                    intent: 'Intent 1',
                    goals: ['Goal 1', 'Goal 2'],
                },
                {
                    id: '2',
                    name: 'Project 2',
                    intent: 'Intent 2',
                    goals: ['Goal 3', 'Goal 4'],
                },
            ])
        );
    }),
];
