import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prismaService.user.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        books: true,
        bookshelfs: true,
        favorites: true,
        clubPosts: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
