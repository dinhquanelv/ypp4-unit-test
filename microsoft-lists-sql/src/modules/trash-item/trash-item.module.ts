import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrashItemService } from './trash-item.service';
import { TrashItemController } from './trash-item.controller';
import { TrashItem } from '../../entities/trash-item.entity';
import { TrashItemRepository } from './trash-item.repository';
import { CacheService } from '../../common/utils/cache.util';

@Module({
  imports: [TypeOrmModule.forFeature([TrashItem])],
  controllers: [TrashItemController],
  providers: [TrashItemService, TrashItemRepository, CacheService],
})
export class TrashItemModule {}
