import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a speech request
 *
 * This class defines the structure and validation rules for data
 * required to create a new speech request. It includes:
 * - Required prompt text for speech generation
 * - Required type of speech request (from predefined list)
 * - Optional lyrics for song generation
 * - Optional voice ID to use for speech generation
 */
export class CreateSpeechRequestDto {
  @ApiProperty({
    description: 'The prompt text for the speech generation',
    example: 'Generate a cheerful greeting for a podcast intro',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiProperty({
    description: 'The type of speech request',
    example: 'text-to-speech',
    enum: ['text-to-speech', 'song', 'podcast', 'story'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['text-to-speech', 'song', 'podcast', 'story'])
  type: string;

  @ApiPropertyOptional({
    description: 'Optional lyrics for song generation',
    example: 'Lyrics for a song about summer days',
  })
  @IsString()
  @IsOptional()
  lyrics?: string;

  @ApiPropertyOptional({
    description: 'Optional voice ID to use for the speech generation',
    example: 'cmebdk5wx000tuz6gyhnn5eb6',
  })
  @IsString()
  @IsOptional()
  voiceId?: string;
}
