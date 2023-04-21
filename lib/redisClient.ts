// Part: lib/redisClient.ts
// Code Reference: https://github.com/redis/node-redis
// Documentation: https://redis.io/docs/clients/nodejs/

import redis from 'redis';
import { promisify } from 'util';
import { getLogger } from './logger';

const logger = getLogger('Redis');

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('error', err => {
    logger.error('Redis Client Error', err);
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
