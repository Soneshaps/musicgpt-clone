import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VoicesModule } from './voices/voices.module';
import { LoggerModule } from './logger';

@Module({
  imports: [PrismaModule, VoicesModule, LoggerModule],
})
export class AppModule {}
