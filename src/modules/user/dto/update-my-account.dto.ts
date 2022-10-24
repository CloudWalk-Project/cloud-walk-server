import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateMyAccountDto {
  @Length(3, 30)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "User's name",
    example: 'John Smith 2.0',
  })
  name: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "User's photograph",
    example: 'https://user-photo.com',
  })
  image: string;
}
