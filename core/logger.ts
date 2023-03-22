import log from 'loglevel';

log.setLevel('debug');

export const LogLevel = {
    TRACE: 'trace',
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    SILENT: 'silent',
};

export default log;
