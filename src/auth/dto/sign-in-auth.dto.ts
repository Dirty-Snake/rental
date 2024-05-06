import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthDto {
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
    example: 'SEe121!@232ed',
    type: String,
    description: 'Password must be at least 8 characters long',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Z]).+$/, {
    message: 'Password must contain at least one uppercase letter',
  })
  readonly password: string;
}
export class AccessToken {
  @ApiProperty({
    type: String,
  })
  readonly accessToken: string;
  @ApiProperty({
    type: Number,
  })
  expiresIn: number;
}
