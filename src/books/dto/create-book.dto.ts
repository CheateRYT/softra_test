import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Название книги' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Описание книги' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID автора' })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
