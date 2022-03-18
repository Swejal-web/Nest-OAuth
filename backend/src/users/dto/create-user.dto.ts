/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  roles: string;
  @IsString()
  @IsOptional()
  refreshToken: string;
}
