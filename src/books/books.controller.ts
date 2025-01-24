import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Получить список книг' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Получить книгу по ID' })
  @ApiResponse({ status: 404, description: 'Книга не найдена' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Создать книгу' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Обновить книгу' })
  @ApiResponse({ status: 404, description: 'Книга не найдена' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Удалить книгу' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
