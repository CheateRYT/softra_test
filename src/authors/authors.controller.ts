import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Получить список авторов' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Получить автора по ID' })
  @ApiResponse({ status: 404, description: 'Автор не найден' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Создать автора' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Обновить автора' })
  @ApiResponse({ status: 404, description: 'Автор не найден' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Удалить автора' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
