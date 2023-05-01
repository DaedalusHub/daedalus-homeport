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
        baseURL: 'http://localhost:4000',
        trace: 'on-first-retry',
        contextOptions: {
            permissions: ['clipboard-read', 'clipboard-write']
        }
    },
    globalSetup: require.resolve('./tests/global-setup'),
    globalTeardown: require.resolve('./tests/global-teardown'),
    reporter: isCI ? 'github' : 'dot',
    retries: isCI ? 2 : 0,
    timeout: isCI ? 60000 : 30000
    //workers: isCI ? 1 : undefined,
};

export default config;
