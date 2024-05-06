import { Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';

@Injectable()
export class InformationsService {
  create(createInformationDto: CreateInformationDto) {
    return 'This action adds a new information';
  }

  findAll() {
    return `This action returns all informations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} information`;
  }

  update(id: number, updateInformationDto: UpdateInformationDto) {
    return `This action updates a #${id} information`;
  }

  remove(id: number) {
    return `This action removes a #${id} information`;
  }
}
