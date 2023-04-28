// tests/global-setup.ts
import { exec } from 'child_process';
import { FullConfig } from "@playwright/test";
import { getLogger } from "@/lib/logger";
import * as process from "process";
import * as http from "http";

const log = getLogger("global-setup.ts")

const isServerRunning = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        const request = http.get("http://localhost:3000", (response) => {
            if (response.statusCode === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        });

        request.on("error", () => {
            resolve(false);
        });
    });
};


export default async (config: FullConfig): Promise<void> => {
    process.env.USE_MOCKS = 'true';
    log.info('Starting testing server...')
    if ((global as any).__SERVER__) {
        log.debug('Existing server found, skipping server start');
        return;
    }

    const serverRunning = await isServerRunning();
    if (serverRunning) {
        log.debug("Existing server found, skipping server start");
        return;
    }

    log.debug("No server found, starting testing server...");
    return new Promise<void>((resolve, reject) => {
        const server = exec('yarn dev', (error) => {
            if (error) {
                reject(error);
            }
        });

        (global as any).__SERVER__ = server;

        server.stdout?.on('data', (data) => {
            if (data.includes('compiled')) {
                log.debug('Server is ready');
                resolve();
            }
        });
    });
};
