// logger.ts
import log, { setLevel } from 'loglevel';
import { Logger } from 'winston';

interface LogInfo {
    timestamp: string;
    level: string;
    message: string;
}

let serverLogger: Logger;

if (typeof window === 'undefined') {
    const winston = require('winston');
    serverLogger = winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.colorize(),
                    winston.format.printf(
                        (info: LogInfo) =>
                            `${info.timestamp} ${info.level}: ${info.message}`
                    )
                )
            }),
            new winston.transports.File({
                filename: 'logs/server.log',
                level: process.env.LOG_LEVEL || 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(
                        (info: LogInfo) =>
                            `${info.timestamp} ${info.level}: ${info.message}`
                    )
                )
            })
        ]
    });
} else {
    const logLevel = process.env.LOG_LEVEL || 'info';
    setLevel(logLevel as log.LogLevelDesc);
}

const createLogger = (name: string) => {
    const clientLogger = log.getLogger(name);

    if (typeof window === 'undefined') {
        return {
            debug: (message: string) => {
                serverLogger.debug({ label: name, message });
            },
            info: (message: string) => {
                serverLogger.info({ label: name, message });
            },
            warn: (message: string) => {
                serverLogger.warn({ label: name, message });
            },
            error: (message: string) => {
                serverLogger.error({ label: name, message });
            }
        };
    } else {
        return clientLogger;
    }
};

export const getLogger = (name: string) => {
    return createLogger(name);
};
