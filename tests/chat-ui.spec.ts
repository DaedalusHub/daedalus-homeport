import { expect, test } from 'playwright-test-coverage';
import { getLogger } from '@/lib/logger';

const log = getLogger('chat-ui.spec.ts');

test.describe('Chat Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('/api/chat', (route, request) => {
            const response = {
                message: {
                    role: 'assistant',
                    content: 'This is a mocked assistant reply.'
                },
                finish_reason: 'stop',
                index: 0
            };
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(response)
            });
        });

        await page.route('/api/models', (route, request) => {
            const allModels = [
                'gpt-3.5-turbo',
                'gpt-4',
                'gpt-4-0301',
                'mock-model-1'
            ];
            const type = request.url().split('?type=')[1] || 'gpt';

            const uniqueModels = new Set<string>();
            allModels.forEach((model) => {
                if (model.startsWith(type)) {
                    if (model.startsWith('gpt-4')) {
                        uniqueModels.add('gpt-4');
                    } else if (model.startsWith('gpt-3.5-turbo')) {
                        uniqueModels.add('gpt-3.5-turbo');
                    } else {
                        uniqueModels.add(model);
                    }
                }
            });

            const response = Array.from(uniqueModels);
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(response)
            });
        });

        await page.coverage.startJSCoverage();
        await page.goto('/', { waitUntil: 'networkidle' });
    });

    test.afterEach(async ({ page }) => {
        await page.unroute('/api/chat');
        await page.unroute('/api/models');
    });

    test('should send a message and receive a response', async ({ page }) => {
        await page.fill('textarea', 'Hello, how are you?');
        await page
            .getByRole('button', { name: /Send/i })
            .click({ force: true });
        await page.waitForSelector('.message-user', { timeout: 2000 });
        await page.waitForSelector('.message-assistant', { timeout: 10000 });

        const userMessage = await page.textContent('.message-user');
        const assistantMessage = await page.textContent('.message-assistant');
        log.debug(
            `userMessage: ${userMessage}, assistantMessage: ${assistantMessage}`
        );
        expect(userMessage).toContain('Hello, how are you?');
        expect(assistantMessage).toContain('This is a mocked assistant reply.');
        expect(assistantMessage).toBeTruthy();
    });

    test('should switch model when selecting a different model', async ({
        page
    }) => {
        await page
            .locator('[data-testid="model-selector-button"]')
            .click({ force: true });
        await page.waitForSelector('[data-testid="model-selector-dropdown"]', {
            timeout: 10000
        });
        const availableModels = await page.$$eval(
            '[data-testid^="model-id-"]',
            (models) => models.map((model) => model.textContent)
        );

        console.log('Available models:', availableModels);

        const modelToSelect = availableModels.find(
            (model) => model !== 'gpt-3.5-turbo'
        );
        console.log('modelToSelect:', modelToSelect);

        await page.waitForSelector(
            `.dropdown-content > li > a:text("${modelToSelect}")`,
            { state: 'visible' }
        );
        await page.click(`.dropdown-content > li > a:text("${modelToSelect}")`);

        const selectedModel = await page.textContent(
            '.dropdown-hover > button'
        );
        expect(selectedModel).toEqual(modelToSelect);
    });

    test('should clear chat history on click of "Clear" button', async ({
        page
    }) => {
        await page.fill('textarea', 'Hello, how are you?');
        await page
            .getByRole('button', { name: /Send/i })
            .click({ force: true });
        await page.waitForSelector('.message-user', { timeout: 2000 });
        await page.waitForSelector('.message-assistant', { timeout: 10000 });
        await page
            .getByRole('button', { name: /Clear/i })
            .click({ force: true });

        const messages = await page.$$('.message');
        expect(messages.length).toBe(0);
    });
});
