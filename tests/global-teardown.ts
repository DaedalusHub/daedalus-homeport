import { getLogger } from '@/lib/logger';
import testServer from './testServer';
import process from 'process';

const log = getLogger('global-teardown.ts');

const globalTeardown = async (): Promise<void> => {
    log.info('Stopping testing server...');
    process.env.SERVER_RUNNING = 'false';
    testServer.stop();
    log.info('Testing server stopped');
};

export default globalTeardown;
