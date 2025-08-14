import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger';
import { RedisService } from '../redis';

@Injectable()
export class VoicesService {
  private readonly logger: LoggerService;
  private readonly CACHE_TTL = 300; // 5 minutes in seconds
  private readonly CACHE_PREFIX = 'voices';

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {
    this.logger = new LoggerService().setContext('VoicesService');
  }

  async findAll(page: number, limit: number) {
    // Create a cache key based on the query parameters
    const cacheKey = this.redisService.generateKey(this.CACHE_PREFIX, {
      page,
      limit,
    });

    // Try to get data from cache
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      this.logger.log(`Cache hit: ${cacheKey}`);
      return cachedData;
    }

    // Cache miss, get data from database
    this.logger.log(`Cache miss: ${cacheKey}`);
    const skip = (page - 1) * limit;

    try {
      const startTime = Date.now();
      const [voices, total] = await Promise.all([
        this.prisma.voice.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.voice.count(),
      ]);

      const result = {
        voices,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };

      // Cache the result
      await this.redisService.set(cacheKey, result, this.CACHE_TTL);

      this.logger.log(
        `DB query: ${Date.now() - startTime}ms, ${voices.length} voices`,
      );
      return result;
    } catch (error) {
      this.logger.error(`Error retrieving voices: ${error.message}`);
      throw error;
    }
  }

  async findByLanguage(language: string, page: number, limit: number) {
    // Create a cache key based on the query parameters
    const cacheKey = this.redisService.generateKey(this.CACHE_PREFIX, {
      language,
      page,
      limit,
    });

    // Try to get data from cache
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      this.logger.log(`Cache hit: ${cacheKey}`);
      return cachedData;
    }

    // Cache miss, get data from database
    this.logger.log(`Cache miss: ${cacheKey}`);
    const skip = (page - 1) * limit;

    try {
      const startTime = Date.now();
      const [voices, total] = await Promise.all([
        this.prisma.voice.findMany({
          where: { language },
          skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        this.prisma.voice.count({
          where: { language },
        }),
      ]);

      const result = {
        voices,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };

      // Cache the result
      await this.redisService.set(cacheKey, result, this.CACHE_TTL);

      this.logger.log(
        `DB query: ${Date.now() - startTime}ms, ${voices.length} ${language} voices`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Error retrieving ${language} voices: ${error.message}`,
      );
      throw error;
    }
  }
}
