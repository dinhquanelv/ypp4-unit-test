import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListTypeService } from './list-type.service';
import { ListTypeController } from './list-type.controller';
import { ListType } from '../../entities/list-type.entity';
import { ListTypeRepository } from './list-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ListType])],
  controllers: [ListTypeController],
  providers: [ListTypeService, ListTypeRepository],
})
export class ListTypeModule {}
