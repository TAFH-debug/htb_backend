import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private prismaService: PrismaService) {}

  create(createClubDto: CreateClubDto, presidentID: string) {
    return this.prismaService.club.create({
      data: {
        ...createClubDto,
        president: {
          connect: { id: presidentID },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.club.findMany({ include: { president: true } });
  }

  findPosts(id: string) {
    return this.prismaService.clubPost.findMany({
      where: { clubID: id },
      include: { user: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.club.findUnique({
      where: { id: id },
      include: { president: true, clubPosts: true },
    });
  }

  remove(id: string) {
    return this.prismaService.club.delete({
      where: { id: id },
    });
  }
}
