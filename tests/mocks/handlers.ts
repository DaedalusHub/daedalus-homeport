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
];
