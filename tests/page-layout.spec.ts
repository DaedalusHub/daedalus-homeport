import { expect, test } from 'playwright-test-coverage';

test.describe('When the page loads', () => {
    test.beforeEach(async ({ page }) => {
        await page.coverage.startJSCoverage();
        await page.goto('/');
    });

    test('it has a title', async ({ page }) => {
        await expect(page).toHaveTitle(/Daedalus HomePort/);
    });

    test('it renders the navbar', async ({ page }) => {
        const navbarExists = await page.getByTestId('navBar');
        expect(navbarExists).toBeTruthy();
    });

    test('it renders the logo', async ({ page }) => {
        const logoExists = await page.getByTestId('logo');
        expect(logoExists).toBeTruthy();
    });

    test('it renders the correct number of tabs', async ({ page }) => {
        const tabCount = await page.$$eval('button.tab', (tabs) => tabs.length);
        expect(tabCount).toBe(3);
    });

    test('it has the correct active tab', async ({ page }) => {
        const activeTab = await page.textContent('button.tab-active');
        expect(activeTab).toBe('Chat');
    });

    test('it renders the content for the active tab', async ({ page }) => {
        const chatUIExists = await page.getByTestId('chat-ui');
        expect(chatUIExists).toBeTruthy();
    });
});
