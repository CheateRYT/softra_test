import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsOptional()
  name?: string;
}
