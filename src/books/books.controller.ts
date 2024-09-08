import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { AddCommentDto } from 'src/club-posts/dto/add-comment.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() req) {
    return this.booksService.create(createBookDto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/like')
  like(@Param('id') id, @Req() req) {
    return this.booksService.like(id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/like')
  unlike(@Param('id') id, @Req() req) {
    return this.booksService.unlike(id, req.user.id);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('top')
  findTop() {
    return this.booksService.findTop();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Patch(':id/transfer')
  transferTo(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.transferTo(id, updateBookDto.userID);
  }

  @Delete(':id/transfer')
  unattach(@Param('id') id: string) {
    return this.booksService.unattach(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/add_comment')
  addComment(
    @Param('id') id: string,
    @Body() comment: AddCommentDto,
    @Req() req,
  ) {
    return this.booksService.addComment(id, comment, req.user.id);
  }
}
