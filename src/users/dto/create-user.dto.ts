import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@email.ru',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'SEe121!@232ed',
    type: String,
    description: 'Password must be at least 8 characters long',
  })
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z]).+$/, {
    message: 'Password must contain at least one uppercase letter',
  })
  readonly password?: string;

  @ApiProperty({
    example: 'admin',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @IsAlphanumeric('en-US', {
    message: 'Username can only contain letters and numbers',
  })
  readonly username: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  lastname?: string;
}
