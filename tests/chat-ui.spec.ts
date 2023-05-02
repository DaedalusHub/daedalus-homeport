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
            const response = ['gpt-4', 'gpt-3.5-turbo'];
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(response)
            });
        });

        await page.coverage.startJSCoverage();
        await page.goto('/');
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
            .getByRole('button', { name: /Model selector/i })
            .click({ force: true });

        await page.waitForSelector('.dropdown-content', { timeout: 2000 });
        const availableModels = await page.$$eval(
            '.dropdown-content > li > a',
            (models) => models.map((model) => model.textContent)
        );
        const modelToSelect = availableModels.find(
            (model) => model !== 'gpt-3.5-turbo'
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
