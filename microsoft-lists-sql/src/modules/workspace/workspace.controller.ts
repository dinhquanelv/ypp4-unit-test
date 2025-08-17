import { Controller } from '@nestjs/common';

import { WorkspaceService } from './workspace.service';
import { FindWorkspace } from './dto/find-workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  async findAllByAccountId(accountId: number): Promise<FindWorkspace[]> {
    return await this.workspaceService.findAllByAccountId(accountId);
  }
}
