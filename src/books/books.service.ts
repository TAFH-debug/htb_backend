import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCommentDto } from 'src/club-posts/dto/add-comment.dto';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  addComment(id: string, comment: AddCommentDto, userID: string) {
    this.prismaService.user.update({
      where: { id: userID },
      data: {
        score: { increment: 15 },
      },
    });

    return this.prismaService.book.update({
      where: { id },
      data: {
        comments: {
          create: {
            text: comment.text,
            user: { connect: { id: userID } },
          },
        },
      },
    });
  }

  create(createBookDto: CreateBookDto, userID: string) {
    return this.prismaService.book.create({
      data: {
        ...createBookDto,
        user: {
          connect: { id: userID },
        },
      },
    });
  }

  findTop() {
    return this.prismaService.book.findMany({
      take: 3,
      orderBy: {
        likedUsers: {
          _count: 'desc',
        },
      },
    });
  }

  like(id: string, userID: string) {
    return this.prismaService.book.update({
      where: { id },
      data: {
        likedUsers: {
          connect: { id: userID },
        },
      },
    });
  }

  unlike(id: string, userID: string) {
    return this.prismaService.book.update({
      where: { id },
      data: {
        likedUsers: {
          disconnect: { id: userID },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.book.findMany();
  }

  findOne(id: string) {
    return this.prismaService.book.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
      },
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

  unattach(id: string) {
    return this.prismaService.book.update({
      where: { id },
      data: {
        user: {
          disconnect: true,
        },
      },
    });
  }
}
