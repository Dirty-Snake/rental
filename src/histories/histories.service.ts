import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { FindOptionsOrder, FindOptionsRelations, Repository } from "typeorm";
import { PaginatedResultDto } from "../common/dto/paginated-result.dto";

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    order?: FindOptionsOrder<History>,
    relations?: FindOptionsRelations<History>,
  ): Promise<PaginatedResultDto<History>> {
    const [data, total] = await this.historyRepository.findAndCount({
      relations: relations,
      skip: (page - 1) * limit,
      take: limit,
      order: order,
    });
    return <PaginatedResultDto<History>>{
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
