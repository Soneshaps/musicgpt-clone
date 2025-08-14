import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VoicesService } from './voices.service';

@ApiTags('voices')
@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesService: VoicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all voices' })
  @ApiQuery({
    name: 'language',
    required: false,
    description: 'Filter voices by language (english, nepali, indian)',
    example: 'english',
  })
  @ApiResponse({
    status: 200,
    description: 'List of voices retrieved successfully',
  })
  findAll(@Query('language') language?: string) {
    if (language) {
      return this.voicesService.findByLanguage(language);
    }
    return this.voicesService.findAll();
  }
}
