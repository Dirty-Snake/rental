import { Controller, Get, Query } from "@nestjs/common";
import { HistoriesService } from './histories.service';
import { ApiTags } from '@nestjs/swagger';
import { History } from "./entities/history.entity";
import { ApiPaginatedResponse } from "../common/decorators/api-paginated-response.decorator";
import { PaginationDto } from "../common/dto/pagination.dto";

@ApiTags('histories')
@Controller('histories')
export class HistoriesController {

  constructor(private readonly historiesService: HistoriesService) {}

  @ApiPaginatedResponse(History)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.historiesService.findAll(
      paginationDto?.page,
      paginationDto?.limit,
      {
        create_date: 'ASC',
      },
      {
        user: true,
        admin: true,
        equipment: true,
      },
    );
  }
}
