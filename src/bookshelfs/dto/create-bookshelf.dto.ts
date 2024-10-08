import { IsNotEmpty } from 'class-validator';

export class CreateBookshelfDto {
  @IsNotEmpty()
  name: string;
}
