import { Injectable } from '@nestjs/common';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookshelfsService {
  constructor(private prismaService: PrismaService) {}

  create(createBookshelfDto: CreateBookshelfDto, userID: string) {
    return this.prismaService.bookshelf.create({
      data: {
        name: createBookshelfDto.name,
        user: {
          connect: { id: userID },
        },
      },
    });
  }

  findMy(userID: string) {
    return this.prismaService.bookshelf.findMany({
      where: { userID: userID },
      include: { books: true },
    });
  }

  findAll() {
    return this.prismaService.bookshelf.findMany({
      include: { books: true },
    });
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
