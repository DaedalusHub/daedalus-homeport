// Part: lib/logger.ts
// Code Reference: https://github.com/winstonjs/winston
// Documentation:
// Code Reference: https://github.com/pimterry/loglevel

import log, { setLevel } from "loglevel";
import * as process from "process";
let winston;

if (typeof window === "undefined") {
    winston = require("winston");
}
if (typeof window !== "undefined") {
    const logLevel = process.env.LOG_LEVEL || "info"
    setLevel(logLevel as log.LogLevelDesc);
}


export const getLogger = (name: string) => {
    return winston
        ? winston.createLogger({
            level: "info",
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.printf(
                            (info) =>
                                `${info.timestamp} ${info.level}: ${info.message}`
                        )
                    ),
                }),
                new winston.transports.File({
                    filename: "logs/server.log",
                    level: process.env.LOG_LEVEL || "info",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf(
                            (info) => `${info.timestamp} ${info.level}: ${info.message}`
                        )
                    ),
                }),
            ],
        }).child({ label: name })
        : log.getLogger(name);
};
