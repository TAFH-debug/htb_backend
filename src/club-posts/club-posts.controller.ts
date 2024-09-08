import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClubPostsService } from './club-posts.service';
import { CreateClubPostDto } from './dto/create-club-post.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('club-posts')
export class ClubPostsController {
  constructor(private readonly clubPostsService: ClubPostsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createClubPostDto: CreateClubPostDto, @Req() req) {
    return this.clubPostsService.create(createClubPostDto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/like')
  like(@Param('id') id, @Req() req) {
    return this.clubPostsService.like(id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/like')
  unlike(@Param('id') id, @Req() req) {
    return this.clubPostsService.unlike(id, req.user.id);
  }

  @Get()
  findAll() {
    return this.clubPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubPostsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubPostsService.remove(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/add_comment')
  addComment(
    @Param('id') id: string,
    @Body() comment: AddCommentDto,
    @Req() req,
  ) {
    return this.clubPostsService.addComment(id, comment, req.user.id);
  }
}
