import { Controller, Get, Param, Query } from '@nestjs/common';
import { VoicesService } from './voices.service';

@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesService: VoicesService) {}

  @Get()
  findAll(@Query('language') language?: string) {
    if (language) {
      return this.voicesService.findByLanguage(language);
    }
    return this.voicesService.findAll();
  }
}
