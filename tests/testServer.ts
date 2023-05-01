// tests/testServer.ts
import { ChildProcess, exec } from 'child_process';
import { getLogger } from '@/lib/logger';

const log = getLogger('testServer.ts');

class TestServer {
    private server?: ChildProcess;

    public async start(): Promise<void> {
        log.info('Test server starting...');
        return new Promise<void>((resolve, reject) => {
            this.server = exec('yarn dev:test', (error) => {
                if (error) {
                    log.error(`Error starting test server: ${error}`);
                    reject(error);
                }
            });

            this.server.stdout?.on('data', (data) => {
                if (data.includes('compiled')) {
                    log.info('Test server started');
                    resolve();
                }
            });
        });
    }

    public stop(): void {
        if (this.server) {
            log.info('Test server stopping...');
            this.server.kill();
            this.server = undefined;
            log.info('Test server stopped');
        }
    }
}

const testServer = new TestServer();
export default testServer;
