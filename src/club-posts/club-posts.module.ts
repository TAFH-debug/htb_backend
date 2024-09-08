import { Module } from '@nestjs/common';
import { ClubPostsService } from './club-posts.service';
import { ClubPostsController } from './club-posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ClubPostsController],
  providers: [ClubPostsService],
  imports: [PrismaModule],
})
export class ClubPostsModule {}
