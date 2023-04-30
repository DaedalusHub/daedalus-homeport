import { expect, test } from 'playwright-test-coverage';

test.describe('Files Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.coverage.startJSCoverage();
        await page.goto('/');
        await page.click('button:text("Files")');
    });

    test('should have a load project button.', async ({ page }) => {
        const loadButton = await page.getByRole('button', {
            name: 'Load Project'
        });
        await expect(loadButton).toBeVisible();
    });
});
