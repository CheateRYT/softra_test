import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorDto {
  @ApiProperty({ description: 'Имя автора', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
