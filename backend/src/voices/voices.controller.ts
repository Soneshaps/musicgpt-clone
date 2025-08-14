import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { VoicesService } from './voices.service';
import { LoggerService } from '../logger';

@ApiTags('voices')
@Controller('voices')
export class VoicesController {
  private readonly logger: LoggerService;

  constructor(private readonly voicesService: VoicesService) {
    this.logger = new LoggerService().setContext('VoicesController');
  }

  @Get()
  @ApiOperation({ summary: 'Get voices with pagination and filtering' })
  @ApiQuery({
    name: 'language',
    required: false,
    description: 'Filter by language',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    type: Number,
  })
  findAll(
    @Query('language') language?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    this.logger.log(
      `Fetching voices with params: language=${language}, page=${page}, limit=${limit}`,
    );

    // Default values
    const pageNum = page ? +page : 1;
    const limitNum = limit ? +limit : 15;

    // Validate and apply limits
    const validPage = Math.max(1, pageNum);
    const validLimit = Math.min(100, Math.max(1, limitNum));

    this.logger.debug(
      `Using validated pagination: page=${validPage}, limit=${validLimit}`,
    );

    try {
      if (language) {
        this.logger.log(`Filtering voices by language: ${language}`);
        return this.voicesService.findByLanguage(
          language,
          validPage,
          validLimit,
        );
      }

      this.logger.log('Fetching all voices');
      return this.voicesService.findAll(validPage, validLimit);
    } catch (error) {
      this.logger.error(
        `Failed to fetch voices: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
