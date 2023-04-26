import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page).toHaveTitle(/Daedalus HomePort/);
});

test('Files-> Load Project Button Visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button:text("Files")');
    const loadButton = await page.getByRole('button', { name: 'Load Project' });
    await expect(loadButton).toBeVisible();
});
