import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Имя автора' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
