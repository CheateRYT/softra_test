import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/authors.entity';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    try {
      return await this.booksRepository.find({ relations: ['author'] });
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении списка книг',
      );
    }
  }

  async findOne(id: number): Promise<Book> {
    try {
      const book = await this.booksRepository.findOne({
        where: { id },
        relations: ['author'],
      });
      if (!book) {
        throw new NotFoundException(`Книга с ID ${id} не найдена`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении книги');
    }
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const author = await this.authorsRepository.findOne({
        where: { id: createBookDto.authorId },
      });
      if (!author) {
        throw new NotFoundException(
          `Автор с ID ${createBookDto.authorId} не найден`,
        );
      }
      const book = this.booksRepository.create({
        ...createBookDto,
        author,
      });
      return await this.booksRepository.save(book);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании книги');
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      if (updateBookDto.authorId) {
        const author = await this.authorsRepository.findOne({
          where: { id: updateBookDto.authorId },
        });
        if (!author) {
          throw new NotFoundException(
            `Автор с ID ${updateBookDto.authorId} не найден`,
          );
        }
      }

      await this.booksRepository.update(id, updateBookDto);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при обновлении книги');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.booksRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении книги');
    }
  }
}
