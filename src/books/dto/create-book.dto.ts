import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  author: string;
  @IsNotEmpty()
  archive_url: string;
  @IsNotEmpty()
  userID: string;
}
