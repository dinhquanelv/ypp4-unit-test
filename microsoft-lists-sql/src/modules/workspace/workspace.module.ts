import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Workspace } from '../../entities/workspace.entity';
import { WorkspaceRepository } from '../../modules/workspace/workspace.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository],
})
export class WorkspaceModule {}
