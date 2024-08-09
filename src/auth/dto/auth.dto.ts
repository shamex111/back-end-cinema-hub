import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @MinLength(6, {
    message: 'Пароль должен содержать минимум 6 символов!',
  })
  @IsString()
  password: string;
}
