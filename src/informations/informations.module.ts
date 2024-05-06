import { Module } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { InformationsController } from './informations.controller';

@Module({
  controllers: [InformationsController],
  providers: [InformationsService],
})
export class InformationsModule {}
