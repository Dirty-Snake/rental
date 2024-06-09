import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import {
  EntityManager,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    private readonly entityManager: EntityManager,
  ) {}
  async save(
    dto: CreateEquipmentDto | UpdateEquipmentDto,
    id?: string,
  ): Promise<Equipment> {
    return await this.entityManager.transaction<Equipment>(
      async (entityManager: EntityManager): Promise<Equipment> => {
        const { category_id, tag_id, ...otherData } = dto;
        const equipment =
          id !== undefined
            ? await this.findEquipment(
                id,
                { tag: true, category: true },
                entityManager,
              )
            : new Equipment();
        const [tag, category] = await Promise.all([
          this.findTag(tag_id, entityManager),
          this.findCategory(category_id, entityManager),
        ]);
        Object.assign(equipment, {
          ...otherData,
          tag: tag ?? equipment.tag,
          category: category ?? equipment.category,
        });
        return await entityManager.save(equipment);
      },
    );
  }

  async findAll(
    page = 1,
    limit = 10,
    dto: FilterEquipmentDto,
    order?: FindOptionsOrder<Equipment>,
    relations?: FindOptionsRelations<Equipment>,
  ): Promise<PaginatedResultDto<Equipment>> {
    const where = this.filter(dto);
    const [data, total] = await this.equipmentRepository.findAndCount({
      relations: relations,
      skip: (page - 1) * limit,
      where: where,
      take: limit,
      order: order,
    });
    return <PaginatedResultDto<Equipment>>{
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private filter(dto: FilterEquipmentDto) {
    const where: FindOptionsWhere<Equipment> = {};
    if (dto?.category_id) {
      where.category = {
        id: dto.category_id,
      };
    }
    if (dto?.tag_id) {
      where.tag = {
        id: dto.tag_id,
      };
    }
    if (dto?.availability) {
      where.availability = dto.availability;
    }
    return where;
  }

  async findOne(id: string) {
    const equipment = await this.equipmentRepository.findOne({
      where: {
        id,
      },
      relations: {
        tag: true,
        category: true,
        user: true,
      },
    });
    if (!equipment) {
      throw new BadRequestException('Нет такого инвентаря');
    }
    return equipment;
  }

  async remove(id: string): Promise<Equipment> {
    return await this.entityManager.transaction<Equipment>(
      async (entityManager: EntityManager): Promise<Equipment> => {
        const equipment = await this.findEquipment(id, {}, entityManager);
        return await entityManager.softRemove<Equipment>(equipment);
      },
    );
  }

  private async findEquipment(
    id: string,
    relations: FindOptionsRelations<Equipment>,
    entityManager: EntityManager,
  ): Promise<Equipment> {
    const equipment = await entityManager.findOne<Equipment>(Equipment, {
      where: {
        id,
      },
      relations: relations,
    });
    if (!equipment) {
      throw new BadRequestException('Нет инвентаря');
    }
    return equipment;
  }

  private async findCategory(
    id: string,
    entityManager: EntityManager,
  ): Promise<Category> {
    if (!id) return null;
    const category: Category = await entityManager.findOne<Category>(Category, {
      where: {
        id,
      },
    });
    if (!category) {
      throw new BadRequestException('Нет такой категории');
    }
    return category;
  }

  private async findTag(
    id: string,
    entityManager: EntityManager,
  ): Promise<Tag> {
    if (!id) return null;
    const tag: Tag = await entityManager.findOne<Tag>(Tag, {
      where: {
        id,
      },
    });

    if (!tag) {
      throw new BadRequestException('Нет такого тега');
    }
    return tag;
  }
}
