import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListViewService } from './list-view.service';
import { ListViewController } from './list-view.controller';
import { ListView } from '../../entities/list-view.entity';
import { ListViewRepository } from './list-view.repository';
import { CacheService } from '../../common/utils/cache.util';
import { ViewType } from '../../entities/view-type.entity';
import { ViewSetting } from '../../entities/view-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListView, ViewType, ViewSetting])],
  controllers: [ListViewController],
  providers: [ListViewService, ListViewRepository, CacheService],
})
export class ListViewModule {}
