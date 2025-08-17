import { Injectable } from '@nestjs/common';

import { FindWorkspace } from './dto/find-workspace.dto';
import { WorkspaceRepository } from './workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async findAllByAccountId(accountId: number): Promise<FindWorkspace[]> {
    return await this.workspaceRepository.findAllByAccountId(accountId);
  }
}
