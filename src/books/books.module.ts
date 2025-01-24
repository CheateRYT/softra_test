import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/authors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
