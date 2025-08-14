import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [voices, total] = await Promise.all([
      this.prisma.voice.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.voice.count(),
    ]);

    return {
      voices,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findByLanguage(language: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

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

    return {
      voices,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
