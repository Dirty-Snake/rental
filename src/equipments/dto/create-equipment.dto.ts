import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateEquipmentDto {
  @ApiProperty({
    type: String,
    example: 'Велосипед MERIDA',
    description: 'Название',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    description: 'Состояние ',
    example: 'Потёртости на корпусе',
  })
  @IsString()
  @IsOptional()
  condition?: string;

  @ApiProperty({
    type: String,
    description: 'Состояние ',
    example: 'M',
  })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор тега',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  tag_id?: string;

  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор категории',
  })
  @IsNotEmpty()
  @IsUUID()
  category_id: string;

  @ApiProperty({ default: false, description: 'Доступность' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  availability: boolean;
}
