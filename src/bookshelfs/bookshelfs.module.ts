import { Module } from '@nestjs/common';
import { BookshelfsService } from './bookshelfs.service';
import { BookshelfsController } from './bookshelfs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookshelfsController],
  providers: [BookshelfsService],
  imports: [PrismaModule],
})
export class BookshelfsModule {}
