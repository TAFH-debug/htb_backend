import { IsNotEmpty } from 'class-validator';

export class AddBookDto {
  @IsNotEmpty()
  bookID: string;
}
