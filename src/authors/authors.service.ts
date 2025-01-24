import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './authors.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    try {
      return await this.authorsRepository.find({ relations: ['books'] });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении авторов');
    }
  }

  async findOne(id: number): Promise<Author> {
    try {
      const author = await this.authorsRepository.findOne({
        where: { id },
        relations: ['books'],
      });
      if (!author) {
        throw new NotFoundException(`Автор с ID ${id} не найден`);
      }
      return author;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении автора');
    }
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      const author = this.authorsRepository.create(createAuthorDto);
      return await this.authorsRepository.save(author);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании автора');
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    try {
      await this.authorsRepository.update(id, updateAuthorDto);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при обновлении автора');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.authorsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении автора');
    }
  }
}
