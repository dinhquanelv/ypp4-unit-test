import { Injectable } from '@nestjs/common';

import { FindAllWorkspaceByAccountIdDto } from '../../modules/workspace/dto/find-all-workspace-by-account-id.dto';
import { WorkspaceRepository } from '../../modules/workspace/workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async findAllWorkspacesByAccountId(
    accountId: number,
  ): Promise<FindAllWorkspaceByAccountIdDto[]> {
    return await this.workspaceRepository.findAllWorkspacesByAccountId(
      accountId,
    );
  }
}
