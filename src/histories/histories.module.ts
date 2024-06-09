import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorySchema } from './history.schema';

@Module({
  imports: [TypeOrmModule.forFeature([HistorySchema])],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule {}
