import { UserRole } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsOptional()
  @IsString()
  avatarPath: string;
}
