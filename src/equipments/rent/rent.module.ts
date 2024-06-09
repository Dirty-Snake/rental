import { Module } from '@nestjs/common';
import { RentService } from "./rent.service";

@Module({
  providers: [RentService],
  exports: [RentService],
})
export class RentModule {}
