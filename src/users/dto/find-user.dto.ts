import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindUserDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
}
