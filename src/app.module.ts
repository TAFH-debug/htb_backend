import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { BookshelfsModule } from './bookshelfs/bookshelfs.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, PrismaModule, BooksModule, BookshelfsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
