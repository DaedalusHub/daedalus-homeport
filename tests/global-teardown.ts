// tests/global-teardown.ts
import { FullConfig } from '@playwright/test';
import process from 'process';

export default async (config: FullConfig): Promise<void> => {
    if ((global as any).__SERVER__) {
        (global as any).__SERVER__.kill();
    }

    process.env.USE_MOCKS = 'false';
};
