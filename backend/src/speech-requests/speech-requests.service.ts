import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger';

@Injectable()
export class SpeechRequestsService {
  private readonly logger: LoggerService;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new LoggerService().setContext('SpeechRequestsService');
  }

  async create(data: {
    prompt: string;
    type: string;
    lyrics?: string;
    voiceId?: string;
  }) {
    try {
      this.logger.log(`Creating speech request: ${JSON.stringify(data)}`);

      // Validate voice ID if provided
      if (data.voiceId) {
        const voice = await this.prisma.voice.findUnique({
          where: { id: data.voiceId },
        });

        if (!voice) {
          this.logger.error(`Voice with ID ${data.voiceId} not found`);
          throw new Error(`Voice with ID ${data.voiceId} not found`);
        }
      }

      const speechRequest = await this.prisma.speechRequest.create({
        data: {
          prompt: data.prompt,
          type: data.type,
          lyrics: data.lyrics,
          voiceId: data.voiceId,
          status: 'pending',
        },
        include: {
          voice: true,
        },
      });

      this.logger.log(`Speech request created with ID: ${speechRequest.id}`);
      return speechRequest;
    } catch (error) {
      this.logger.error(`Error creating speech request: ${error.message}`);
      throw error;
    }
  }
}
