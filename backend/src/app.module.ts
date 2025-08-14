import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VoicesModule } from './voices/voices.module';

@Module({
  imports: [PrismaModule, VoicesModule],
})
export class AppModule {}
