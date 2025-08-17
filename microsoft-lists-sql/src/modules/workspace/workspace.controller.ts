import { Controller } from '@nestjs/common';

import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  async findAllByAccountId(accountId: number): Promise<WorkspaceDto[]> {
    return await this.workspaceService.findAllByAccountId(accountId);
  }
}
