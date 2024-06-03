import { ApiProperty } from '@nestjs/swagger';
export class PaginatedResultDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}
