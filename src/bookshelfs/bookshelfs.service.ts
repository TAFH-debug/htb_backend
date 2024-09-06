import { Injectable } from '@nestjs/common';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookshelfsService {
  constructor(private prismaService: PrismaService) {}

  create(createBookshelfDto: CreateBookshelfDto) {
    return this.prismaService.bookshelf.create({
      data: createBookshelfDto,
    });
  }

  findAll() {
    return this.prismaService.bookshelf.findMany();
  }

  findOne(id: string) {
    return this.prismaService.bookshelf.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.bookshelf.delete({
      where: { id },
    });
  }

  add_book(bookshelf_id: string, book_id: string) {
    return this.prismaService.bookshelf.update({
      where: { id: bookshelf_id },
      data: {
        books: {
          connect: { id: book_id },
        },
      },
    });
  }
}
