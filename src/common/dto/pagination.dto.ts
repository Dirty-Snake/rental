import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;
}
