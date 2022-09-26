import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's name",
    example: 'John Smith',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "User's photograph",
    example: 'https://user-photo.com',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's password",
    example: '0wn3r12#$',
  })
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's email address",
    example: 'owner@iarte.com',
  })
  email: string;

  @IsEnum(['Owner', 'Manager', 'SalesPerson', 'Customer'])
  @IsIn(['Owner', 'Manager', 'SalesPerson', 'Customer'])
  @ApiProperty({
    description: 'Grants user access to routes based on roles',
    example: 'Owner',
  })
  role: UserRole;
}