import { expect, test } from 'playwright-test-coverage';

test.describe('Project Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('/api/get-projects', (route, request) => {
            const response = [
                {
                    id: '1',
                    name: 'Project 1',
                    intent: 'Intent 1',
                    goals: ['Goal 1', 'Goal 2']
                },
                {
                    id: '2',
                    name: 'Project 2',
                    intent: 'Intent 2',
                    goals: ['Goal 3', 'Goal 4']
                }
            ];
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(response)
            });
        });

        await page.route('/api/save-project', (route, request) => {
            const response = {
                message: 'Project details saved successfully'
            };
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(response)
            });
        });

        await page.coverage.startJSCoverage();
        await page.goto('/');
        await page.click('button:text("Project")');
    });

    test.afterEach(async ({ page }) => {
        await page.unroute('/api/save-project');
        await page.unroute('/api/get-projects');
    });

    test('should render the form', async ({ page }) => {
        const formExists = await page.isVisible('#project-details-form');
        expect(formExists).toBeTruthy();
    });

    test('should submit the form with valid data', async ({ page }) => {
        await page.fill('[name="name"]', 'Test Project');
        await page.fill('[name="intent"]', 'Test the project submission');
        await page.click('button:text("Add Goal")');
        await page.fill('[name="goals[0]"]', 'Goal 1');
        await page.click('button:text("Save")');
        const saveToast = await page.waitForSelector('div:text("Submitted")');
        expect(saveToast).toBeTruthy();
    });

    test('should generate a prompt with valid data', async ({ page }) => {
        await page.fill('[name="name"]', 'Test Project');
        await page.fill('[name="intent"]', 'Test the project submission');
        await page.click('button:text("Add Goal")');
        await page.fill('[name="goals[0]"]', 'Goal 1');
        await page.click('button:text("Generate Prompt")');
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("You are assisting me on a project with the following details:")'
        );
    });
});
