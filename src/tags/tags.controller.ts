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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { FindOneDto } from '../categories/dto/find-one.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { Tag } from './entities/tag.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiResponse({ type: Tag })
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiPaginatedResponse(Tag)
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<Tag>> {
    return this.tagsService.findAll(paginationDto?.page, paginationDto?.limit, {
      create_date: 'ASC',
    });
  }

  @ApiResponse({ type: Tag })
  @Get(':id')
  findOne(@Param() { id }: FindOneDto) {
    return this.tagsService.findOne(id);
  }

  @ApiResponse({ type: Tag })
  @Patch(':id')
  update(@Param() { id }: FindOneDto, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiResponse({ type: Tag })
  @Delete(':id')
  remove(@Param() { id }: FindOneDto) {
    return this.tagsService.remove(id);
  }
}
