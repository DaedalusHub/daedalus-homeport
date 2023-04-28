import { test, expect } from '@playwright/test';
import { getLogger } from "@/lib/logger";


const log = getLogger("chat-ui.spec.ts")

test.describe('Chat UI', () => {
    test.beforeEach(async ({ page }) => {
        // Intercept and mock /api/chat API call
        await page.route('/api/chat', (route, request) => {
            const response = {
                message: {
                    role: 'assistant',
                    content:
                        "Mocked message reply.",
                },
                finish_reason: 'stop',
                index: 0,
            };
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(response),
            });
        });

        await page.goto('/');
    });

    test.afterEach(async ({ page }) => {
        await page.unroute('/api/chat');
    });

    test('should send a message and receive a response', async ({ page }) => {
        await page.fill('textarea', 'Hello, how are you?');
        await page.click('button:text("Send")');
        await page.waitForSelector('.message-user', { timeout: 2000 });
        await page.waitForSelector('.message-assistant', { timeout: 10000 });

        const userMessage = await page.textContent('.message-user');
        const assistantMessage = await page.textContent('.message-assistant');
        log.debug(`userMessage: ${userMessage}, assistantMessage: ${assistantMessage}`)
        expect(userMessage).toContain('Hello, how are you?');
        expect(assistantMessage).toBeTruthy();
    });

    test('should switch model when selecting a different model', async ({ page }) => {
        await page.click('.dropdown-hover > button');
        await page.waitForSelector('.dropdown-content', { timeout: 2000 });
        const availableModels = await page.$$eval('.dropdown-content > li > a', (models) => models.map((model) => model.textContent));
        const modelToSelect = availableModels.find((model) => model !== 'gpt-3.5-turbo');

        await page.click(`.dropdown-content > li > a:text("${modelToSelect}")`);

        const selectedModel = await page.textContent('.dropdown-hover > button');
        expect(selectedModel).toEqual(modelToSelect);
    });

    test('should clear chat history on click of "Clear" button', async ({ page }) => {
        await page.fill('textarea', 'Hello, how are you?');
        await page.click('button:text("Send")');
        await page.waitForSelector('.message-user', { timeout: 2000 });
        await page.waitForSelector('.message-assistant', { timeout: 10000 });

        await page.click('button:text("Clear")');

        const messages = await page.$$('.message');
        expect(messages.length).toBe(0);
    });
});
