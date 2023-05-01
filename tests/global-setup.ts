import { getLogger } from '@/lib/logger';
import * as process from 'process';
import testServer from './testServer';

const log = getLogger('global-setup.ts');

const globalSetup = async (): Promise<void> => {
    process.env.TEST = 'true';

    if (process.env.CI_ENV === 'true') {
        log.info('CI environment detected, skipping server start');
        return;
    }

    log.info('Starting testing server...');

    if (process.env.SERVER_RUNNING === 'true') {
        log.info('Existing server found, skipping server start');
        return;
    }

    log.info('No server found, starting testing server...');
    process.env.SERVER_RUNNING = 'true';
    await testServer.start();
};

export default globalSetup;
