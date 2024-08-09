import { IsString } from 'class-validator';

export class updateActorDto {
  @IsString()
  name: string;

  @IsString()
  photoUrl: string;
}
