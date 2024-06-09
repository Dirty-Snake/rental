import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class FindOneDto {
  @ApiProperty({
    type: String,
  })
  @IsUUID()
  @IsString()
  id: string;
}
