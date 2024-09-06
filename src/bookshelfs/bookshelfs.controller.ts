import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { BookshelfsService } from './bookshelfs.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { AddBookDto } from './dto/add-book.dto';

@Controller('bookshelfs')
export class BookshelfsController {
  constructor(private readonly bookshelfsService: BookshelfsService) {}

  @Post()
  create(@Body() createBookshelfDto: CreateBookshelfDto) {
    return this.bookshelfsService.create(createBookshelfDto);
  }

  @Get()
  findAll() {
    return this.bookshelfsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookshelfsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookshelfsService.remove(id);
  }

  @Patch(':id')
  add_book(@Param('id') id: string, @Body() updateBookshelfDto: AddBookDto) {
    return this.bookshelfsService.add_book(id, updateBookshelfDto.bookID);
  }
}
