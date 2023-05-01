import { expect, test } from 'playwright-test-coverage';

test.describe('The files page', () => {
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

    test('should have a copy project button.', async ({ page }) => {
        const copyButton = await page.getByRole('button', {
            name: 'Copy to Clipboard'
        });
        await expect(copyButton).toBeVisible();
    });

    test('should have a file tree container.', async ({ page }) => {
        const fileTree = await page.getByTestId('fileTreeContainer');
        await expect(fileTree).toBeVisible();
    });
});
