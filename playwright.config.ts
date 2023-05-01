import { PlaywrightTestConfig } from '@playwright/test';

const isCI = process.env.CI_ENV === 'true';

const config: PlaywrightTestConfig = {
    testDir: 'tests',
    testMatch: '**/*.spec.ts',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        contextOptions: {
            permissions: ['clipboard-read', 'clipboard-write']
        }
    },
    globalSetup: require.resolve('./tests/global-setup'),
    globalTeardown: require.resolve('./tests/global-teardown'),
    reporter: isCI ? 'github' : 'dot',
    retries: isCI ? 2 : 0,
    workers: isCI ? 1 : undefined,
    timeout: 30000
};

if (isCI) {
    config.projects = [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'WebKit',
            use: { browserName: 'webkit' }
        }
    ];
}

export default config;
