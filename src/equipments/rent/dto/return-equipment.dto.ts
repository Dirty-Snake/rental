import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class ReturnEquipmentDto {
  @ApiProperty({
    type: Date,
    description: 'Дата конца аренды',
  })
  @IsDateString()
  @IsOptional()
  rental_end_date: Date;

  @ApiProperty({
    type: String,
    description: 'Примечание о состоянии инвентаря при возврате',
  })
  @IsOptional()
  @IsString()
  return_note: string;
}
