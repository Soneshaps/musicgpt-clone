import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger';

@Injectable()
export class VoicesService {
  private readonly logger: LoggerService;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new LoggerService().setContext('VoicesService');
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    this.logger.debug(`Finding all voices with pagination: skip=${skip}, limit=${limit}`);

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
      const duration = Date.now() - startTime;

      this.logger.log(`Retrieved ${voices.length} voices out of ${total} total (${duration}ms)`);

      return {
        voices,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error(`Error retrieving voices: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByLanguage(language: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    this.logger.debug(`Finding voices by language: ${language}, skip=${skip}, limit=${limit}`);

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
      const duration = Date.now() - startTime;

      this.logger.log(`Retrieved ${voices.length} ${language} voices out of ${total} total (${duration}ms)`);

      return {
        voices,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error(`Error retrieving ${language} voices: ${error.message}`, error.stack);
      throw error;
    }
  }
}
