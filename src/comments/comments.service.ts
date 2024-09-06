import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: createCommentDto,
    });
  }

  findAll() {
    return this.prismaService.comment.findMany();
  }

  findOne(id: string) {
    return this.prismaService.comment.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.comment.delete({
      where: { id },
    });
  }

  update(id: string, data: CreateCommentDto) {
    return this.prismaService.comment.update({
      where: { id },
      data,
    });
  }

  findByBookId(bookID: string) {
    return this.prismaService.comment.findMany({
      where: { bookID },
    });
  }

  findByUserId(userID: string) {
    return this.prismaService.comment.findMany({
      where: { userID },
    });
  }
}
