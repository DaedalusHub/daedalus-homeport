// pages/_app.tsx
import '../styles/global.css';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import log from 'loglevel';
import process from 'process';

const logLevel = process.env.LOG_LEVEL || 'warn';
log.setLevel(logLevel as log.LogLevelDesc);

const startWorker = async () => {
    if ((global as any).__WORKER_STARTED__) {
        return;
    }

    log.info('Starting mock service worker');
    const { worker } = require('../tests/mocks/browser');
    await worker.start();
    (global as any).__WORKER_STARTED__ = true;
};

if (process.env.TEST === 'true') {
    startWorker();
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        log.info('App started');
        return () => {
            log.info('App stopped');
        };
    }, []);

    return <Component {...pageProps} />;
};

export default MyApp;
