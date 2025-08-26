import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Workspace } from '../../entities/workspace.entity';
import { WorkspaceRepository } from './workspace.repository';
import { CacheService } from '../../common/utils/cache.util';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository, CacheService],
})
export class WorkspaceModule {}
