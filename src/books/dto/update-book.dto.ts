import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ description: 'Название книги', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Описание книги', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID автора', required: false })
  @IsInt()
  @IsOptional()
  authorId?: number;
}
