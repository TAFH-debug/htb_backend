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
import { BookshelfsService } from './bookshelfs.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { AddBookDto } from './dto/add-book.dto';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('bookshelfs')
export class BookshelfsController {
  constructor(private readonly bookshelfsService: BookshelfsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createBookshelfDto: CreateBookshelfDto, @Req() req) {
    return this.bookshelfsService.create(createBookshelfDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.bookshelfsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('my')
  findMy(@Req() req) {
    return this.bookshelfsService.findMy(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookshelfsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookshelfsService.remove(id);
  }

  @Patch(':id/add-book')
  add_book(@Param('id') id: string, @Body() updateBookshelfDto: AddBookDto) {
    return this.bookshelfsService.add_book(id, updateBookshelfDto.bookID);
  }
}
