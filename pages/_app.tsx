// Part: /pages/_app.tsx
// Code Reference: https://github.com/vercel/next.js/
// Documentation: https://nextjs.org/docs/

import '../styles/global.css';
import { AppProps } from 'next/app';
import log from 'loglevel';
import { useEffect } from 'react';

const logLevel = process.env.LOG_LEVEL || 'warn';
log.setLevel(logLevel as log.LogLevelDesc);

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
