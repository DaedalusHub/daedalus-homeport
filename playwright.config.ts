import { PlaywrightTestConfig } from '@playwright/test';

const isCI = process.env.CI_ENV === 'true';
process.env.PLAYWRIGHT_NO_LAYOUT_SHIFT_CHECK = '1';

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
        trace: 'on',
        contextOptions: {
            permissions: ['clipboard-read', 'clipboard-write']
        }
    },
    //globalSetup: require.resolve('./tests/global-setup'),
    //globalTeardown: require.resolve('./tests/global-teardown'),
    reporter: isCI ? 'github' : 'dot',
    retries: isCI ? 0 : 0,
    timeout: isCI ? 10000 : 30000,
    workers: isCI ? 4 : undefined
};

export default config;
