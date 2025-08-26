import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from '../../entities/list.entity';
import { ListRepository } from './list.repository';
import { CacheService } from '../../common/utils/cache.util';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListController],
  providers: [ListService, ListRepository, CacheService],
})
export class ListModule {}
