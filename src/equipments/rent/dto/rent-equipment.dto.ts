import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID
} from "class-validator";

export class RentEquipmentDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsUUID()
  user_id: string;

  @ApiProperty({
    type: Date,
    description: 'Дата конца аренды',
  })
  @IsDateString()
  @IsNotEmpty()
  rental_end_date: Date;
}
