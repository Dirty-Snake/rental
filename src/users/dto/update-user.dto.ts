import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'test@email.ru',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

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
