import { Injectable } from '@nestjs/common';
import { CreateClubPostDto } from './dto/create-club-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class ClubPostsService {
  constructor(private prismaService: PrismaService) {}

  addComment(id: string, comment: AddCommentDto, userID: string) {
    this.prismaService.user.update({
      where: { id: userID },
      data: {
        score: { increment: 15 },
      },
    });

    return this.prismaService.clubPost.update({
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

  create(createClubPostDto: CreateClubPostDto, userID: string) {
    this.prismaService.user.update({
      where: { id: userID },
      data: {
        score: { increment: 20 },
      },
    });

    if (!createClubPostDto.clubID) {
      return this.prismaService.clubPost.create({
        data: {
          text: createClubPostDto.text,
          title: createClubPostDto.title,
          user: { connect: { id: userID } },
        },
      });
    }
    return this.prismaService.clubPost.create({
      data: {
        text: createClubPostDto.text,
        title: createClubPostDto.title,
        club: { connect: { id: createClubPostDto.clubID } },
        user: { connect: { id: userID } },
      },
    });
  }

  like(id: string, userID: string) {
    return this.prismaService.clubPost.update({
      where: { id },
      data: {
        likedUsers: {
          connect: { id: userID },
        },
      },
    });
  }

  unlike(id: string, userID: string) {
    return this.prismaService.clubPost.update({
      where: { id },
      data: {
        likedUsers: {
          disconnect: { id: userID },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.clubPost.findMany();
  }

  findOne(id: string) {
    return this.prismaService.clubPost.findUnique({
      where: { id },
      include: {
        user: true,
        comments: {
          include: { user: true },
        },
      },
    });
  }

  remove(id: string) {
    return this.prismaService.clubPost.delete({
      where: { id },
    });
  }
}
