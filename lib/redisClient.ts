// Part: lib/redisClient.ts
// Code Reference: https://github.com/redis/node-redis
// Documentation: https://redis.io/docs/clients/nodejs/

import { createClient } from 'redis';
import { getLogger } from './logger';

const log = getLogger('Redis');

//const redisUrl = process.env.REDIS_URL;
const redisUrl = process.env.REDIS_URL

if (!redisUrl) {
    throw new Error('REDIS_URL is not defined in environment variables');
}

const createRedisClient = () => {
    const client = createClient({
        url: redisUrl,
    });

    client.on('error', (error) => {
        log.error(`Redis Error: ${error}`);
    });

    return client;
};

export const getAsync = async (key: string): Promise<string | null> => {
    const client = createRedisClient();
    await client.connect();
    const result = await client.get(key);
    await client.disconnect();
    return result;
};

export const setAsync = async (key: string, value: string): Promise<void> => {
    const client = createRedisClient();
    await client.connect();
    await client.set(key, value);
    await client.disconnect();
};
