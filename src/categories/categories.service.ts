import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  Not,
  Repository,
} from 'typeorm';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    await this.checkExistsByName(createCategoryDto.name);
    category.name = createCategoryDto.name;
    return await this.categoryRepository.save(category);
  }
  async findAll(
    page = 1,
    limit = 10,
    order?: FindOptionsOrder<Category>,
    relations?: FindOptionsRelations<Category>,
  ): Promise<PaginatedResultDto<Category>> {
    const [data, total] = await this.categoryRepository.findAndCount({
      relations: relations,
      skip: (page - 1) * limit,
      take: limit,
      order: order,
    });
    return <PaginatedResultDto<Category>>{
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  private async checkExistsByName(
    name: string,
    excludeId?: string,
  ): Promise<void> {
    const exists = await this.categoryRepository.exists({
      where: {
        name: name,
        id: excludeId !== undefined ? Not(excludeId) : undefined,
      },
    });
    if (exists) {
      throw new BadRequestException('Такая категория уже существует');
    }
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new BadRequestException('Нет такой категории');
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.checkExistsByName(updateCategoryDto.name, id);
    const category = await this.findOne(id);
    category.name = updateCategoryDto?.name ?? category.name;
    return await this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<Category> {
    const category = await this.findOne(id);
    return await this.categoryRepository.softRemove(category);
  }
}
