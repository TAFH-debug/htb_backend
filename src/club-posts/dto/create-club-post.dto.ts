import { IsNotEmpty } from 'class-validator';

export class CreateClubPostDto {
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  title: string;
  clubID: string;
}
