import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { LoggerService } from '../logger';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private readonly logger: LoggerService;
  private readonly DEFAULT_TTL = 3600; // 1 hour in seconds

  constructor() {
    this.logger = new LoggerService().setContext('RedisService');

    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

    this.client = createClient({
      url: `redis://${redisHost}:${redisPort}`,
    });

    this.client.on('error', (err) => {
      this.logger.error(`Redis client error: ${err.message}`, err.stack);
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log(`Connected to Redis`);
    } catch (error) {
      this.logger.error(`Failed to connect to Redis: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    try {
      await this.client.quit();
      this.logger.log('Disconnected from Redis');
    } catch (error) {
      this.logger.error(`Error disconnecting from Redis: ${error.message}`);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      this.logger.error(`Error getting key ${key}: ${error.message}`);
      return null;
    }
  }

  async set(
    key: string,
    value: any,
    ttl: number = this.DEFAULT_TTL,
  ): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value), { EX: ttl });
      this.logger.debug(`Cached: ${key} (TTL: ${ttl}s)`);
    } catch (error) {
      this.logger.error(`Error setting key ${key}: ${error.message}`);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
      this.logger.debug(`Deleted: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting key ${key}: ${error.message}`);
    }
  }

  async flushAll(): Promise<void> {
    try {
      await this.client.flushAll();
      this.logger.warn('Cache cleared');
    } catch (error) {
      this.logger.error(`Error clearing cache: ${error.message}`);
    }
  }

  // Simple key generator
  generateKey(prefix: string, params: Record<string, any> = {}): string {
    const filteredParams = {};

    // Filter out undefined/null values
    Object.keys(params).forEach((key) => {
      if (params[key] != null) {
        filteredParams[key] = params[key];
      }
    });

    // If no params, just return the prefix
    if (Object.keys(filteredParams).length === 0) {
      return prefix;
    }

    // Otherwise, append the JSON string of params
    return `${prefix}:${JSON.stringify(filteredParams)}`;
  }
}
