import { Controller } from '@nestjs/common';

import { WorkspaceService } from './workspace.service';
import { FindAllWorkspaceByAccountIdDto } from '../../modules/workspace/dto/find-all-workspace-by-account-id.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  async findAllWorkspacesByAccountId(
    accountId: number,
  ): Promise<FindAllWorkspaceByAccountIdDto[]> {
    return await this.workspaceService.findAllWorkspacesByAccountId(accountId);
  }
}
