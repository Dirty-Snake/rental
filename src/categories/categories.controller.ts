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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';
import { FindOneDto } from './dto/find-one.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    type: Category,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiPaginatedResponse(Category)
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<Category>> {
    return this.categoriesService.findAll(
      paginationDto?.page,
      paginationDto?.limit,
      {
        create_date: 'ASC',
      },
    );
  }

  @ApiResponse({ type: Category })
  @Get(':id')
  findOne(@Param() { id }: FindOneDto): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @ApiResponse({ type: Category })
  @Patch(':id')
  update(
    @Param() { id }: FindOneDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiResponse({ type: Category })
  @Delete(':id')
  remove(@Param() { id }: FindOneDto) {
    return this.categoriesService.remove(id);
  }
}
