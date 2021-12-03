import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { create } from 'handlebars';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';
import cache from '@config/cache';

const redisClient = createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1,
});

export default async function raterLimit(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        await limiter.consume(req.ip);
        return next();
    } catch (error) {
        throw new AppError('too many requests', 429);
    }
}
