import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.voice.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByLanguage(language: string) {
    return this.prisma.voice.findMany({
      where: { language },
      orderBy: { name: 'asc' },
    });
  }
}
