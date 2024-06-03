import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    type: String,
    example: 'В ремонте',
    description: 'Название',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
