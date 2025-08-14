import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SpeechRequestsService } from './speech-requests.service';
import { LoggerService } from '../logger';
import { CreateSpeechRequestDto } from './dto/create-speech-request.dto';

@ApiTags('speech-requests')
@Controller('speech-requests')
export class SpeechRequestsController {
  private readonly logger: LoggerService;

  constructor(private readonly speechRequestsService: SpeechRequestsService) {
    this.logger = new LoggerService().setContext('SpeechRequestsController');
  }

  @Post()
  @ApiOperation({ summary: 'Create a new speech request' })
  @ApiBody({ type: CreateSpeechRequestDto })
  @ApiResponse({
    status: 201,
    description: 'The speech request has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createSpeechRequestDto: CreateSpeechRequestDto) {
    try {
      this.logger.log(
        `Creating speech request: ${JSON.stringify(createSpeechRequestDto)}`,
      );
      return await this.speechRequestsService.create(createSpeechRequestDto);
    } catch (error) {
      this.logger.error(`Failed to create speech request: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
