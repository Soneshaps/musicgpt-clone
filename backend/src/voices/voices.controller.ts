import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { VoicesService } from './voices.service';

@ApiTags('voices')
@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesService: VoicesService) {}

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
    // Default values
    const pageNum = page ? +page : 1;
    const limitNum = limit ? +limit : 15;

    // Validate and apply limits
    const validPage = Math.max(1, pageNum);
    const validLimit = Math.min(100, Math.max(1, limitNum));

    if (language) {
      return this.voicesService.findByLanguage(language, validPage, validLimit);
    }
    return this.voicesService.findAll(validPage, validLimit);
  }
}
