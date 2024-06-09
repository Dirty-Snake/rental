import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentSchema } from './equipment.schema';
import { CategoriesModule } from '../categories/categories.module';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';
import { RentModule } from "./rent/rent.module";
import { RentService } from "./rent/rent.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipmentSchema]),
    CategoriesModule,
    TagsModule,
    UsersModule,
    RentModule,
  ],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, RentService],
})
export class EquipmentsModule {}
