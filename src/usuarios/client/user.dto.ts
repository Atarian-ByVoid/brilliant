import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiPropertyOptional({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class CreateUserDTO extends OmitType(UserDTO, ['role', 'id']) {}
export class UpdateUserDTO extends OmitType(UserDTO, [
  'id',
  'role',
  'password',
  'email',
]) {}
