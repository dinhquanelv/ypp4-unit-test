import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListViewService } from './list-view.service';
import { ListViewController } from './list-view.controller';
import { ListView } from '../../entities/list-view.entity';
import { ListViewRepository } from './list-view.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ListView])],
  controllers: [ListViewController],
  providers: [ListViewService, ListViewRepository],
})
export class ListViewModule {}
