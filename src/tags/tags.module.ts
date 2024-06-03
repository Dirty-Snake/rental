import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagSchema } from './tag.schema';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([TagSchema])],
})
export class TagsModule {}
