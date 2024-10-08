import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { JwtGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          cb(null, `${uuid()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `http://localhost:8080/uploads/${file.filename}` };
  }

  @Post('search')
  search(@Body() body: { query: string }) {
    return this.appService.search(body.query);
  }

  @UseGuards(JwtGuard)
  @Get('daily-quiz')
  dailyQuiz(@Req() req) {
    return this.appService.dailyQuiz(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('daily-answer')
  dailyAnswer(@Req() req) {
    return this.appService.dailyAnswer(req.user.id);
  }
}
