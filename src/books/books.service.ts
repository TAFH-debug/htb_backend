import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prismaService.book.create({
      data: createBookDto,
    });
  }

  findAll() {
    return this.prismaService.book.findMany();
  }

  findOne(id: string) {
    return this.prismaService.book.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.book.delete({
      where: { id },
    });
  }

  transferTo(id: string, userID: string) {
    return this.prismaService.book.update({
      where: { id },
      data: {
        user: {
          connect: { id: userID },
        },
      },
    });
  }
}
