import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { BookshelfsModule } from './bookshelfs/bookshelfs.module';
import { CommentsModule } from './comments/comments.module';
import { ClubsModule } from './clubs/clubs.module';
import { AuthModule } from './auth/auth.module';
import { ClubPostsModule } from './club-posts/club-posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    BooksModule,
    BookshelfsModule,
    CommentsModule,
    ClubsModule,
    ClubPostsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
