import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  Not,
  Repository,
} from 'typeorm';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    const tag = new Tag();
    await this.checkExistsByName(createTagDto.name);
    tag.name = createTagDto.name;
    return await this.tagRepository.save(tag);
  }

  async findAll(
    page = 1,
    limit = 10,
    order?: FindOptionsOrder<Tag>,
    relations?: FindOptionsRelations<Tag>,
  ): Promise<PaginatedResultDto<Tag>> {
    const [data, total] = await this.tagRepository.findAndCount({
      relations: relations,
      skip: (page - 1) * limit,
      take: limit,
      order: order,
    });
    return <PaginatedResultDto<Tag>>{
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOne({
      where: { id },
    });
    if (!tag) {
      throw new BadRequestException('Нет такой метки');
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    await this.checkExistsByName(updateTagDto.name, id);
    const tag = await this.findOne(id);
    tag.name = updateTagDto?.name ?? tag.name;
    return await this.tagRepository.save(tag);
  }

  async remove(id: string) {
    const tag = await this.findOne(id);
    return await this.tagRepository.softRemove(tag);
  }
  private async checkExistsByName(
    name: string,
    excludeId?: string,
  ): Promise<void> {
    const exists = await this.tagRepository.exists({
      where: {
        name: name,
        id: excludeId !== undefined ? Not(excludeId) : undefined,
      },
    });
    if (exists) {
      throw new BadRequestException('Такая метка уже существует');
    }
  }
}
