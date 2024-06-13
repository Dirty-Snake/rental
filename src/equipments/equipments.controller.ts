import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Equipment } from './entities/equipment.entity';
import { FindOneDto } from './dto/find-one.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { RentService } from './rent/rent.service';
import { RentEquipmentDto } from './rent/dto/rent-equipment.dto';
import { CurrentUserId } from '../common/decorators/current-user-id.decorator';
import { ReturnEquipmentDto } from './rent/dto/return-equipment.dto';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

@ApiTags('equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(
    private readonly equipmentsService: EquipmentsService,
    private readonly rentService: RentService,
  ) {}

  @ApiResponse({
    type: Equipment,
  })
  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.save(createEquipmentDto);
  }

  @ApiPaginatedResponse(Equipment)
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterEquipmentDto: FilterEquipmentDto,
  ) {
    return this.equipmentsService.findAll(
      paginationDto?.page,
      paginationDto?.limit,
      filterEquipmentDto,
      {
        create_date: 'ASC',
      },
      {
        tag: true,
        user: true,
        category: true,
      },
    );
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneDto) {
    return this.equipmentsService.findOne(id);
  }

  @ApiResponse({
    type: Equipment,
  })
  @Patch(':id')
  update(
    @Param() { id }: FindOneDto,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.save(updateEquipmentDto, id);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneDto) {
    return this.equipmentsService.remove(id);
  }

  @Post(':id/rent')
  rentEquipment(
    @Param() { id }: FindOneDto,
    @Body() rentEquipmentDto: RentEquipmentDto,
  ) {
    return this.rentService.rentEquipment(id, rentEquipmentDto);
  }

  @Post(':id/return')
  returnEquipment(
    @Param() { id }: FindOneDto,
    @CurrentUserId() userId: string,
    @Body() dto: ReturnEquipmentDto,
  ) {
    return this.rentService.returnEquipment(id, userId, dto);
  }
}
