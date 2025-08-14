import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VoicesModule } from './voices/voices.module';
import { LoggerModule } from './logger';
import { RedisModule } from './redis';

@Module({
  imports: [PrismaModule, VoicesModule, LoggerModule, RedisModule],
})
export class AppModule {}
