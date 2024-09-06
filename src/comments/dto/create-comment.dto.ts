import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  userID: string;
  @IsNotEmpty()
  bookID: string;
}
