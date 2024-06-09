import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterEquipmentDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsUUID()
  @IsOptional()
  category_id: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsUUID()
  @IsOptional()
  tag_id: string;

  @ApiProperty({ default: false, description: 'Доступность', required: false })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  availability: boolean;
}
