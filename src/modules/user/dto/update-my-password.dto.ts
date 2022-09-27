import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's password",
    example: '0wn3r12#$',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'You need a stronger password.',
  })
  @ApiProperty({
    description:
      "User's password should contain at least capital letters, small letters, a number and or a special character.",
    example: '0wn3r12#$',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional() // Remover depois dos testes
  @ApiProperty({
    description: 'Confirm password',
    example: '0wn3r12#$2.0',
  })
  confirmNewPassword: string;
}
