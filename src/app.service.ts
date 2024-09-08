import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async search(query: string) {
    const books = await this.prismaService.book.findMany({
      take: 2,
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    const users = await this.prismaService.user.findMany({
      take: 2,
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return {
      books,
      users,
    };
  }
}
