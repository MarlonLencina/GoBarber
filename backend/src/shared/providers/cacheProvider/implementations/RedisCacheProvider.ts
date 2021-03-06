import { createConnections } from 'typeorm';
import ICacheProvider from '../models/ICacheProvider';
import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;
    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<t>(key: string): Promise<t | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as t;
        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);
        const pipeline = this.client.pipeline();
        keys.forEach((key) => pipeline.del(key));
        await pipeline.exec();
    }
}

export default RedisCacheProvider;
