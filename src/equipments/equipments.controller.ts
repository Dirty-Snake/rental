import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll() {
    return this.equipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentsService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(+id);
  }
}
